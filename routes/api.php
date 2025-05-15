<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StickerController;
use App\Http\Controllers\CardController;
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

Route::prefix('/boards')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList/project/{project_id}', [BoardController::class, 'showBoards']);
    Route::post('/createBoard', [BoardController::class, 'createBoard']);
    Route::delete('/deleteBoard/{board_id}/project/{project_id}', [BoardController::class, 'deleteBoard']);
    Route::put('/updateBoardCoordinates/{board_id}/x/{x}/y/{y}/project/{project_id}', [BoardController::class, 'updateCoordinates']);
});

Route::prefix('/stickers')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList/project/{project_id}', [StickerController::class, 'showStickers']);
    Route::post('/createSticker', [StickerController::class, 'createSticker']);
    Route::delete('/deleteSticker/{sticker_id}/project/{project_id}', [StickerController::class, 'deleteSticker']);
    Route::put('/updateStickerCoordinates/{sticker_id}/x/{x}/y/{y}/project/{project_id}', [StickerController::class, 'updateCoordinates']);
});

Route::prefix('/cards')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/getList/project/{project_id}/board/{board_id}', [CardController::class, 'showCards']);
    Route::post('/createCard', [CardController::class, 'createCard']);
    Route::delete('/deleteCard/project/{project_id}/board/{board_id}/card/{card_id}', [CardController::class, 'deleteCard']);
    Route::put('/updateCard/{card_id}/board/{board_id}/project/{project_id}', [CardController::class, 'updateCard']);
    Route::put('/switchCards/{card_id}/direction/{direction}/board/{board_id}/project/{project_id}', [CardController::class, 'switchCards']);
});



Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum'])->name('api_logout');
Route::get('/me', [AuthController::class, 'showPersonalInfo'])->middleware(['auth:sanctum'])->name('api_userInfo');