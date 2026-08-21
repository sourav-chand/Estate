<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Docker runs the seeder at startup. Do not duplicate the catalog when
        // an existing database volume is restarted.
        if (User::where('email', 'admin@estele.co')->exists()) {
            return;
        }

        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@estele.co',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Create test customer
        User::create([
            'name' => 'Customer',
            'email' => 'customer@estele.co',
            'password' => Hash::make('password'),
            'is_admin' => false,
        ]);

        // Categories
        $categories = [
            ['name' => 'Necklaces', 'slug' => 'necklaces', 'image' => 'https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=800&h=600&fit=crop', 'product_count' => 8],
            ['name' => 'Earrings', 'slug' => 'earrings', 'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop', 'product_count' => 12],
            ['name' => 'Rings', 'slug' => 'rings', 'image' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop', 'product_count' => 6],
            ['name' => 'Bracelets', 'slug' => 'bracelets', 'image' => 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop', 'product_count' => 6],
            ['name' => 'Bangles', 'slug' => 'bangles', 'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop', 'product_count' => 5],
            ['name' => 'Pendants', 'slug' => 'pendants', 'image' => 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=600&fit=crop', 'product_count' => 4],
            ['name' => 'Mangalsutra', 'slug' => 'mangalsutra', 'image' => 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&fit=crop', 'product_count' => 3],
            ['name' => 'Jewellery Sets', 'slug' => 'jewellery-sets', 'image' => 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop', 'product_count' => 2],
        ];

        $createdCategories = [];
        foreach ($categories as $cat) {
            $createdCategories[] = Category::create($cat);
        }

        // Collections
        $collections = [
            ['name' => 'Rose Gold', 'slug' => 'rose-gold', 'description' => 'Elegant rose gold plated jewellery.', 'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=1200&h=500&fit=crop', 'product_count' => 7],
            ['name' => 'Crystal Blooms', 'slug' => 'crystal-blooms', 'description' => 'Sparkling crystal and CZ jewellery.', 'image' => 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&h=500&fit=crop', 'product_count' => 8],
            ['name' => 'Hasli Collection', 'slug' => 'hasli-collection', 'description' => 'Contemporary everyday jewellery.', 'image' => 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&h=500&fit=crop', 'product_count' => 10],
            ['name' => 'Wedding Season', 'slug' => 'wedding-season', 'description' => 'Bridal jewellery for your special day.', 'image' => 'https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=1200&h=500&fit=crop', 'product_count' => 6],
            ['name' => 'Everyday Elegance', 'slug' => 'everyday-elegance', 'description' => 'Minimalist pieces for daily wear.', 'image' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=500&fit=crop', 'product_count' => 9],
            ['name' => 'Morbagh Collection', 'slug' => 'morbagh-collection', 'description' => 'Nature-inspired designs.', 'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'banner_image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=500&fit=crop', 'product_count' => 7],
        ];

        $createdCollections = [];
        foreach ($collections as $col) {
            $createdCollections[] = Collection::create($col);
        }

        // Products
        $products = [
            ['name' => 'Rose Gold CZ Necklace Set', 'category_id' => $createdCategories[0]->id, 'collection_id' => $createdCollections[0]->id, 'price' => 3499, 'compare_at_price' => 5499, 'color' => 'Rose Gold', 'sku' => 'EST-NE-001', 'stock' => 25, 'is_new' => true, 'is_bestseller' => true, 'rating' => 4.8, 'review_count' => 189, 'images' => ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop']],
            ['name' => 'Kundan Bridal Necklace Set', 'category_id' => $createdCategories[0]->id, 'collection_id' => $createdCollections[3]->id, 'price' => 7999, 'compare_at_price' => 12999, 'color' => 'Gold', 'sku' => 'EST-NE-002', 'stock' => 10, 'is_new' => true, 'is_bestseller' => true, 'rating' => 4.9, 'review_count' => 156, 'images' => ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop']],
            ['name' => 'CZ Floral Gold Ring', 'category_id' => $createdCategories[2]->id, 'collection_id' => $createdCollections[1]->id, 'price' => 699, 'compare_at_price' => 1099, 'color' => 'Gold', 'sku' => 'EST-RI-001', 'stock' => 45, 'is_new' => true, 'is_bestseller' => true, 'rating' => 4.7, 'review_count' => 278, 'images' => ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop']],
            ['name' => 'Polki Choker Necklace', 'category_id' => $createdCategories[0]->id, 'collection_id' => $createdCollections[3]->id, 'price' => 5499, 'compare_at_price' => 8499, 'color' => 'Silver', 'sku' => 'EST-NE-003', 'stock' => 15, 'is_new' => true, 'is_bestseller' => true, 'rating' => 4.6, 'review_count' => 112, 'images' => ['https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=600&h=600&fit=crop']],
            ['name' => 'Pearl Drop Earrings', 'category_id' => $createdCategories[1]->id, 'collection_id' => $createdCollections[4]->id, 'price' => 1299, 'compare_at_price' => 2199, 'color' => 'Rose Gold', 'sku' => 'EST-ER-001', 'stock' => 30, 'is_bestseller' => true, 'rating' => 4.5, 'review_count' => 203, 'images' => ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop']],
            ['name' => 'Gold Plated Bangles Set', 'category_id' => $createdCategories[3]->id, 'collection_id' => $createdCollections[2]->id, 'price' => 2499, 'compare_at_price' => 3999, 'color' => 'Gold', 'sku' => 'EST-BA-001', 'stock' => 20, 'is_bestseller' => true, 'rating' => 4.4, 'review_count' => 98, 'images' => ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop']],
            ['name' => 'Crystal Pendant Necklace', 'category_id' => $createdCategories[5]->id, 'collection_id' => $createdCollections[1]->id, 'price' => 899, 'compare_at_price' => 1499, 'color' => 'Silver', 'sku' => 'EST-PN-001', 'stock' => 35, 'is_bestseller' => true, 'rating' => 4.6, 'review_count' => 167, 'images' => ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop']],
            ['name' => 'Traditional Gold Mangalsutra', 'category_id' => $createdCategories[6]->id, 'collection_id' => $createdCollections[3]->id, 'price' => 4999, 'compare_at_price' => 7999, 'color' => 'Gold', 'sku' => 'EST-MG-001', 'stock' => 12, 'is_bestseller' => true, 'rating' => 4.8, 'review_count' => 89, 'images' => ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop']],
            ['name' => 'Emerald Stud Earrings', 'category_id' => $createdCategories[1]->id, 'collection_id' => $createdCollections[5]->id, 'price' => 1599, 'compare_at_price' => 2499, 'color' => 'Gold', 'sku' => 'EST-ER-002', 'stock' => 28, 'is_new' => true, 'rating' => 4.5, 'review_count' => 76, 'images' => ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop']],
            ['name' => 'Silver Mesh Bracelet', 'category_id' => $createdCategories[3]->id, 'collection_id' => $createdCollections[4]->id, 'price' => 799, 'compare_at_price' => 1299, 'color' => 'Silver', 'sku' => 'EST-BR-001', 'stock' => 40, 'is_new' => true, 'rating' => 4.3, 'review_count' => 54, 'images' => ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop']],
            ['name' => 'Diamond Look Ring Set', 'category_id' => $createdCategories[2]->id, 'collection_id' => $createdCollections[1]->id, 'price' => 1999, 'compare_at_price' => 3499, 'color' => 'Rose Gold', 'sku' => 'EST-RI-002', 'stock' => 22, 'is_new' => true, 'rating' => 4.7, 'review_count' => 134, 'images' => ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop']],
            ['name' => 'Temple Jhumka Earrings', 'category_id' => $createdCategories[1]->id, 'collection_id' => $createdCollections[3]->id, 'price' => 2299, 'compare_at_price' => 3999, 'color' => 'Gold', 'sku' => 'EST-ER-003', 'stock' => 18, 'is_new' => true, 'rating' => 4.8, 'review_count' => 201, 'images' => ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop']],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, [
                'description' => 'Beautiful handcrafted jewellery from Estèle.',
                'material' => 'Gold Plated / CZ',
                'weight' => rand(10, 100) / 10,
                'tags' => ['jewellery', 'premium', 'handcrafted'],
                'is_active' => true,
            ]));
        }
    }
}
