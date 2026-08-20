import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { collectionService } from '../../services/collectionService';
import { productService } from '../../services/productService';
import { ProductGrid } from '../../components/product/ProductGrid';
import type { Product, Collection, SortOption } from '../../types';

const CATEGORIES = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Pendants', 'Mangalsutra', 'Jewellery Sets'];
const COLORS = ['Gold', 'Silver', 'Rose Gold', 'Black', 'White', 'Red', 'Green', 'Blue', 'Pink'];
const MATERIALS = ['24K Gold Plated', 'Silver Plated', 'Rose Gold Plated', 'Oxidized Silver', 'Brass'];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'bestselling', label: 'Bestselling' },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'newest':
      return sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'bestselling':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
}

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = searchParams.get('category')?.split(',').filter(Boolean) ?? [];
  const colors = searchParams.get('color')?.split(',').filter(Boolean) ?? [];
  const materials = searchParams.get('material')?.split(',').filter(Boolean) ?? [];
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    Promise.all([
      collectionService.getCollectionBySlug(slug),
      productService.getProducts(),
    ]).then(([col, products]) => {
      setCollection(col ?? null);
      if (col) {
        setAllProducts(products.filter(p => p.collection === col.name));
      }
      setLoading(false);
    });
  }, [slug]);

  const updateParam = useCallback(
    (key: string, value: string | string[] | null) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else if (Array.isArray(value)) {
          next.set(key, value.join(','));
        } else {
          next.set(key, value);
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setCategories = useCallback((v: string[]) => updateParam('category', v), [updateParam]);
  const setColors = useCallback((v: string[]) => updateParam('color', v), [updateParam]);
  const setMaterials = useCallback((v: string[]) => updateParam('material', v), [updateParam]);
  const setSort = useCallback((v: SortOption) => updateParam('sort', v), [updateParam]);
  const clearAll = useCallback(() => setSearchParams(new URLSearchParams()), [setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (categories.length > 0) result = result.filter(p => categories.includes(p.category));
    if (colors.length > 0) result = result.filter(p => colors.includes(p.color));
    if (materials.length > 0) result = result.filter(p => materials.includes(p.material));
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    return sortProducts(result, sort);
  }, [allProducts, categories, colors, materials, minPrice, maxPrice, sort]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="h-[400px] animate-pulse bg-champagne/30" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-square animate-pulse rounded-md bg-champagne/50" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-champagne/50" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-champagne/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 font-serif text-4xl text-charcoal">Collection Not Found</h1>
        <p className="mb-6 text-charcoal-muted">The collection you're looking for doesn't exist.</p>
        <Link
          to="/shop"
          className="rounded-sm bg-charcoal px-6 py-3 font-sans text-sm font-semibold tracking-wider text-ivory hover:bg-charcoal-light"
        >
          BROWSE ALL
        </Link>
      </div>
    );
  }

  const hasFilters = categories.length > 0 || colors.length > 0 || materials.length > 0 || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="relative h-[300px] overflow-hidden sm:h-[400px]">
        <img
          src={collection.bannerImage}
          alt={collection.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/40 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl font-semibold text-ivory sm:text-5xl"
          >
            {collection.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 max-w-lg px-4 font-sans text-sm text-ivory/80"
          >
            {collection.description}
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-sans text-xs tracking-wider text-charcoal-muted">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-cream pb-4 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wider text-charcoal"
          >
            <SlidersHorizontal size={18} />
            FILTERS
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="appearance-none bg-transparent pr-6 font-sans text-sm tracking-wider text-charcoal outline-none"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">Filters</span>
                {hasFilters && (
                  <button onClick={clearAll} className="flex items-center gap-1 font-sans text-xs text-gold hover:text-gold-dark">
                    <RotateCcw size={12} /> Clear All
                  </button>
                )}
              </div>

              <div className="border-b border-cream py-4">
                <span className="mb-3 block font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">Category</span>
                {CATEGORIES.map(option => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={categories.includes(option)}
                      onChange={() => setCategories(categories.includes(option) ? categories.filter(c => c !== option) : [...categories, option])}
                      className="h-4 w-4 rounded border-beige accent-gold"
                    />
                    <span className="font-sans text-sm text-charcoal-muted">{option}</span>
                  </label>
                ))}
              </div>

              <div className="border-b border-cream py-4">
                <span className="mb-3 block font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">Price Range</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => updateParam('minPrice', e.target.value)}
                    className="w-full rounded-sm border border-cream bg-ivory px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-gold"
                  />
                  <span className="text-charcoal-muted">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => updateParam('maxPrice', e.target.value)}
                    className="w-full rounded-sm border border-cream bg-ivory px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="border-b border-cream py-4">
                <span className="mb-3 block font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">Color</span>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setColors(colors.includes(color) ? colors.filter(c => c !== color) : [...colors, color])}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${
                        colors.includes(color) ? 'border-gold ring-2 ring-gold/30' : 'border-cream hover:border-sand'
                      }`}
                      title={color}
                      style={{
                        backgroundColor: { Gold: '#D4AF37', Silver: '#C0C0C0', 'Rose Gold': '#B76E79', Black: '#1a1a1a', White: '#FAF9F6', Red: '#C41E3A', Green: '#2D6A4F', Blue: '#1E3A5F', Pink: '#FFB6C1' }[color],
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="py-4">
                <span className="mb-3 block font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">Material</span>
                {MATERIALS.map(option => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={materials.includes(option)}
                      onChange={() => setMaterials(materials.includes(option) ? materials.filter(m => m !== option) : [...materials, option])}
                      className="h-4 w-4 rounded border-beige accent-gold"
                    />
                    <span className="font-sans text-sm text-charcoal-muted">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-end lg:flex">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs tracking-wider text-charcoal-muted">SORT BY</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="appearance-none border-b border-charcoal bg-transparent pr-5 py-1 font-sans text-sm font-semibold text-charcoal outline-none"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-charcoal" />
                </div>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[320px] overflow-y-auto bg-ivory p-6 shadow-xl lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-sans text-sm font-semibold tracking-widest uppercase text-charcoal">Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={20} className="text-charcoal" />
                </button>
              </div>
              <p className="mb-4 font-sans text-xs tracking-wider text-charcoal-muted">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
