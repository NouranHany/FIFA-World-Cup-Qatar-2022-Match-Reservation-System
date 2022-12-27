<?php

use App\Http\Controllers\MatcheController;
use App\Http\Controllers\StadiumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

############################## Authorization Routes ####################
Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'signup']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');

############################## Stadium Routes ################### 
Route::post('/stadium', [StadiumController::class, 'store'])->middleware('auth:api');;


############################## Match Routes ################### 
Route::post('/match', [MatcheController::class, 'store'])->middleware('auth:api');;
Route::put('/match/{match_id}', [MatcheController::class, 'update'])->middleware('auth:api');;

############################## User Routes ####################
// Route::get('user/{username}', [UserController::class, 'show']);
Route::delete('user/{username}', [UserController::class, 'delete'])->middleware('auth:api');
Route::post('user/approve/{username}', [UserController::class, 'approve'])->middleware('auth:api');
Route::post('user/approve', [UserController::class, 'approve_all'])->middleware('auth:api');
Route::get('user/unapproved-users', [UserController::class, 'unapproved_users'])->middleware('auth:api');


