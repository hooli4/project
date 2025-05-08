<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::get('/register/confirm-email/{token}', [AuthController::class, 'confirmEmail'])->name('api_email_confirm');

Route::post('/register', [AuthController::class, 'register'])->middleware('RedirectIfAuth')->name('api_reg');

Route::get('/getProjectsList', [ProjectsController::class, 'showProjects']);

Route::prefix('/projects')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList', [ProjectsController::class, 'showProjects']);
    Route::post('/create', [ProjectsController::class, 'createProject']);
    Route::delete('/delete', [ProjectsController::class, 'deleteProject']);
    Route::put('/update', [ProjectsController::class, 'updateProject']);
});