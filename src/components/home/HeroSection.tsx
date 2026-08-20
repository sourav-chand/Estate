import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=1920&h=1080&fit=crop)',
        }}
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full min-h-[70vh] md:min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif text-6xl tracking-wider text-ivory md:text-8xl lg:text-9xl">
            ELEVATE YOUR
          </h1>
          <h1 className="font-serif text-6xl italic text-gold-light md:text-8xl lg:text-9xl">
            EVERYDAY
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 max-w-lg font-sans text-lg text-ivory/90 md:text-xl"
        >
          Signature jewellery for unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="bg-ivory px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-charcoal transition-colors hover:bg-gold hover:text-ivory"
          >
            SHOP COLLECTION
          </Link>
          <Link
            to="/shop?sort=newest"
            className="border border-ivory px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-ivory transition-colors hover:bg-ivory/10"
          >
            EXPLORE NEW
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-ivory/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
