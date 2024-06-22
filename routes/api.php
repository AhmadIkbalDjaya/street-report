<?php

use App\Http\Controllers\RankController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LocationController;
use App\Http\Controllers\User\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post("login", "login");
    Route::post("register", "register");
    Route::get("logout", "logout")->middleware(["auth:sanctum"]);
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix("reports")->controller(ReportController::class)->group(function () {
        Route::get('', 'index');
        Route::get('{report}', 'show');
        Route::post('', 'store');
    });
    Route::get('ranks', [RankController::class, "index"]);
});

Route::get('province', [LocationController::class, "province"]);
Route::get('regency/{province}', [LocationController::class, "regency"]);
