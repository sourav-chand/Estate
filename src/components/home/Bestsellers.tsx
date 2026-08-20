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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-gold font-semibold">
                Bestsellers
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal"
            >
              MOST LOVED
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-charcoal-muted mt-1 font-sans text-sm"
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
              className="hidden md:inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-gold hover:text-gold-dark transition-colors duration-300"
            >
              View All <span className="text-lg leading-none">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 border border-sand/50 shadow-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 border border-sand/50 shadow-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {loading ? (
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-none w-[260px] sm:w-[280px] md:w-[calc(25%-18px)]">
                  <div className="rounded-lg animate-pulse">
                    <div className="aspect-square bg-cream rounded-lg mb-3" />
                    <div className="h-4 bg-cream rounded w-3/4 mb-2" />
                    <div className="h-3 bg-cream rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex-none w-[260px] sm:w-[280px] md:w-[calc(25%-18px)] snap-start"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-gold hover:text-gold-dark transition-colors duration-300"
          >
            View All <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
