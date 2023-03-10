<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Stadium;

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
        'stadium_name',
        'team1_name',
        'team2_name',
    ];

    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }

}
