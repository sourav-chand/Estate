import { collections } from '../data/collections';
import type { Collection } from '../types';

export const collectionService = {
  async getCollections(): Promise<Collection[]> {
    return collections;
  },

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return collections.find(c => c.slug === slug);
  },
};
