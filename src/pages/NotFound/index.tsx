import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-9xl font-bold text-champagne">404</h1>
        <h2 className="mb-3 mt-4 font-serif text-2xl font-semibold text-charcoal">Page Not Found</h2>
        <p className="mb-8 max-w-md font-sans text-sm text-charcoal-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-sm bg-charcoal px-8 py-3 font-sans text-sm font-semibold tracking-wider text-ivory transition-colors hover:bg-charcoal-light"
          >
            RETURN HOME
          </Link>
          <Link
            to="/shop"
            className="rounded-sm border border-charcoal px-8 py-3 font-sans text-sm font-semibold tracking-wider text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
          >
            BACK TO SHOP
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
