import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from '../common/Skeleton';
import { EmptyState } from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function ProductGrid({ products, loading = false, columns = 4 }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="We couldn't find any products matching your criteria. Try adjusting your filters."
        actionLabel="BROWSE ALL"
        actionHref="/shop"
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-${columns}`}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
