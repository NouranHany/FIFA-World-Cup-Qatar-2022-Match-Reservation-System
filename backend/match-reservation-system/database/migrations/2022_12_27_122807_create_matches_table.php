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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start_time');
            $table->string('referee_name');
            $table->string('linesman1_name');
            $table->string('linesman2_name');

            $table->unsignedBigInteger('stadium_id');
            $table->foreign('stadium_id')
                ->references('id')
                ->on('stadia')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->unsignedBigInteger('team1_id');
            $table->foreign('team1_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->unsignedBigInteger('team2_id');
            $table->foreign('team2_id')
                ->references('id')
                ->on('teams')
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

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::drop('tableName');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};
