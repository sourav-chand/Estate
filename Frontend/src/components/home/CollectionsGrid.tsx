import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function CollectionsGrid() {
  return (
    <section className="py-16 md:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">Curated</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal">
            CURATED FOR YOU
          </h2>
        </div>

        {/* Desktop: asymmetric masonry */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="hidden md:grid grid-cols-2 gap-4"
        >
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-lg ${
                i === 0 ? 'col-span-2' : ''
              }`}
            >
              <Link to={`/collection/${col.slug}`}>
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? 'h-[400px]' : 'h-[280px]'
                  }`}
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-colors duration-500 group-hover:from-charcoal/90" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-serif text-2xl text-white mb-1">{col.name}</h3>
                    <p className="font-sans text-sm text-white/60">
                      {col.productCount} pieces
                    </p>
                    <span className="mt-3 inline-block font-sans text-xs uppercase tracking-widest text-gold transition-all duration-300 group-hover:translate-x-1">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: 2-col equal grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collection/${col.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <h3 className="font-serif text-sm text-white">{col.name}</h3>
                  <p className="font-sans text-xs text-white/60">
                    {col.productCount} pieces
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
