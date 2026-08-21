import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function FeaturedCollection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&h=800&fit=crop)',
        }}
      />

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-charcoal/30 to-charcoal/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto"
      >
        {/* Decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-gold mb-6"
        />

        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
          Featured
        </p>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-wider text-ivory leading-tight">
          THE ROSE COLLECTION
        </h2>

        <div className="my-5">
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold">
            <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
          </svg>
        </div>

        <p className="max-w-md font-sans text-base text-ivory/70 tracking-wide">
          Romantic silhouettes. Modern brilliance.
        </p>

        <Link
          to="/collection/rose-gold"
          className="mt-8 border border-gold/60 px-10 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
        >
          EXPLORE COLLECTION
        </Link>
      </motion.div>
    </section>
  );
}
