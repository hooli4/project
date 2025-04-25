<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/register/confirm-email/{token}', [AuthController::class, 'confirmEmail'])->name('api_email_confirm');

Route::post('/register', [AuthController::class, 'register'])->middleware('RedirectIfAuth')->name('api_reg');