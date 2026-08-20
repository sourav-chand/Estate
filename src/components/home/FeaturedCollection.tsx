import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function FeaturedCollection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&h=800&fit=crop)',
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <h2 className="font-serif text-5xl tracking-wider text-ivory md:text-7xl">
          THE ROSE COLLECTION
        </h2>

        <p className="mt-4 max-w-md font-sans text-lg text-ivory/80">
          Romantic silhouettes. Modern brilliance.
        </p>

        <Link
          to="/collection/rose-gold"
          className="mt-10 border border-gold px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ivory"
        >
          EXPLORE COLLECTION
        </Link>
      </motion.div>
    </section>
  );
}
