<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // validate on the request body
        $validated = $request->validate([
            'email_address' => ['required'],
            'password' => ['required']
        ]);

        // if the email and password aren't correct 
        if (!auth()->attempt($validated)){
            return response([
                'message' => 'This user does not exist or password incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }
        
        // create a token for this session
        // respond with the user and its token
        return response([
            'user' => auth()->user(),
            'access_token' => auth()->user()->createToken('authToken')->accessToken
        ], Response::HTTP_OK);
        
    }

    public function signup(Request $request)
    {
        // validate request
        $validated = $request->validate([
            'email_address' => ['required', 'email', 'unique:users,email_address'],
            'password' => ['required', 'min:6'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'birth_date' => ['required'],
            'gender' => ['required'],
            'role' => ['required', Rule::in([0, 1, 2])] // should be only 0?
        ]);
        
        $validated['password'] = Hash::make($request->password);
        
        // create user in database with the data in request body
        $user = User::create($validated);

        // create token
        $token = $user->createToken('authToken')->accessToken;

        // respond back with the token and created user
        return response([
            'user' => $user,
            'token' => $token
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response([
            "message" => "you logged out successfully!"
        ]);
    }

    public function getProfile(Request $request)
    {
        try {
            $user = auth()->guard('api')->user();
            return response()->json(['status'=>'true','message'=>"user profile",'data'=>$user]);
        } catch (\Throwable $th) {
            return response()->json(['status'=>'false','message'=>"errrorrrrrrrrr"],500);
        }
    }
}
