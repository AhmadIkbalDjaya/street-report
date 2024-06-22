<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name("admin.home");
Route::get('login', [AuthController::class, "index"])->name('admin.login');
Route::get('report', [ReportController::class, "index"])->name('admin.report');
