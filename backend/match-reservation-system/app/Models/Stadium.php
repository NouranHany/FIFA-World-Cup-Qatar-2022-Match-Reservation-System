<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;
    protected $primaryKey = ['name'];
    public $incrementing = false;

    protected $fillable = [
        'name',
        'rows_count',
        'cols_count',
        'location'
   ];

}
