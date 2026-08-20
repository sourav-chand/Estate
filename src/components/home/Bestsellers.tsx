import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '../../services/productService';
import { ProductCard } from '../product/ProductCard';
import type { Product } from '../../types';

export function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    productService.getBestsellers().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [loading]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(':scope > div')?.offsetWidth ?? 280;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl text-charcoal tracking-wide"
          >
            MOST LOVED
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-charcoal-muted mt-2"
          >
            Jewellery everyone is talking about.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/shop"
            className="hidden md:inline-flex text-sm font-sans font-medium uppercase tracking-widest text-charcoal hover:text-gold transition-colors duration-300"
          >
            View All →
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-2 mb-8"
      >
        <Star className="w-4 h-4 fill-gold text-gold" />
        <span className="text-sm font-sans text-charcoal-muted">
          4.8 · Loved by 2,000+ customers
        </span>
      </motion.div>

      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 border border-sand shadow-md hover:bg-gold hover:text-ivory hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 border border-sand shadow-md hover:bg-gold hover:text-ivory hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[280px] md:w-[calc(25%-18px)]">
                <div className="bg-cream rounded-lg animate-pulse">
                  <div className="aspect-[3/4] bg-sand/40 rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-sand/40 rounded w-3/4" />
                    <div className="h-3 bg-sand/40 rounded w-1/2" />
                    <div className="h-4 bg-sand/40 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[260px] sm:w-[280px] md:w-[calc(25%-18px)] snap-start"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="md:hidden mt-6 text-center">
        <Link
          to="/shop"
          className="text-sm font-sans font-medium uppercase tracking-widest text-charcoal hover:text-gold transition-colors duration-300"
        >
          View All →
        </Link>
      </div>
    </section>
  );
}
