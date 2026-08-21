<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->addresses()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'line1' => 'required|string|max:255',
            'line2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
            'country' => 'nullable|string|max:50',
            'is_default' => 'nullable|boolean',
        ]);

        if ($validated['is_default'] ?? false) {
            $request->user()->addresses()->update(['is_default' => false]);
        }

        $address = $request->user()->addresses()->create($validated);

        return response()->json($address, 201);
    }

    public function destroy(Request $request, int $id)
    {
        $address = $request->user()->addresses()->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Address deleted']);
    }
}
