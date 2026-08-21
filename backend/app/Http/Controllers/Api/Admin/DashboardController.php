<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $totalRevenue = Order::whereIn('status', ['confirmed', 'processing', 'shipped', 'delivered'])->sum('total');
        $totalProducts = Product::count();
        $totalUsers = User::count();

        $recentOrders = Order::with('user')
            ->latest()
            ->limit(10)
            ->get();

        $ordersByStatus = Order::select('status', \DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        return response()->json([
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'total_revenue' => round($totalRevenue, 2),
            'total_products' => $totalProducts,
            'total_users' => $totalUsers,
            'recent_orders' => $recentOrders,
            'orders_by_status' => $ordersByStatus,
        ]);
    }
}
