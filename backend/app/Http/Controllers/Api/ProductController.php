<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::active()->with('category');

        if ($request->has('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $sort = $request->get('sort', 'newest');
        match ($sort) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'name' => $query->orderBy('name'),
            default => $query->latest(),
        };

        return response()->json($query->paginate($request->get('per_page', 20)));
    }

    public function show(string $slug)
    {
        $product = Product::active()
            ->with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($product);
    }

    public function newArrivals()
    {
        return response()->json(
            Product::active()->latest()->limit(8)->get()
        );
    }

    public function bestsellers()
    {
        return response()->json(
            Product::active()->orderByDesc('sales_count')->limit(8)->get()
        );
    }
}
