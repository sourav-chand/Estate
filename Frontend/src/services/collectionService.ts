const API_BASE = 'http://localhost:8000/api';

interface ApiCollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  banner_image: string;
  product_count: number;
  products?: any[];
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  bannerImage: string;
  productCount: number;
}

function mapCollection(c: ApiCollection): Collection {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    bannerImage: c.banner_image,
    productCount: c.product_count,
  };
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const collectionService = {
  async getCollections(): Promise<Collection[]> {
    try {
      const data = await apiFetch<ApiCollection[]>('/collections');
      return (Array.isArray(data) ? data : []).map(mapCollection);
    } catch {
      return [];
    }
  },

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    try {
      const data = await apiFetch<ApiCollection>(`/collections/${slug}`);
      return mapCollection(data);
    } catch {
      return undefined;
    }
  },
};
