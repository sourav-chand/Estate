import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Minus,
  Plus,
  ChevronDown,
  Truck,
  RefreshCw,
  Shield,
  Star,
} from 'lucide-react';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { StarRating } from '../../components/common/StarRating';
import { ProductGrid } from '../../components/product/ProductGrid';
import { formatPrice } from '../../utils/format';
import type { Product } from '../../types';

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cream">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 font-sans text-sm font-semibold tracking-wider text-charcoal"
      >
        {title}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 font-sans text-sm leading-relaxed text-charcoal-muted">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize(null);

    productService.getProductBySlug(slug).then(p => {
      setProduct(p ?? null);
      setLoading(false);
      if (p) {
        productService.getRelatedProducts(p.id).then(setRelatedProducts);
      }
    });
  }, [slug]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="aspect-square animate-pulse rounded-md bg-champagne/50 lg:col-span-3" />
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="h-8 w-3/4 animate-pulse rounded bg-champagne/50" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-champagne/50" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-champagne/50" />
            <div className="h-20 w-full animate-pulse rounded bg-champagne/50" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 font-serif text-4xl text-charcoal">Product Not Found</h1>
        <p className="mb-6 text-charcoal-muted">The product you're looking for doesn't exist.</p>
        <Link
          to="/shop"
          className="rounded-sm bg-charcoal px-6 py-3 font-sans text-sm font-semibold tracking-wider text-ivory hover:bg-charcoal-light"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = product.compareAtPrice > 0
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToBag = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 font-sans text-xs tracking-wider text-charcoal-muted">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-gold">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="lg:hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="aspect-square w-full rounded-md object-cover"
              />
            </div>

            <div className="hidden lg:grid grid-cols-[72px_1fr] gap-4">
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square w-full overflow-hidden rounded-sm border-2 transition-colors ${
                      selectedImage === i ? 'border-gold' : 'border-cream hover:border-sand'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <div
                ref={imageRef}
                className="relative aspect-square overflow-hidden rounded-md"
                onMouseEnter={() => setZooming(true)}
                onMouseLeave={() => setZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300"
                  style={
                    zooming
                      ? {
                          transform: 'scale(2)',
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <h1 className="font-serif text-3xl font-semibold text-charcoal">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" showNumber />
              <span className="font-sans text-sm text-charcoal-muted">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-2xl font-semibold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice > 0 && (
                <>
                  <span className="font-sans text-base text-charcoal-muted line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="rounded-sm bg-gold/10 px-2 py-0.5 font-sans text-xs font-semibold text-gold-dark">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal-muted">
              {product.description}
            </p>

            <div className="mt-6 space-y-3 font-sans text-sm text-charcoal">
              <div className="flex gap-2">
                <span className="font-semibold">Material:</span>
                <span className="text-charcoal-muted">{product.material}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Color:</span>
                <span className="text-charcoal-muted">{product.color}</span>
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <span className="mb-3 block font-sans text-sm font-semibold tracking-wider text-charcoal">SIZE</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-sm border px-4 py-2 font-sans text-sm transition-colors ${
                        selectedSize === size
                          ? 'border-gold bg-gold/10 text-gold-dark'
                          : 'border-cream text-charcoal hover:border-sand'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <span className="mb-3 block font-sans text-sm font-semibold tracking-wider text-charcoal">QUANTITY</span>
              <div className="inline-flex items-center border border-cream">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 text-charcoal-muted transition-colors hover:text-charcoal"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-sans text-sm font-semibold text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 text-charcoal-muted transition-colors hover:text-charcoal"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleAddToBag}
                className="w-full rounded-sm bg-charcoal py-4 font-sans text-sm font-semibold tracking-widest text-ivory transition-colors hover:bg-charcoal-light"
              >
                ADD TO BAG
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full rounded-sm bg-gold py-4 font-sans text-sm font-semibold tracking-widest text-ivory transition-colors hover:bg-gold-dark"
              >
                BUY NOW
              </button>
              <button
                onClick={() => toggleItem(product)}
                className="flex items-center justify-center gap-2 border border-cream py-3 font-sans text-sm font-semibold tracking-wider text-charcoal transition-colors hover:border-sand"
              >
                <Heart
                  size={18}
                  className={inWishlist ? 'fill-rose text-rose' : ''}
                />
                {inWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            <div className="mt-8 space-y-1">
              <AccordionSection title="Description" defaultOpen>
                <p>{product.description}</p>
                <p className="mt-2">
                  Category: {product.category} | Collection: {product.collection}
                </p>
              </AccordionSection>
              <AccordionSection title="Materials & Care">
                <p>
                  This piece is crafted with {product.material}. To maintain its beauty, avoid
                  contact with water, perfume, and harsh chemicals. Store in a dry place in the
                  provided pouch.
                </p>
              </AccordionSection>
              <AccordionSection title="Shipping & Returns">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Truck size={16} className="mt-0.5 shrink-0 text-gold" />
                    <span>Free shipping on orders above ₹1,499. Standard delivery in 5-7 business days.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <RefreshCw size={16} className="mt-0.5 shrink-0 text-gold" />
                    <span>Easy 7-day return policy. Items must be unused and in original packaging.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield size={16} className="mt-0.5 shrink-0 text-gold" />
                    <span>All products come with a authenticity guarantee.</span>
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-charcoal">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
