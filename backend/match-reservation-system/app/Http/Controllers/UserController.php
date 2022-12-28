<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function approve($username, Request $request)
    {
        // check authority of the user approving
        $user = auth()->guard('api')->user();
        
        if ($user->role != 2){
            return response([
                'message' => 'Only system administrators can approve the request of being a manager'
            ], Response::HTTP_FORBIDDEN);
        }
        
        // retrieve the user to be approved
        $requesting_user = User::where('username', $username)->first();
        
        if (empty($requesting_user)) {
            return response([
                'message' => "User to be approved doesn't exist."
            ], Response::HTTP_NOT_FOUND);
        }
        // update the role of the user
        $requesting_user->update([
            'role' => 1,
            'requesting_promotion' => false
        ]);

        return response([
            'approved_user' => $requesting_user
        ], Response::HTTP_OK);
    }

    public function approve_all(Request $request)
    {
        $user = auth()->guard('api')->user();

        // check authority of the user approving
        if ($user->role != 2){
            return response([
                'message' => 'Only system administrators can approve the request of being a manager'
            ], Response::HTTP_FORBIDDEN);
        }
        
        // retrieve all customers requesting a promotion
        $requesting_users = User::where([
            "role" => 0,
            "requesting_promotion" => true
            ])->get();

        // update the role of each requesting user
        foreach ($requesting_users as $requesting_user) {
            $requesting_user->update([
                'role' => 1,
                'requesting_promotion' => false
            ]);    
        }
    
        return response([
            'approved_users' => $requesting_users
        ], Response::HTTP_OK);
    }

    public function unapproved_users(Request $request)
    {
        $user = auth()->guard('api')->user();

        // check authority of the user approving
        if ($user->role != 2){
            return response([
                'message' => 'Only system administrators can view unapproved users.'
            ], Response::HTTP_FORBIDDEN);
        }

        // retrieve all customers requesting a promotion
        $requesting_users = User::where([
            "role" => 0,
            "requesting_promotion" => true
            ])->get();

        return response([
            "unapproved_users" => $requesting_users
        ], Response::HTTP_OK);
    }

    public function delete($username, Request $request)
    {
        $user = auth()->guard('api')->user();

        //Validate the authorization to delete the user
        if ($user->role != 2){
            return response([
                'message' => 'Only system administrators delete users.'
            ], Response::HTTP_FORBIDDEN);
        }

        //Validate the existence of the user
        $to_be_deleted_user = User::where('username', $username)->first();
        if (empty($to_be_deleted_user)) {
            return response([
                'message' => "User to be deleted doesn't exist."
            ], Response::HTTP_NOT_FOUND);
        }

        # delete the user
        $to_be_deleted_user->delete();
        return response([
            'message' => "User deleted successfully."
        ], Response::HTTP_OK);

    }

    public function show($username, Request $request)
    {
        //Validate the existence of the user
        $user = User::where('username', $username)->first();
        if (empty($user)) {
            return response([
                'message' => "User doesn't exist."
            ], Response::HTTP_NOT_FOUND);
        }

        # return the user retrieved
        return response([
            "user" => $user
        ], Response::HTTP_OK);

    }

    public function update($username, Request $request)
    {
        // Validate the existence of the user
        $user_requested = User::where('username', $username)->first();
        if (empty($user_requested)) {
            return response([
                'message' => "User doesn't exist."
            ], Response::HTTP_NOT_FOUND);
        }

        $user_loggedin = auth()->guard('api')->user();
        // Validate the authorization to edit a user
        if ($user_requested->username != $user_loggedin->username){
            return response([
                'message' => 'Only profile owner can edit his or her profile.'
            ], Response::HTTP_FORBIDDEN);
        }

        if ($request->has("old_password")){
            if ($request->has("new_password")){
                // check the correctness of the old credentails
                if (!Hash::check($request->old_password, $user_loggedin->password)){
                    return response([
                        'message' => 'The old password entered is incorrect.'
                    ], Response::HTTP_UNAUTHORIZED);
                }
                $password = Hash::make($request->new_password);
            }
        }
        else{
            $password = $user_loggedin->password;
        }
        

        // update the user
        $user_loggedin->update([
            'password' => $password,
            'first_name' => $request->first_name ?? $user_loggedin->first_name,
            'last_name' => $request->last_name ?? $user_loggedin->last_name,
            'birth_date' => $request->birth_date ?? $user_loggedin->birth_date,
            'gender' => $request->gender ?? $user_loggedin->gender,
            'nationality' => $request->nationality ?? $user_loggedin->nationality,
            'requesting_promotion' => ($request->has('role') && $request->role == 1 && $user_loggedin->role==0) ? true:$user_loggedin->requesting_promotion
        ]);

        # retrieve the updated user
        return response([
            "user" => $user_loggedin
        ], Response::HTTP_OK);
    }
    
}
