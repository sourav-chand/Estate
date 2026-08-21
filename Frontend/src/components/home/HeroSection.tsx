import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=1920&h=1080&fit=crop)',
        }}
      />

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/30 to-charcoal/60" />

      <div className="relative z-10 flex h-full min-h-[85vh] md:min-h-[92vh] flex-col items-center justify-center px-6 text-center">
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="w-12 h-px bg-gold mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider text-ivory leading-tight">
            ELEVATE YOUR
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic text-gold-light leading-tight">
            EVERYDAY
          </h1>
        </motion.div>

        {/* Decorative diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="my-6"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold">
            <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="max-w-lg font-sans text-base md:text-lg text-ivory/80 tracking-wide"
        >
          Signature jewellery for unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="bg-ivory px-10 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-gold hover:text-ivory"
          >
            SHOP COLLECTION
          </Link>
          <Link
            to="/shop?sort=newest"
            className="border border-ivory/40 px-10 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
          >
            EXPLORE NEW
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-ivory/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
