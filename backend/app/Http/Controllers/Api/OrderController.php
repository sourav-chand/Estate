<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('items.product')
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    public function show(Request $request, string $orderNumber)
    {
        $order = $request->user()
            ->orders()
            ->with('items.product', 'user')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:cod,upi,card',
            'notes' => 'nullable|string|max:500',
        ]);

        $address = $request->user()->addresses()->findOrFail($validated['address_id']);

        $order = DB::transaction(function () use ($request, $validated, $address) {
            $subtotal = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $product = Product::active()->findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        "items.{$item['product_id']}" => "Insufficient stock for {$product->name}. Available: {$product->stock}",
                    ]);
                }

                $total = $product->price * $item['quantity'];
                $subtotal += $total;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_image' => is_array($product->images) ? ($product->images[0] ?? null) : null,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'total' => $total,
                ];

                $product->decrement('stock', $item['quantity']);
            }

            $shippingCost = $subtotal >= 499 ? 0 : 49;
            $tax = round($subtotal * 0.03, 2);
            $total = $subtotal + $shippingCost + $tax;

            $order = $request->user()->orders()->create([
                'order_number' => 'EST-' . strtoupper(Str::random(8)),
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax' => $tax,
                'total' => $total,
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'] ?? null,
            ]);

            $order->items()->createMany($orderItems);

            return $order;
        });

        $order->load('items.product');

        return response()->json($order, 201);
    }
}
