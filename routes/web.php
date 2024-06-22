<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name("admin.home");
Route::get('login', [AuthController::class, "index"])->name('admin.login');
Route::controller(ReportController::class)->group(function () {
  Route::get('report', "index")->name('admin.report');
  Route::get('report/{report}', "show")->name('admin.report.show');
});