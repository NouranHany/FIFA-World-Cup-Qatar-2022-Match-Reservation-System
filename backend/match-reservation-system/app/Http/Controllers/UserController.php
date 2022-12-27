<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

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
            'message' => ['approved_user' => $requesting_user]
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
            'message' => ['approved_users' => $requesting_users]
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
            'message' => ["unapproved_users" => $requesting_users]
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
}
