import type { Product } from '../types';
import { API_BASE } from '../utils/api';

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  material: string;
  weight: number;
  price: number;
  compare_at_price: number;
  stock: number;
  sales_count: number;
  rating: number;
  review_count: number;
  images: string[];
  tags: string[];
  is_new: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  sku: string;
  category: { id: number; name: string; slug: string } | null;
  collection: { id: number; name: string; slug: string } | null;
  created_at: string;
}

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category?.name || '',
    collection: p.collection?.name || '',
    price: p.price,
    compareAtPrice: p.compare_at_price,
    discount: p.compare_at_price ? Math.round(((p.compare_at_price - p.price) / p.compare_at_price) * 100) : 0,
    rating: p.rating,
    reviewCount: p.review_count,
    images: p.images || [],
    description: p.description,
    material: p.material,
    color: p.color,
    tags: p.tags || [],
    isNew: p.is_new,
    isBestseller: p.is_best_seller,
    isFeatured: p.is_best_seller || p.is_new,
    stock: p.stock,
  };
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>('/products?per_page=50');
      return data.data.map(mapProduct);
    } catch {
      return [];
    }
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const p = await apiFetch<ApiProduct>(`/products/${slug}`);
      return mapProduct(p);
    } catch {
      return undefined;
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>('/products?per_page=8&sort=newest');
      return data.data.map(mapProduct);
    } catch {
      return [];
    }
  },

  async getNewArrivals(): Promise<Product[]> {
    try {
      const data = await apiFetch<ApiProduct[]>('/products/new-arrivals');
      return (Array.isArray(data) ? data : []).map(mapProduct);
    } catch {
      return [];
    }
  },

  async getBestsellers(): Promise<Product[]> {
    try {
      const data = await apiFetch<ApiProduct[]>('/products/bestsellers');
      return (Array.isArray(data) ? data : []).map(mapProduct);
    } catch {
      return [];
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>(`/products?category=${encodeURIComponent(category)}&per_page=50`);
      return data.data.map(mapProduct);
    } catch {
      return [];
    }
  },

  async getProductsByCollection(collection: string): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>(`/products?per_page=50`);
      const all = data.data.map(mapProduct);
      return all.filter(p => p.collection.toLowerCase() === collection.toLowerCase());
    } catch {
      return [];
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>(`/products?search=${encodeURIComponent(query)}&per_page=50`);
      return data.data.map(mapProduct);
    } catch {
      return [];
    }
  },

  async getRelatedProducts(productId: number, limit = 4): Promise<Product[]> {
    try {
      const data = await apiFetch<{ data: ApiProduct[] }>('/products?per_page=50');
      return data.data.map(mapProduct).filter(p => p.id !== productId).slice(0, limit);
    } catch {
      return [];
    }
  },
};
