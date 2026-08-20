import { products } from '../data/products';
import type { Product } from '../types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    return products;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return products.find(p => p.slug === slug);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return products.filter(p => p.isFeatured);
  },

  async getNewArrivals(): Promise<Product[]> {
    return products.filter(p => p.isNew);
  },

  async getBestsellers(): Promise<Product[]> {
    return products.filter(p => p.isBestseller);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  async getProductsByCollection(collection: string): Promise<Product[]> {
    return products.filter(p => p.collection.toLowerCase() === collection.toLowerCase());
  },

  async searchProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    return products
      .filter(p => p.id !== productId && (p.category === product.category || p.collection === product.collection))
      .slice(0, limit);
  },
};
