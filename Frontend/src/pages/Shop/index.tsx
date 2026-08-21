import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { productService } from '../../services/productService';
import { ProductGrid } from '../../components/product/ProductGrid';
import type { Product, SortOption } from '../../types';

const CATEGORIES = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Pendants', 'Mangalsutra', 'Jewellery Sets'];
const COLLECTIONS = ['Rose Gold', 'Crystal Blooms', 'Hasli Collection', 'Wedding Season', 'Everyday Elegance', 'Morbagh Collection'];
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

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-cream py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-sans text-xs font-semibold tracking-widest uppercase text-charcoal"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CheckboxFilterProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function CheckboxFilter({ options, selected, onChange }: CheckboxFilterProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map(option => (
        <label key={option} className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="h-4 w-4 rounded border-beige accent-gold"
          />
          <span className="font-sans text-sm text-charcoal-muted">{option}</span>
        </label>
      ))}
    </div>
  );
}

interface ColorSwatchFilterProps {
  colors: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const COLOR_HEX: Record<string, string> = {
  Gold: '#D4AF37',
  Silver: '#C0C0C0',
  'Rose Gold': '#B76E79',
  Black: '#1a1a1a',
  White: '#FAF9F6',
  Red: '#C41E3A',
  Green: '#2D6A4F',
  Blue: '#1E3A5F',
  Pink: '#FFB6C1',
};

function ColorSwatchFilter({ colors, selected, onChange }: ColorSwatchFilterProps) {
  const toggle = (color: string) => {
    if (selected.includes(color)) {
      onChange(selected.filter(c => c !== color));
    } else {
      onChange([...selected, color]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map(color => (
        <button
          key={color}
          onClick={() => toggle(color)}
          title={color}
          className={`h-7 w-7 rounded-full border-2 transition-all ${
            selected.includes(color)
              ? 'border-gold ring-2 ring-gold/30'
              : 'border-cream hover:border-sand'
          }`}
          style={{ backgroundColor: COLOR_HEX[color] }}
        />
      ))}
    </div>
  );
}

function FilterContent({
  categories,
  setCategories,
  collections,
  setCollections,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  colors,
  setColors,
  materials,
  setMaterials,
  inStock,
  setInStock,
  onClear,
}: {
  categories: string[];
  setCategories: (v: string[]) => void;
  collections: string[];
  setCollections: (v: string[]) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  colors: string[];
  setColors: (v: string[]) => void;
  materials: string[];
  setMaterials: (v: string[]) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  onClear: () => void;
}) {
  const hasFilters = categories.length > 0 || collections.length > 0 || minPrice || maxPrice || colors.length > 0 || materials.length > 0 || inStock;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">
          Filters
        </span>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 font-sans text-xs text-gold hover:text-gold-dark"
          >
            <RotateCcw size={12} />
            Clear All
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <CheckboxFilter options={CATEGORIES} selected={categories} onChange={setCategories} />
      </FilterSection>

      <FilterSection title="Collection">
        <CheckboxFilter options={COLLECTIONS} selected={collections} onChange={setCollections} />
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-full rounded-sm border border-cream bg-ivory px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-gold"
          />
          <span className="text-charcoal-muted">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full rounded-sm border border-cream bg-ivory px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-gold"
          />
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <ColorSwatchFilter colors={COLORS} selected={colors} onChange={setColors} />
      </FilterSection>

      <FilterSection title="Material">
        <CheckboxFilter options={MATERIALS} selected={materials} onChange={setMaterials} />
      </FilterSection>

      <FilterSection title="Availability">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={e => setInStock(e.target.checked)}
            className="h-4 w-4 rounded border-beige accent-gold"
          />
          <span className="font-sans text-sm text-charcoal-muted">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = searchParams.get('category')?.split(',').filter(Boolean) ?? [];
  const collections = searchParams.get('collection')?.split(',').filter(Boolean) ?? [];
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const colors = searchParams.get('color')?.split(',').filter(Boolean) ?? [];
  const materials = searchParams.get('material')?.split(',').filter(Boolean) ?? [];
  const inStock = searchParams.get('inStock') === 'true';
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';

  useEffect(() => {
    productService.getProducts().then(products => {
      setAllProducts(products);
      setLoading(false);
    });
  }, []);

  const updateParam = useCallback(
    (key: string, value: string | string[] | boolean | null) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else if (Array.isArray(value)) {
          next.set(key, value.join(','));
        } else if (typeof value === 'boolean') {
          if (value) next.set(key, 'true');
          else next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setCategories = useCallback((v: string[]) => updateParam('category', v), [updateParam]);
  const setCollections = useCallback((v: string[]) => updateParam('collection', v), [updateParam]);
  const setColors = useCallback((v: string[]) => updateParam('color', v), [updateParam]);
  const setMaterials = useCallback((v: string[]) => updateParam('material', v), [updateParam]);
  const setMinPrice = useCallback((v: string) => updateParam('minPrice', v), [updateParam]);
  const setMaxPrice = useCallback((v: string) => updateParam('maxPrice', v), [updateParam]);
  const setInStock = useCallback((v: boolean) => updateParam('inStock', v), [updateParam]);
  const setSort = useCallback((v: SortOption) => updateParam('sort', v), [updateParam]);

  const clearAll = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (categories.length > 0) {
      result = result.filter(p => categories.includes(p.category));
    }
    if (collections.length > 0) {
      result = result.filter(p => collections.includes(p.collection));
    }
    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }
    if (colors.length > 0) {
      result = result.filter(p => colors.includes(p.color));
    }
    if (materials.length > 0) {
      result = result.filter(p => materials.includes(p.material));
    }
    if (inStock) {
      result = result.filter(p => p.stock > 0);
    }

    return sortProducts(result, sort);
  }, [allProducts, categories, collections, minPrice, maxPrice, colors, materials, inStock, sort]);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-charcoal">JEWELLERY</h1>
          <p className="mt-2 font-sans text-charcoal-muted">Explore our collection of timeless pieces.</p>
          <p className="mt-1 font-sans text-xs tracking-wider text-charcoal-muted">
            {loading ? '' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
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
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterContent
                categories={categories}
                setCategories={setCategories}
                collections={collections}
                setCollections={setCollections}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                colors={colors}
                setColors={setColors}
                materials={materials}
                setMaterials={setMaterials}
                inStock={inStock}
                setInStock={setInStock}
                onClear={clearAll}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-end lg:flex">
              <div className="relative flex items-center gap-2">
                <span className="font-sans text-xs tracking-wider text-charcoal-muted">SORT BY</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="appearance-none border-b border-charcoal bg-transparent pr-5 py-1 font-sans text-sm font-semibold text-charcoal outline-none"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-charcoal" />
                </div>
              </div>
            </div>

            <ProductGrid products={filteredProducts} loading={loading} />
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
              <FilterContent
                categories={categories}
                setCategories={setCategories}
                collections={collections}
                setCollections={setCollections}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                colors={colors}
                setColors={setColors}
                materials={materials}
                setMaterials={setMaterials}
                inStock={inStock}
                setInStock={setInStock}
                onClear={clearAll}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
