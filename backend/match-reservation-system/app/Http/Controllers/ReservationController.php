<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Matche;
use App\Models\Stadium;
use Carbon\Carbon;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\ReservationCollection;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get all reservations for a user
        $user = auth()->guard('api')->user();

        // return the reservations of the currently logged in user
        return new ReservationCollection($user->reservations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->guard('api')->user();

        // Validate the existance of both attributes in the request body
        $request->validate([
            'matche_id' => ['required', 'exists:matches,id'],
            'seat_number' => ['required']
        ]);

        // Check if this match's seat is already reserved
        $reservation = Reservation::where([
            'matche_id' => $request->matche_id,
            'seat_number' => $request->seat_number])->first();
        if (!empty($reservation)){
            return response([
                'message' => 'This seat is already reserved!'
            ], Response::HTTP_CONFLICT);
        }

        // get the match to reserve in
        $match = Matche::where(['id'=>$request->matche_id])->first();
        
        // get the stadium in which the match will be played
        $stadium = $match->stadium;
        // Check that the seat number exists 
        $seat_numbers = explode('-', $request->seat_number);
        $seat_row = $seat_numbers[0]; $seat_col = $seat_numbers[1];
        if($seat_col<=0 || $seat_col>$stadium->cols_count){
            return response(["message"=>"Column number is out of range."], Response::HTTP_CONFLICT);
        }
        if($seat_row<=0 || $seat_row>$stadium->rows_count){
            return response(["message"=>"Row number is out of range."], Response::HTTP_CONFLICT);
        }
        
        // create reservation in db
        $mytime = Carbon::now();
        $reservation = Reservation::create([
            "matche_id"=>$request->matche_id,
            "seat_number"=>$request->seat_number,
            "username"=>$user->username,
            "creation_time"=>$mytime->toDateTimeString()
        ]);
        return response([
            "reservation" => $reservation
        ], Response::HTTP_CREATED);

        // extra validations
        // check that the reservation created is for an upcoming match not a past one.
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $user = auth()->guard('api')->user();

        // Validate the request body
        $request->validate([
            'matche_id'=>['required'],
            'seat_number'=>['required']
        ]);

        // Check whether the user has reserved this reservation or not
        $reservation = Reservation::where([
            "matche_id"=>$request->matche_id,
            "seat_number"=>$request->seat_number,
            "username"=>$user->username ])->first();
        if(empty($reservation)){
            return response([
                "message" => "You are not reserving this ticket."
            ], Response::HTTP_FORBIDDEN);
        }

        $last_allowed_date = Carbon::parse(Carbon::now())->addDays(3);
        // Only delete before 3 days of the match start time
        if($last_allowed_date->gt($reservation->matche->date)){
            return response([
                "message" => "You can't delete a reservation before 3 days of the match start."
            ], Response::HTTP_FORBIDDEN);
        }
        // delete the reservation
        Reservation::where(['matche_id' => $request->matche_id , "seat_number"=>$request->seat_number])->delete();
        
        return response([
            "message" => "Reservation deleted successfully!"
        ], Response::HTTP_OK);
    
    }
}
