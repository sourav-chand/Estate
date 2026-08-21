import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">Browse</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal">
            SHOP BY CATEGORY
          </h2>
        </div>
      </div>

      {/* Desktop: 4-col masonry with alternating tall/short */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="hidden md:grid max-w-7xl mx-auto px-6 lg:px-10 grid-cols-4 gap-4 auto-rows-[280px]"
      >
        {categories.slice(0, 8).map((cat, i) => {
          const isLarge = i === 0 || i === 5;
          return (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-lg ${
                isLarge ? 'row-span-2' : ''
              }`}
            >
              <Link to={`/shop?category=${cat.slug}`}>
                <div className="relative h-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent transition-colors duration-500 group-hover:from-charcoal/80" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-serif text-2xl text-white mb-1">{cat.name}</h3>
                    <span className="inline-block font-sans text-xs uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:text-gold-light group-hover:translate-x-1">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile: horizontal scroll */}
      <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.slug}`}
            className="group relative min-w-[240px] flex-shrink-0 overflow-hidden rounded-lg"
          >
            <div className="relative h-[300px] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-serif text-xl text-white mb-1">{cat.name}</h3>
                <span className="inline-block font-sans text-xs uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:text-gold-light">
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
