<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
        
            $table->dateTime('creation_time');
            $table->string('seat_number');

            $table->unsignedBigInteger('matche_id');
            $table->foreign('matche_id')
                ->references('id')
                ->on('matches')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->unsignedBigInteger('username');
            $table->foreign('username')
                ->references('username')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
