import { categories } from '../data/categories';
import type { Category } from '../types';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return categories;
  },

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return categories.find(c => c.slug === slug);
  },
};
