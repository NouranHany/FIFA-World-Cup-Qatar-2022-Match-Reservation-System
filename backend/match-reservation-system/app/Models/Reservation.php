<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    /**
     * The primary keys of the reservations table
     *
     * @var string[]
     */
    protected $primaryKey = ['matche_id', 'seat_number'];
    /**
     * The incrementing state of the primary key
     *
     * @var bool
     */
    public $incrementing = false;
}
