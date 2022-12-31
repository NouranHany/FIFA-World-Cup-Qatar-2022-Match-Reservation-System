<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Reservation;
use App\Models\Matche;
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

    public function update_teams(Request $request)
    {
        # loop over all teams and update their names with the new teams participating in the world cup.
        $teams = Team::get();
        for($i=0; $i<32; $i++){
            $teams[$i]->update(['name' => $request->teams[$i]]);
        }

        return response([
            "message"=>"All teams have been updated successfully from database."
            ], Response::HTTP_OK);
    }
    
}
