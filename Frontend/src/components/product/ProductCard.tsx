import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useWishlist } from '../../context';
import { formatPrice, calculateDiscount } from '../../utils/format';
import { StarRating } from '../common/StarRating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const liked = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-charcoal px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-ivory">
            NEW
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 right-3 z-10 rounded-sm bg-gold px-2 py-1 font-sans text-[10px] font-bold text-charcoal">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-ivory/80 p-2 backdrop-blur-sm transition-all hover:bg-ivory"
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <motion.div
            animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? 'fill-rose text-rose' : 'text-charcoal-muted'
              }`}
            />
          </motion.div>
        </button>

        <div
          className={`absolute inset-x-0 bottom-0 flex justify-center pb-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="flex items-center gap-1.5 rounded-sm bg-ivory/90 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur-sm">
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-3">
        <Link to={`/product/${product.slug}`}>
          <p className="line-clamp-1 font-sans text-sm font-medium text-charcoal transition-colors group-hover:text-gold-dark">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="font-sans text-xs text-charcoal-muted">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="font-sans text-sm font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice > 0 && (
            <span className="font-sans text-xs text-charcoal-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="font-sans text-xs font-semibold text-gold-dark">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
