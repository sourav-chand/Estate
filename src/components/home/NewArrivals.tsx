import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { productService } from '../../services/productService';
import type { Product } from '../../types';

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-3 aspect-square w-full bg-beige/60" />
      <div className="mb-2 h-4 w-3/4 rounded bg-beige/60" />
      <div className="h-3 w-1/2 rounded bg-beige/40" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
      >
        <div className="relative mb-3 aspect-square overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-gold px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-ivory">
              New
            </span>
          )}
        </div>
        <h3 className="font-serif text-lg text-charcoal transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <p className="mt-1 font-sans text-sm text-charcoal-muted">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </Link>
    </motion.div>
  );
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getNewArrivals().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-wide text-charcoal md:text-4xl">
              NEW ARRIVALS
            </h2>
            <p className="mt-1 font-sans text-sm text-charcoal-muted">
              Discover what's new
            </p>
          </div>
          <Link
            to="/shop?sort=newest"
            className="mt-4 font-sans text-sm font-medium uppercase tracking-wider text-gold transition-colors hover:text-gold-dark sm:mt-0"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
