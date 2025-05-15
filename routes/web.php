<?php

use Illuminate\Support\Facades\Route;

Route::get('/register', function() {
    return view('register');
})->name('register');

Route::get('/login', function() {
    return view('login');
})->name('login');

Route::get('/register/confirm-email', function() {
    return view('confirm-email');
})->name('confirm-email');

Route::get('/projectList', function() {
    return view('projects');
});

Route::get('/project', function() {
    return view('project');
});

