import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag, X, MapPin, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import { API_BASE } from '../../utils/api';

interface Address {
  id: number;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
}

type CheckoutStep = 'address' | 'payment' | 'confirmation';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Checkout state
  const [step, setStep] = useState<CheckoutStep>('address');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderResult, setOrderResult] = useState<{ order_number: string; total: number } | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', country: 'India',
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const token = localStorage.getItem('auth_token');

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ESTELE10') {
      setPromoApplied(true);
    }
  };

  const fetchAddresses = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/addresses`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
        const defaultAddr = data.find((a: Address) => a.is_default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      }
    } catch { /* ignore */ }
  };

  const handleAddAddress = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...newAddress, is_default: addresses.length === 0 }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add address');
      }
      const addr = await res.json();
      setAddresses([...addresses, addr]);
      setSelectedAddressId(addr.id);
      setShowAddressForm(false);
      setNewAddress({ full_name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', country: 'India' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      navigate('/shop');
      return;
    }
    if (!selectedAddressId) {
      setError('Please select a shipping address');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({
          address_id: selectedAddressId,
          payment_method: paymentMethod,
          notes: orderNotes || undefined,
          items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to place order');
      }

      const order = await res.json();
      setOrderResult({ order_number: order.order_number, total: order.total });
      setStep('confirmation');
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCheckout = () => {
    if (!token) {
      alert('Please login to place an order. You can use: customer@estele.co / password');
      return;
    }
    setShowCheckout(true);
    setStep('address');
    setError('');
    fetchAddresses();
  };

  // Empty cart state
  if (items.length === 0 && !orderResult) {
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
                  <Link to={`/product/${item.product.slug}`} className="shrink-0">
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
                    {shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}
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

              <button
                onClick={openCheckout}
                className="w-full rounded-sm bg-gold py-4 font-sans text-sm font-semibold tracking-widest text-ivory transition-colors hover:bg-gold-dark"
              >
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

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => { if (step !== 'confirmation') setShowCheckout(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-cream px-6 py-4">
                <h3 className="font-serif text-xl font-semibold text-charcoal">
                  {step === 'confirmation' ? 'Order Placed' : 'Checkout'}
                </h3>
                {step !== 'confirmation' && (
                  <button onClick={() => setShowCheckout(false)} className="text-charcoal-muted hover:text-charcoal">
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Progress steps */}
              {step !== 'confirmation' && (
                <div className="flex items-center gap-2 px-6 py-4 border-b border-cream">
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 'address' ? 'text-gold' : 'text-green-600'}`}>
                    <MapPin size={14} />
                    Address
                  </div>
                  <div className="flex-1 h-px bg-cream" />
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 'payment' ? 'text-gold' : 'text-charcoal-muted'}`}>
                    <CreditCard size={14} />
                    Payment
                  </div>
                </div>
              )}

              <div className="p-6">
                {error && (
                  <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
                )}

                {/* Step: Address */}
                {step === 'address' && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-4">Select shipping address</p>

                    {addresses.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {addresses.map(addr => (
                          <label
                            key={addr.id}
                            className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedAddressId === addr.id ? 'border-gold bg-gold/5' : 'border-cream hover:border-sand'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddressId === addr.id}
                                onChange={() => setSelectedAddressId(addr.id)}
                                className="mt-1 accent-gold"
                              />
                              <div className="text-sm">
                                <p className="font-medium text-charcoal">{addr.full_name} &middot; {addr.phone}</p>
                                <p className="text-charcoal-muted">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                                <p className="text-charcoal-muted">{addr.city}, {addr.state} - {addr.pincode}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}

                    {addresses.length === 0 && !showAddressForm && (
                      <p className="text-sm text-charcoal-muted mb-4">No saved addresses. Add one below.</p>
                    )}

                    {!showAddressForm ? (
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="w-full border border-dashed border-sand rounded-lg py-3 text-sm text-charcoal-muted hover:border-gold hover:text-gold transition-colors"
                      >
                        + Add New Address
                      </button>
                    ) : (
                      <div className="border border-cream rounded-lg p-4 space-y-3">
                        <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-2">New Address</p>
                        <input placeholder="Full Name" value={newAddress.full_name} onChange={e => setNewAddress({ ...newAddress, full_name: e.target.value })} className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        <input placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        <input placeholder="Address Line 1" value={newAddress.line1} onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })} className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        <input placeholder="Address Line 2 (optional)" value={newAddress.line2} onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })} className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} className="border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                          <input placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} className="border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        </div>
                        <input placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold" />
                        <div className="flex gap-2">
                          <button onClick={handleAddAddress} disabled={loading} className="flex-1 bg-charcoal text-ivory py-2 rounded text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Address'}
                          </button>
                          <button onClick={() => setShowAddressForm(false)} className="px-4 border border-cream rounded text-sm text-charcoal-muted hover:bg-gray-50">Cancel</button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (!selectedAddressId) { setError('Please select an address'); return; }
                        setError('');
                        setStep('payment');
                      }}
                      disabled={!selectedAddressId}
                      className="w-full mt-6 bg-gold text-ivory py-3.5 rounded-sm text-sm font-semibold tracking-widest hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </div>
                )}

                {/* Step: Payment */}
                {step === 'payment' && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-4">Select payment method</p>

                    <div className="space-y-2 mb-6">
                      {[
                        { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                        { value: 'upi', label: 'UPI', desc: 'PhonePe, Google Pay, etc.' },
                        { value: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      ].map(opt => (
                        <label
                          key={opt.value}
                          className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
                            paymentMethod === opt.value ? 'border-gold bg-gold/5' : 'border-cream hover:border-sand'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === opt.value}
                              onChange={() => setPaymentMethod(opt.value as any)}
                              className="accent-gold"
                            />
                            <div>
                              <p className="text-sm font-medium text-charcoal">{opt.label}</p>
                              <p className="text-xs text-charcoal-muted">{opt.desc}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-2">Order notes (optional)</p>
                      <textarea
                        value={orderNotes}
                        onChange={e => setOrderNotes(e.target.value)}
                        placeholder="Any special instructions..."
                        rows={2}
                        className="w-full border border-cream rounded px-3 py-2 text-sm outline-none focus:border-gold resize-none"
                      />
                    </div>

                    <div className="border-t border-cream pt-4 mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-charcoal-muted">Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal-muted">Discount</span>
                          <span className="text-green-600">-{formatPrice(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-charcoal-muted">Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('address')}
                        className="px-6 border border-cream rounded-sm text-sm text-charcoal-muted hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="flex-1 bg-gold text-ivory py-3.5 rounded-sm text-sm font-semibold tracking-widest hover:bg-gold-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step: Confirmation */}
                {step === 'confirmation' && orderResult && (
                  <div className="text-center py-4">
                    <div className="mb-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    </div>
                    <h4 className="font-serif text-2xl text-charcoal mb-2">Thank You!</h4>
                    <p className="text-sm text-charcoal-muted mb-6">Your order has been placed successfully.</p>

                    <div className="bg-cream/50 rounded-lg p-4 mb-6 text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-charcoal-muted">Order Number</span>
                        <span className="font-medium text-charcoal">{orderResult.order_number}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal-muted">Total Paid</span>
                        <span className="font-medium text-charcoal">{formatPrice(orderResult.total)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal-muted mb-6">
                      You will receive an email confirmation shortly. Track your order in My Orders.
                    </p>

                    <button
                      onClick={() => { setShowCheckout(false); setOrderResult(null); navigate('/'); }}
                      className="w-full bg-charcoal text-ivory py-3 rounded-sm text-sm font-semibold tracking-wider hover:bg-gold transition-colors"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
