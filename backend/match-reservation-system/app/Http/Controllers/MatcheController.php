<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use App\Models\Reservation;
use App\Models\Stadium;
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
            'stadium_name' => ['required'],
            'team1_name' => ['required'],
            'team2_name' => ['required']
        ]);

        if ($request->team2_name ==$request->team1_name){
            return response([
                'message' => 'A match needed to be played by 2 different teams'
            ], Response::HTTP_CONFLICT);
        }

        $team1_name = $request->team1_name;
        $team2_name = $request->team2_name;
        $date = $request->date;
        
        // A team cannot have two matches at the same day
        $no_team_conflict = Matche::where([
            ['team1_name', '=', $team1_name],
            ['date', '=', $date]
        ])->orWhere([
                ['team2_name', '=', $team1_name],
                ['date', '=', $date]
            ])->orWhere([
                ['team1_name', '=', $team2_name],
                ['date', '=', $date]
            ])->orWhere([
                    ['team2_name', '=', $team2_name],
                    ['date', '=', $date]
                ])->first();

        // no_conflict= true , then a match can be added else a match cannot be added 
        if (!empty($no_team_conflict)) {
            return response([
                'message' => 'A team cannot play 2 matches on the same day'
            ], Response::HTTP_CONFLICT);
        }


        // two matches cannot be played at the same time on the same stadium
        $startTime = Carbon::parse($request->start_time)->addMinutes(90)->toTimeString();
        $endTime = Carbon::parse($request->start_time)->subMinutes(90)-> toTimeString();
        
        $same_stadium = Matche::where([
            ['stadium_name', '=', $request->stadium_name],
            ['start_time', '<', $startTime],
            ['start_time', '>', $endTime],
            ['date', '=', $date]
        ])->first();

        if (!empty($same_stadium)) {
            return response([
                'message' => 'A stadium cannot be used for 2 matches at same time'
            ], Response::HTTP_CONFLICT);
        }
    
        // if all constraints are satisfied after validations , create the matche 
        $matche = Matche::create($validated);

        return response([
          "match"=>$matche
        ], Response::HTTP_OK);

    }



    public function update($match_id,Request $request)
    {
        $user = auth()->guard('api')->user();
        // only managers are allowed to update  a match
        if ($user->role != 1) {
            return response([
                'message' => 'only managers are allowed to upadte a match'
            ], Response::HTTP_FORBIDDEN);
        }
    
        // see if match_id exists

        $matche = Matche::where([
            ['id', '=',$match_id ],
        ])->first();

        if (empty($matche)){
            return response([
                'message' => 'You are trying to edit a non existing match'
            ], Response::HTTP_NOT_FOUND);
        }

        $matche_id=$match_id;
        $date = $request->filled("date")? $request->date :$matche->date;
        $start_time = $request->filled("start_time")? $request->start_time :$matche->start_time;
        $referee_name = $request->filled("referee_name")? $request->referee_name :$matche->referee_name;
        $linesman1_name = $request->filled("linesman1_name")? $request->linesman1_name :$matche->linesman1_name;
        $linesman2_name = $request->filled("linesman2_name")? $request->linesman2_name :$matche->linesman2_name;
        $stadium_name = $request->filled("stadium_name")? $request->stadium_name :$matche->stadium_name;
        $team1_name = $request->filled("team1_name")? $request->team1_name :$matche->team1_name;
        $team2_name = $request->filled("team2_name")? $request->team2_name :$matche->team2_name;


        // check if any team had no match in the same day 
        $no_team_conflict = Matche::where([
            ['team1_name', '=', $team1_name],
            ['date', '=', $date],
            ['id', '!=', $matche_id]
        ])->orWhere([
                ['team2_name', '=', $team1_name],
                ['date', '=', $date],
                ['id', '!=', $matche_id]
            ])->orWhere([
                ['team1_name', '=', $team2_name],
                ['date', '=', $date],
                ['id', '!=', $matche_id]
            ])->orWhere([
                    ['team2_name', '=', $team2_name],
                    ['date', '=', $date],
                    ['id', '!=', $matche_id]
                ])->first();

        if (!empty($no_team_conflict)) {
            return response([
                'message' => 'A team cannot play 2 matches on the same day'
            ], Response::HTTP_CONFLICT);
        }
        
        if ($team1_name ==$team2_name){
            return response([
                'message' => 'A match needed to be played by 2 different teams'
            ], Response::HTTP_CONFLICT);
        }

        // two matches cannot be played at the same time on the same stadium
        $startTime = Carbon::parse($start_time)->addMinutes(90)->toTimeString();
        $endTime = Carbon::parse($start_time)->subMinutes(90)-> toTimeString();
        
        $same_stadium = Matche::where([
            ['stadium_name', '=', $request->stadium_name],
            ['start_time', '<', $startTime],
            ['start_time', '>', $endTime],
            ['date', '=', $date],
            ['id', '!=', $matche_id]
        ])->first();

        if (!empty($same_stadium)) {
            return response([
                'message' => 'A staium cannot be used for 2 matches at same time'
            ], Response::HTTP_CONFLICT);
        }
    

        // // If all the edit constraints are satisfied , sucessfully edit the match details 
        $matche->update([
            'date' => $date,
            'start_time' =>$start_time,
            'referee_name' =>  $referee_name,
            'linesman1_name' =>  $linesman1_name,
            'linesman2_name' =>  $linesman2_name,
            'stadium_name' =>  $stadium_name,
            'team1_name' =>  $team1_name,
            'team2_name' =>  $team2_name
        ]);

        return response([
           "match"=>$matche
        ], Response::HTTP_OK);
         

    }

    public function index(Request $request)
    {
        
       
        $today=Carbon::now();
        $str_date=$today->year.'/'.$today->month.'/'.$today->day;
        $str_time = $today->hour . ':' . $today->minute . ':' . $today->second;

        $date = date('Y-m-d',strtotime($str_date));
        $time = date('H:i:s',strtotime($str_time));

        $matches = Matche::where([
            ['date', '=', $date],
            ['start_time', '>', $time],
        ])->orWhere([
                ['date', '>', $date],
            ])->orderBy('date','asc')->get();

        return response([
            "matches"=>$matches
            ], Response::HTTP_OK);

    }


    public function show($match_id,Request $request)
    {
        $user = auth()->guard('api')->user();

        $matche = Matche::where([
            ['id', '=',$match_id ],
        ])->first();

        if (empty($matche)){
            return response([
                'message' => 'You are trying to view a non existing match'
            ], Response::HTTP_NOT_FOUND);
        }

        $stadium = Stadium::where([
            ['name', '=',$matche->stadium_name],
        ])->first();

      
        $reserved_seats = Reservation::where([['matche_id','=',$match_id]])->orderBy('seat_number', 'asc')->pluck('seat_number')->toArray();
        $shape = array();
        foreach(range(1,$stadium->rows_count) as $row){

            $row_seats = array();
            foreach(range(1,$stadium->cols_count) as $col){
                $status = false;
                $seat=$row.'-'.$col;
                $username = null;
                if(in_array($seat, $reserved_seats)){
                    $status = true;
                    if(!is_null($user) && $user->role == 1) {
                        $username=Reservation::where([['matche_id','=',$match_id],['seat_number','=',$seat]])->first()->username;
                    }
                }
            array_push($row_seats,['id'=>$seat,'selected'=>$status,'username'=>$username]);
            }
            array_push($shape,$row_seats);
        }


        $matche->stadium = $stadium;
        $stadium->shape = $shape;
        return response([
            "match"=>$matche,
            ], Response::HTTP_OK);
       
     
    }
}