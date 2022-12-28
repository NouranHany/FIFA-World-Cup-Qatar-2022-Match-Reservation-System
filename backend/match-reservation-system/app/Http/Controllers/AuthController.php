<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

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
            'token' => auth()->user()->createToken('authToken')->accessToken
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
            'role' => ['required', Rule::in([0, 1, 2])]
        ]);
        

        $validated['requesting_promotion']= $validated['role'] == 0? false:true;
//         $validated['role']=0;
        
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

}
