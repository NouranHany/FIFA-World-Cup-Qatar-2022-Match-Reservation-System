<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Matche;

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
    public $timestamps = false;
    protected $fillable = [
        'username',
        'matche_id',
        'seat_number',
        'creation_time'
   ];

   public function matche()
   {
        return $this->belongsTo(Matche::class);
   }
}
