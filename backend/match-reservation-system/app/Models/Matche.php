<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'date',
        'start_time',
        'referee_name',
        'linesman1_name',
        'linesman2_name',
        'stadium_id',
        'team1_id',
        'team2_id',
    ];

}
