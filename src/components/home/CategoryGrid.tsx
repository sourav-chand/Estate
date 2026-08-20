import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

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

export function CategoryGrid() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <h2 className="mb-12 text-center font-serif text-3xl tracking-wide text-charcoal md:text-4xl">
        SHOP BY CATEGORY
      </h2>

      {/* Desktop: asymmetric grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto hidden max-w-7xl grid-cols-4 gap-4 md:grid md:grid-rows-2"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            className={`group relative overflow-hidden ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <Link to={`/shop?category=${cat.slug}`}>
              <div className="relative h-full min-h-[240px] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors duration-500 group-hover:bg-black/50" />

                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-serif text-2xl text-white">{cat.name}</h3>
                  <span className="mt-2 inline-block font-sans text-sm text-white/80 transition-transform duration-300 group-hover:translate-x-2">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: horizontal scroll */}
      <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.slug}`}
            className="group relative min-w-[260px] flex-shrink-0 overflow-hidden"
          >
            <div className="relative h-[300px] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-serif text-xl text-white">{cat.name}</h3>
                <span className="mt-1 inline-block font-sans text-sm text-white/80 transition-transform duration-300 group-hover:translate-x-2">
                  Explore →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
