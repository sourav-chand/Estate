<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category', 'collection');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $products = $query->latest()->paginate(15);

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'color' => 'nullable|string|max:50',
            'material' => 'nullable|string|max:100',
            'sku' => 'nullable|string|unique:products,sku',
            'stock' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
            'tags' => 'nullable|array',
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(int $id)
    {
        $product = Product::with('category', 'collection')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, int $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'color' => 'nullable|string|max:50',
            'material' => 'nullable|string|max:100',
            'sku' => 'nullable|string|unique:products,sku,' . $id,
            'stock' => 'sometimes|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
            'tags' => 'nullable|array',
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name']) && $product->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
