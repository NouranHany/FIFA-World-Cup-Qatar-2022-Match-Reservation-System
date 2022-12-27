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
        Schema::create('users', function (Blueprint $table) {
            $table->id('username');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email_address')->unique();
            $table->date('birth_date');
            $table->boolean('gender');
            $table->string('nationality')->nullable();
            $table->integer('role');
            $table->boolean('requesting_promotion')->default(0);
            $table->string('password');
            
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
