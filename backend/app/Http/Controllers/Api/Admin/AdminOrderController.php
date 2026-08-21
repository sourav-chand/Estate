<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user', 'items.product');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhereHas('user', fn($q2) => $q2->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%"));
            });
        }

        $orders = $query->latest()->paginate(15);

        return response()->json($orders);
    }

    public function show(int $id)
    {
        $order = Order::with('user', 'items.product', 'user.addresses')->findOrFail($id);
        return response()->json($order);
    }

    public function accept(Request $request, int $id)
    {
        $order = Order::findOrFail($id);

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Only pending orders can be accepted.'], 422);
        }

        $order->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
            'admin_notes' => $request->get('admin_notes', $order->admin_notes),
        ]);

        $order->load('user', 'items.product');

        return response()->json([
            'message' => 'Order confirmed successfully',
            'order' => $order,
        ]);
    }

    public function reject(Request $request, int $id)
    {
        $order = Order::findOrFail($id);

        if (!in_array($order->status, ['pending', 'confirmed'])) {
            return response()->json(['message' => 'This order cannot be rejected.'], 422);
        }

        \DB::transaction(function () use ($order, $request) {
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }

            $order->update([
                'status' => 'cancelled',
                'admin_notes' => $request->get('admin_notes', $order->admin_notes),
            ]);
        });

        $order->load('user', 'items.product');

        return response()->json([
            'message' => 'Order rejected and stock restored',
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,processing,shipped,delivered',
            'tracking_number' => 'nullable|string|max:100',
        ]);

        $order = Order::findOrFail($id);

        $updateData = ['status' => $validated['status']];

        if (isset($validated['tracking_number'])) {
            $updateData['tracking_number'] = $validated['tracking_number'];
        }

        match ($validated['status']) {
            'confirmed' => $updateData['confirmed_at'] = $order->confirmed_at ?? now(),
            'shipped' => $updateData['shipped_at'] = $order->shipped_at ?? now(),
            'delivered' => $updateData['delivered_at'] = $order->delivered_at ?? now(),
            default => null,
        };

        $order->update($updateData);
        $order->load('user', 'items.product');

        return response()->json([
            'message' => 'Order status updated',
            'order' => $order,
        ]);
    }
}
