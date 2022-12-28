<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamController extends Controller
{
  
    public function index(Request $request)
    {
        
        $user = auth()->guard('api')->user();
        // only managers are allowed to update  a match
        if ($user->role != 1) {
            return response([
                'message' => 'only managers are allowed to upadte a match'
            ], Response::HTTP_FORBIDDEN);
        }
        
        $stadiums = Team::orderBy('name','asc')->get();

        return response([
            "teams"=>$stadiums
            ], Response::HTTP_OK);

    }
}
