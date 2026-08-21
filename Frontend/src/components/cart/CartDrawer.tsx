import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context';
import { formatPrice } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-cream px-6 py-5">
              <h2 className="font-serif text-xl tracking-wide text-charcoal">
                YOUR BAG
                {itemCount > 0 && (
                  <span className="ml-2 font-sans text-sm text-charcoal-muted">({itemCount})</span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-cream transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4 text-charcoal" />
              </button>
            </div>

            {freeShippingDiff > 0 && items.length > 0 && (
              <div className="px-6 py-3">
                <p className="mb-1.5 font-sans text-xs text-charcoal-muted">
                  You are <span className="font-semibold text-gold">{formatPrice(freeShippingDiff)}</span> away from free shipping.
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 rounded-full bg-cream p-5">
                    <svg className="h-10 w-10 text-charcoal-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="mb-6 max-w-[240px] font-sans text-sm text-charcoal-muted">
                    Something beautiful is waiting for you.
                  </p>
                  <button
                    onClick={closeCart}
                    className="rounded-sm bg-charcoal px-8 py-3 font-sans text-xs font-semibold tracking-widest text-ivory transition-colors hover:bg-charcoal-light"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        className="flex gap-4 border-b border-cream py-5"
                      >
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="shrink-0"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-20 w-20 rounded-md object-cover"
                          />
                        </Link>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={closeCart}
                              className="font-sans text-sm font-medium text-charcoal transition-colors hover:text-gold line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-0.5 font-sans text-xs text-charcoal-muted">
                              {item.product.color}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-cream">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1.5 text-charcoal-muted transition-colors hover:text-charcoal"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center font-sans text-xs font-semibold text-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1.5 text-charcoal-muted transition-colors hover:text-charcoal"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-sans text-sm font-semibold text-charcoal">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-charcoal-muted transition-colors hover:text-rose"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-cream px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-sans text-sm text-charcoal-muted">Subtotal</span>
                  <span className="font-sans text-base font-semibold text-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="mb-3 block w-full rounded-sm bg-charcoal py-4 text-center font-sans text-xs font-semibold tracking-widest text-ivory transition-colors hover:bg-charcoal-light"
                >
                  VIEW BAG & CHECKOUT
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center font-sans text-xs tracking-wider text-charcoal-muted transition-colors hover:text-gold"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
