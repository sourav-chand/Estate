export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  collection: string;
  price: number;
  compareAtPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  material: string;
  color: string;
  sizes?: string[];
  tags: string[];
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  bannerImage: string;
  productCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  product?: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string[];
  collection: string[];
  priceRange: [number, number];
  color: string[];
  material: string[];
  occasion: string[];
  inStock: boolean;
  minRating: number;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestselling';
