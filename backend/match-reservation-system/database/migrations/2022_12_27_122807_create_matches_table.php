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

            $table->string('stadium_name');
            $table->foreign('stadium_name')
                ->references('name')
                ->on('stadia')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->string('team1_name');
            $table->foreign('team1_name')
                ->references('name')
                ->on('teams')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->string('team2_name');
            $table->foreign('team2_name')
                ->references('name')
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
