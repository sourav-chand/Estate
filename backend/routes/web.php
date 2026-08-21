<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Estèle API',
        'version' => '1.0',
        'frontend' => 'http://localhost:5173',
        'admin' => 'http://localhost:5173/admin',
        'endpoints' => [
            'auth' => [
                'POST /api/auth/register',
                'POST /api/auth/login',
                'POST /api/auth/logout',
                'GET  /api/auth/me',
            ],
            'products' => [
                'GET /api/products',
                'GET /api/products/{slug}',
                'GET /api/products/new-arrivals',
                'GET /api/products/bestsellers',
            ],
            'categories' => [
                'GET /api/categories',
                'GET /api/categories/{slug}',
            ],
            'collections' => [
                'GET /api/collections',
                'GET /api/collections/{slug}',
            ],
            'orders' => [
                'GET  /api/orders',
                'POST /api/orders',
                'GET  /api/orders/{orderNumber}',
            ],
            'addresses' => [
                'GET    /api/addresses',
                'POST   /api/addresses',
                'DELETE /api/addresses/{id}',
            ],
            'admin' => [
                'GET  /api/admin/dashboard',
                'GET  /api/admin/orders',
                'GET  /api/admin/orders/{id}',
                'POST /api/admin/orders/{id}/accept',
                'POST /api/admin/orders/{id}/reject',
                'PUT  /api/admin/orders/{id}/status',
                'GET  /api/admin/products',
                'POST /api/admin/products',
                'PUT  /api/admin/products/{id}',
                'DELETE /api/admin/products/{id}',
            ],
        ],
    ]);
});
