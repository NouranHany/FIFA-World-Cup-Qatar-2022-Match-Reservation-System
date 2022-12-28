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
                'name'=>['required',"unique:stadia,name"],
                'rows_count' => ['required'],
                'cols_count' => ['required'],
                'location'=>['required'],
            ]);

            $stadium= Stadium::create($validated);

            return response([
                "stadium"=> $stadium
            ], Response::HTTP_OK);
    }

    public function index(Request $request)
    {
        
        $user = auth()->guard('api')->user();
        // only managers are allowed to update  a match
        if ($user->role != 1) {
            return response([
                'message' => 'only managers are allowed to upadte a match'
            ], Response::HTTP_FORBIDDEN);
        }
        
        $stadiums = Stadium::orderBy('name','asc')->get();

        return response([
            "stadiums"=>$stadiums
            ], Response::HTTP_OK);

    }

}
