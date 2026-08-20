import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const budgets = [
  {
    title: 'UNDER ₹999',
    tagline: 'Everyday sparkle',
    link: '/shop?maxPrice=999',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop',
  },
  {
    title: 'UNDER ₹1,499',
    tagline: 'Effortless elegance',
    link: '/shop?maxPrice=1499',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
  },
  {
    title: 'UNDER ₹2,999',
    tagline: 'Make a statement',
    link: '/shop?maxPrice=2999',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export function BudgetSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">Budget</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal">
            YOUR BUDGET, YOUR SPARKLE
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {budgets.map((budget) => (
            <motion.div key={budget.link} variants={cardVariants}>
              <Link
                to={budget.link}
                className="group relative block overflow-hidden rounded-lg aspect-[3/4]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${budget.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10 group-hover:from-charcoal/70 group-hover:via-charcoal/25 group-hover:to-charcoal/5 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="mb-4">
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold mx-auto">
                      <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-ivory mb-2 tracking-wide">
                    {budget.title}
                  </h3>
                  <p className="text-ivory/60 font-sans text-sm tracking-wide">
                    {budget.tagline}
                  </p>
                  <span className="mt-6 inline-block font-sans text-xs uppercase tracking-widest text-gold/80 transition-all duration-300 group-hover:text-gold group-hover:translate-x-1">
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
