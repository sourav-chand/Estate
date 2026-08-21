# Estèle — Premium Fashion Jewellery E-Commerce Platform

A full-stack e-commerce web application for a premium fashion jewellery brand, featuring a modern React storefront, Laravel REST API backend, and a React-based admin panel.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Backend | Laravel 12, PHP 8.2+, Sanctum Auth |
| Database | SQLite |
| Icons | Lucide React |

## Project Structure

```
Estate/
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   │   ├── layout/               # Header, Footer, Layout
│   │   ├── product/              # ProductCard, ProductGrid
│   │   ├── cart/                 # CartDrawer
│   │   └── common/               # StarRating, Badge
│   ├── context/                  # React Context providers
│   │   ├── CartContext.tsx        # Cart state management
│   │   ├── WishlistContext.tsx    # Wishlist state management
│   │   ├── UIContext.tsx          # UI state (mobile menu, search)
│   │   └── SearchContext.tsx      # Search state
│   ├── pages/                    # Route pages
│   │   ├── Home/                 # Homepage
│   │   ├── Shop/                 # Product listing with filters
│   │   ├── Product/              # Product detail page
│   │   ├── Collection/           # Single collection page
│   │   ├── Collections/          # All collections listing
│   │   ├── Cart/                 # Shopping cart + checkout
│   │   ├── Wishlist/             # Saved items
│   │   ├── About/                # About page
│   │   ├── Login/                # Login page
│   │   ├── NotFound/             # 404 page
│   │   └── Admin/                # Admin panel
│   │       ├── AdminLayout.tsx   # Sidebar layout
│   │       ├── AdminGuard.tsx    # Auth guard
│   │       ├── Dashboard.tsx     # Stats dashboard
│   │       ├── Orders.tsx        # Order management
│   │       ├── OrderDetail.tsx   # Single order view
│   │       └── Products.tsx      # Product CRUD
│   ├── services/                 # API service layers
│   │   ├── productService.ts     # Product API calls
│   │   ├── collectionService.ts  # Collection API calls
│   │   └── adminApi.ts           # Admin API calls
│   ├── data/                     # Static data (banners, collections)
│   ├── types/                    # TypeScript interfaces
│   ├── utils/                    # Helpers (format, constants, api)
│   └── routes/                   # React Router config
├── backend/                      # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── ProductController.php
│   │   │   ├── CollectionController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── OrderController.php
│   │   │   ├── AddressController.php
│   │   │   └── Admin/
│   │   │       ├── DashboardController.php
│   │   │       ├── AdminOrderController.php
│   │   │       └── AdminProductController.php
│   │   └── Models/               # Eloquent models
│   ├── database/
│   │   ├── migrations/           # Database schema
│   │   ├── seeders/              # Sample data (12 products)
│   │   └── database.sqlite       # SQLite database file
│   └── routes/api.php            # API route definitions
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PHP** 8.2+
- **Composer**

### 1. Clone the repository

```bash
git clone <repo-url>
cd Estate
```

### 2. Setup Backend

```bash
cd backend

# Install PHP dependencies
composer install

# Create database and run migrations + seeders
php artisan migrate:fresh --seed

# Start the Laravel API server
php artisan serve --port=8000
```

The API will be available at `http://localhost:8000/api`.

### 3. Setup Frontend

```bash
# From the project root
npm install

# Start the Vite dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Access the Application

| URL | Description |
|-----|------------|
| `http://localhost:5173` | Storefront |
| `http://localhost:5173/admin` | Admin Panel |
| `http://localhost:5173/login` | Login Page |
| `http://localhost:8000/api` | REST API |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@estele.co` | `password` |
| Customer | `customer@estele.co` | `password` |

## Features

### Storefront

- **Homepage** — Hero banner, featured collections, new arrivals, bestsellers, newsletter signup
- **Shop** — Product listing with category/price/color/material filters and sorting
- **Product Detail** — Image gallery, size selection, add to cart, related products
- **Collections** — Browse curated jewellery collections
- **Search** — Full-text product search with instant results
- **Cart** — Add/remove items, quantity controls, promo code (ESTELE10 for 10% off), free shipping threshold
- **Checkout** — Address selection/creation, payment method (COD/UPI/Card), order placement
- **Wishlist** — Save items for later, persistent across sessions
- **Login** — Email/password authentication with token-based sessions

### Admin Panel

- **Dashboard** — Total revenue, orders, pending orders, products, users; orders by status chart; recent orders table
- **Orders** — Searchable/filterable order list with pagination; order detail with status progress bar; accept/reject pending orders; update status (confirmed → processing → shipped → delivered) with tracking number
- **Products** — Product list with search; create/edit products (name, price, category, collection, stock, SKU, color, material, images, flags); delete with confirmation; low stock warnings

### API Endpoints

#### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/products` | List products (paginated, filterable) |
| GET | `/api/products/{slug}` | Get product by slug |
| GET | `/api/products/new-arrivals` | New arrival products |
| GET | `/api/products/bestsellers` | Bestselling products |
| GET | `/api/categories` | List categories |
| GET | `/api/categories/{slug}` | Get category with products |
| GET | `/api/collections` | List collections |
| GET | `/api/collections/{slug}` | Get collection with products |

#### Authenticated (Customer)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/orders` | List user orders |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/{orderNumber}` | Get order details |
| GET | `/api/addresses` | List addresses |
| POST | `/api/addresses` | Add address |
| DELETE | `/api/addresses/{id}` | Delete address |

#### Admin (requires `is_admin: true`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/orders` | List all orders |
| GET | `/api/admin/orders/{id}` | Get order details |
| POST | `/api/admin/orders/{id}/accept` | Accept order |
| POST | `/api/admin/orders/{id}/reject` | Reject order |
| PUT | `/api/admin/orders/{id}/status` | Update order status |
| GET | `/api/admin/products` | List all products |
| POST | `/api/admin/products` | Create product |
| GET | `/api/admin/products/{id}` | Get product |
| PUT | `/api/admin/products/{id}` | Update product |
| DELETE | `/api/admin/products/{id}` | Delete product |

## Database Schema

- **users** — id, name, email, password, is_admin, timestamps
- **products** — id, name, slug, category_id, collection_id, description, price, compare_at_price, color, material, sku, stock, weight, images (JSON), tags (JSON), is_new, is_bestseller, is_active, rating, review_count, timestamps
- **categories** — id, name, slug, image, product_count, timestamps
- **collections** — id, name, slug, description, image, banner_image, product_count, timestamps
- **orders** — id, user_id, order_number, status, subtotal, shipping_cost, tax, total, payment_method, notes, admin_notes, tracking_number, confirmed_at, shipped_at, delivered_at, timestamps
- **order_items** — id, order_id, product_id, product_name, product_image, quantity, price, total, timestamps
- **addresses** — id, user_id, full_name, phone, line1, line2, city, state, pincode, country, is_default, timestamps
- **reviews** — id, user_id, product_id, rating, comment, timestamps
- **personal_access_tokens** — Sanctum tokens (for API auth)

## Seed Data

The database seeder creates:

- **2 users** — Admin and Customer
- **8 categories** — Necklaces, Earrings, Rings, Bracelets, Bangles, Pendants, Mangalsutra, Jewellery Sets
- **6 collections** — Rose Gold, Crystal Blooms, Hasli Collection, Wedding Season, Everyday Elegance, Morbagh Collection
- **12 products** — Diverse jewellery items with images, prices (₹699–₹7,999), and stock

## Build for Production

```bash
# Build frontend
npm run build

# Output will be in dist/
```

## License

This project is for educational/demonstration purposes.
