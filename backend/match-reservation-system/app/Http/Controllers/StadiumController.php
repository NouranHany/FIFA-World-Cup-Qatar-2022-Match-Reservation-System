<?php

namespace App\Http\Controllers;

use App\Models\Stadium;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class StadiumController extends Controller
{
    public function store(Request $request)
    {
            $user = auth()->guard('api')->user();
            // only managers are allowed to create a stadium
            if ($user->role != 1) {
                return response([
                    'message' => 'only managers are allowed to create a stadium'
                ], Response::HTTP_FORBIDDEN);
            } 

            $validated = $request->validate([
                'name'=>['required'],
                'rows_count' => ['required'],
                'cols_count' => ['required'],
                'location'=>['required'],
            ]);

            $stadium= Stadium::create($validated);

            return response([
                $stadium
            ], Response::HTTP_OK);
    }

}
