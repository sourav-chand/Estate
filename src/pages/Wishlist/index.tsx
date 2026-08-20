import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ProductGrid } from '../../components/product/ProductGrid';

export function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const moveAllToCart = () => {
    items.forEach(product => addItem(product, 1));
    clearWishlist();
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-charcoal">MY WISHLIST</h1>
          {items.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={moveAllToCart}
                className="flex items-center gap-2 rounded-sm bg-charcoal px-5 py-2.5 font-sans text-xs font-semibold tracking-wider text-ivory transition-colors hover:bg-charcoal-light"
              >
                <ShoppingBag size={14} />
                MOVE ALL TO CART
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-6 rounded-full bg-cream p-6">
              <Heart className="h-12 w-12 text-charcoal-muted" strokeWidth={1.5} />
            </div>
            <h2 className="mb-2 font-serif text-2xl font-semibold text-charcoal">YOUR WISHLIST IS EMPTY</h2>
            <p className="mb-8 max-w-sm font-sans text-sm text-charcoal-muted">
              Save pieces you love and come back to them later.
            </p>
            <Link
              to="/shop"
              className="rounded-sm bg-charcoal px-8 py-3 font-sans text-sm font-semibold tracking-wider text-ivory transition-colors hover:bg-charcoal-light"
            >
              EXPLORE JEWELLERY
            </Link>
          </motion.div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
