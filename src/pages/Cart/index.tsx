import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ESTELE10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <h1 className="mb-8 text-center font-serif text-4xl font-semibold tracking-wide text-charcoal">
            SHOPPING BAG
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-6 rounded-full bg-cream p-6">
              <ShoppingBag className="h-12 w-12 text-charcoal-muted" strokeWidth={1.5} />
            </div>
            <h2 className="mb-2 font-serif text-2xl font-semibold text-charcoal">YOUR BAG IS EMPTY</h2>
            <p className="mb-8 max-w-sm font-sans text-sm text-charcoal-muted">
              Looks like you haven&apos;t added anything to your bag yet.
            </p>
            <Link
              to="/shop"
              className="rounded-sm bg-charcoal px-8 py-3 font-sans text-sm font-semibold tracking-wider text-ivory transition-colors hover:bg-charcoal-light"
            >
              CONTINUE SHOPPING
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <h1 className="mb-2 text-center font-serif text-4xl font-semibold tracking-wide text-charcoal">
          SHOPPING BAG
        </h1>
        <p className="mb-8 text-center font-sans text-sm text-charcoal-muted">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your bag
        </p>

        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between border-b border-cream pb-4">
              <span className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={clearCart}
                className="font-sans text-xs tracking-wider text-charcoal-muted transition-colors hover:text-rose"
              >
                CLEAR ALL
              </button>
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 border-b border-cream py-6"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-28 w-28 rounded-sm object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif text-lg font-semibold text-charcoal transition-colors hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-0.5 font-sans text-xs text-charcoal-muted">
                        {item.product.category} &middot; {item.product.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-cream">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 text-charcoal-muted transition-colors hover:text-charcoal"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-sans text-sm font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 text-charcoal-muted transition-colors hover:text-charcoal"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-sans text-base font-semibold text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-charcoal-muted transition-colors hover:text-rose"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-[380px]">
            <div className="sticky top-24 rounded-md border border-cream bg-white p-6">
              <h2 className="mb-6 font-serif text-xl font-semibold text-charcoal">ORDER SUMMARY</h2>

              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between font-sans text-sm text-charcoal-muted">
                  <span>
                    {subtotal >= FREE_SHIPPING_THRESHOLD
                      ? 'You qualify for free shipping!'
                      : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping`}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 border-b border-cream py-4">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-charcoal-muted">Subtotal</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-charcoal-muted">Discount (10%)</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-charcoal-muted">Shipping</span>
                  <span className="text-charcoal">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4 font-sans text-base font-semibold">
                <span className="text-charcoal">Total</span>
                <span className="text-charcoal">{formatPrice(total)}</span>
              </div>

              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="w-full rounded-sm border border-cream bg-ivory py-2.5 pl-9 pr-3 font-sans text-sm text-charcoal outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="shrink-0 rounded-sm border border-charcoal px-4 font-sans text-xs font-semibold tracking-wider text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  APPLY
                </button>
              </div>

              {promoApplied && (
                <p className="mb-4 font-sans text-xs text-green-600">Promo code applied! 10% discount.</p>
              )}

              <button className="w-full rounded-sm bg-gold py-4 font-sans text-sm font-semibold tracking-widest text-ivory transition-colors hover:bg-gold-dark">
                PROCEED TO CHECKOUT
              </button>

              <Link
                to="/shop"
                className="mt-3 block text-center font-sans text-xs tracking-wider text-charcoal-muted transition-colors hover:text-gold"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
