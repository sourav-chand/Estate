import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../../services/productService';
import { ProductCard } from '../product/ProductCard';
import type { Product } from '../../types';

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-3 aspect-square w-full rounded-lg bg-cream" />
      <div className="mb-2 h-4 w-3/4 rounded bg-cream" />
      <div className="h-3 w-1/2 rounded bg-cream" />
    </div>
  );
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getNewArrivals().then((data) => {
      setProducts(data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 md:py-24">
      {/* Top decorative divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">Just In</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-colors hover:text-gold-dark sm:mt-0"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
