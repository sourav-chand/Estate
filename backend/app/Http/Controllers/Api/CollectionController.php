<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Collection;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::all();
        return response()->json($collections);
    }

    public function show(string $slug)
    {
        $collection = Collection::where('slug', $slug)->with('products')->firstOrFail();
        return response()->json($collection);
    }
}
