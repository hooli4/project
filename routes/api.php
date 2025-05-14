<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::get('/register/confirm-email/{token}', [AuthController::class, 'confirmEmail'])->name('api_email_confirm');

Route::post('/register', [AuthController::class, 'register'])->name('api_reg');
Route::post('/login', [AuthController::class, 'login'])->name('api_log');

Route::prefix('/projects')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList', [ProjectsController::class, 'showProjects']);
    Route::post('/create', [ProjectsController::class, 'createProject']);
    Route::delete('/delete/{id}', [ProjectsController::class, 'deleteProject']);
    Route::put('/update/{id}', [ProjectsController::class, 'updateProject']);
    Route::post('/inviteToProject/{id}', [ProjectsController::class, 'inviteToProject']);
});

Route::prefix('/invitations')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList', [ProjectsController::class, 'showInvitations']);
    Route::post('/acceptInvitation/{id}', [ProjectsController::class, 'acceptInvitation']);
    Route::delete('/leaveProject/{id}', [ProjectsController::class, 'leaveProject']);
});

Route::prefix('/roles')->middleware(['auth:sanctum'])->group(function() {
    Route::post('/role/{role_id}/project/{project_id}/user/{user_id}', [RoleController::class, 'connectUserAndRole']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum'])->name('api_logout');
Route::get('/me', [AuthController::class, 'showPersonalInfo'])->middleware(['auth:sanctum'])->name('api_userInfo');