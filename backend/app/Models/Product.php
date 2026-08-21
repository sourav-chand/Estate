<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'category_id', 'collection_id', 'description',
        'price', 'compare_at_price', 'color', 'material', 'sku', 'stock',
        'weight', 'images', 'tags', 'is_new', 'is_bestseller', 'is_active',
        'rating', 'review_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'images' => 'array',
        'tags' => 'array',
        'is_new' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = \Illuminate\Support\Str::slug($product->name);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeNew($query)
    {
        return $query->where('is_new', true)->latest();
    }

    public function scopeBestsellers($query)
    {
        return $query->where('is_bestseller', true)->latest();
    }
}
