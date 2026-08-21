<?php

use App\Http\Controllers\Api\Admin\AdminOrderController;
use App\Http\Controllers\Api\Admin\AdminProductController;
use App\Http\Controllers\Api\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::post('/orders/{id}/accept', [AdminOrderController::class, 'accept']);
    Route::post('/orders/{id}/reject', [AdminOrderController::class, 'reject']);
    Route::put('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);

    Route::get('/products', [AdminProductController::class, 'index']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::get('/products/{id}', [AdminProductController::class, 'show']);
    Route::put('/products/{id}', [AdminProductController::class, 'update']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);
});
