<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name("admin.home");
Route::get('login', [AuthController::class, "index"])->name('admin.login');
Route::controller(ReportController::class)->group(function () {
  Route::get('report', "index")->name('admin.report');
  Route::get('report/{report}', "show")->name('admin.report.show');
  Route::post('report/{report}/set-status', "set_status")->name('admin.report.set_status');
  Route::post('report/{report}/set-point', "set_point")->name('admin.report.set_point');
});

Route::prefix("account")->controller(AccountController::class)->group(function () {
  Route::get("", "index")->name('admin.account');
  Route::get("create", "create")->name('admin.account.create');
  Route::post("", 'store')->name('admin.account.store');
  Route::get('{account}', "show")->name('admin.account.show');
  Route::get("{account}/edit", "edit")->name('admin.account.edit');
  Route::put("{account}", "update")->name('admin.account.update');
  Route::delete("{account}", "destroy")->name('admin.account.delete');
});