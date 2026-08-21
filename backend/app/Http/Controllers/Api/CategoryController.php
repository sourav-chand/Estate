<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)->with('products')->firstOrFail();
        return response()->json($category);
    }
}
