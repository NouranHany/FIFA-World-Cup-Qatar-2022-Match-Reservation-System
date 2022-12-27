<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class MatcheController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->guard('api')->user();
        // only managers are allowed to create a match
        if ($user->role != 1) {
            return response([
                'message' => 'only managers are allowed to add a match'
            ], Response::HTTP_FORBIDDEN);
        }

        // if the request format not as required , it will not continue 
        $validated = $request->validate([
            'date' => ['required'],
            'start_time' => ['required'],
            'referee_name' => ['required'],
            'linesman1_name' => ['required'],
            'linesman2_name' => ['required'],
            'stadium_id' => ['required'],
            'team1_id' => ['required'],
            'team2_id' => ['required']
        ]);

        // A team cannot have two matches at the same day 
        $team1_id = $request->team1_id;
        $team2_id = $request->team2_id;
        $date = $request->date;

        $team1 = Matche::where([
            ['team1_id', '=', $team1_id],
            ['date', '=', $date]
        ])->orWhere([
                ['team2_id', '=', $team1_id],
                ['date', '=', $date]
            ])->first();

        if (!empty($team1)) {
            return response([
                'message' => 'A team cannot play 2 matches on the same day'
            ], Response::HTTP_CONFLICT);
        }

        $team2 = Matche::where([
            ['team1_id', '=', $team2_id],
            ['date', '=', $date]
        ])->orWhere([
                ['team2_id', '=', $team2_id],
                ['date', '=', $date]
            ])->first();

        if (!empty($team2)) {
            return response([
                'message' => 'A team cannot play 2 matches on the same day'
            ], Response::HTTP_CONFLICT);
        }

        // two matches cannot be played at the same
        $startTime = Carbon::parse($request->start_time)->addMinutes(90)->toTimeString();
        $endTime = Carbon::parse($request->start_time)->subMinutes(90) -> toTimeString();
        
        $same_stadium = Matche::where([
            ['stadium_id', '=', $request->stadium_id],
            ['start_time', '<', $startTime],
            ['start_time', '>', $endTime]
        ])->first();

        if (!empty($same_stadium)) {
            return response([
                'message' => 'A Staium cannot be used for 2 matches at same time'
            ], Response::HTTP_CONFLICT);
        }
    
        // if all constraints are satisfied after validations , create the matche 
        $matche = Matche::create($validated);

        return response([
          $matche
        ], Response::HTTP_OK);
        



    }



    public function update($match_id,Request $request)
    {
        $user = auth()->guard('api')->user();
        // only managers are allowed to create a match
        if ($user->role != 1) {
            return response([
                'message' => 'only managers are allowed to add a match'
            ], Response::HTTP_FORBIDDEN);
        }
    
        // see if match_id exists

        $matche = Matche::where([
            ['id', '=',$match_id ],
        ])->first();
        
        $matche->update([
            'date' => $request->date??$matche->date,
            'start_time' => $request->start_time??$matche->start_time,
            'referee_name' =>  $request->referee_name??$matche->referee_name,
            'linesman1_name' =>  $request->linesman1_name??$matche->linesman1_name,
            'linesman2_name' =>  $request->linesman2_name??$matche->linesman2_name,
            'stadium_id' =>  $request->stadium_id??$matche->stadium_id,
            'team1_id' =>  $request->team1_id??$matche->team1_id,
            'team2_id' =>  $request->team2_id??$matche->team2_id
        ]);

        return response([
           $matche
        ], Response::HTTP_OK);
         

    }
}