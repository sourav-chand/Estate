import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { collections } from '../../data/collections';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CollectionsGrid() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <h2 className="mb-12 text-center font-serif text-3xl tracking-wide text-charcoal md:text-4xl">
        CURATED FOR YOU
      </h2>

      {/* Desktop: asymmetric 2-col masonry */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto hidden max-w-7xl grid-cols-2 gap-4 md:grid"
      >
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            variants={itemVariants}
            className={`group relative overflow-hidden ${
              i === 0 ? 'col-span-2' : ''
            }`}
          >
            <Link to={`/collection/${col.slug}`}>
              <div
                className={`relative overflow-hidden ${
                  i === 0 ? 'h-[420px]' : 'h-[280px]'
                }`}
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/80" />

                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-serif text-xl text-white">{col.name}</h3>
                  <p className="mt-1 font-sans text-sm text-white/70">
                    {col.productCount} pieces
                  </p>
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
            className="group relative overflow-hidden"
          >
            <div className="relative h-[200px] overflow-hidden">
              <img
                src={col.image}
                alt={col.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
    </section>
  );
}
