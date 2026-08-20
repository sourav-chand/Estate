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
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-4xl text-charcoal text-center tracking-wide mb-12"
      >
        YOUR BUDGET, YOUR SPARKLE
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {budgets.map((budget) => (
          <motion.div key={budget.link} variants={cardVariants}>
            <Link
              to={budget.link}
              className="group relative block overflow-hidden rounded-xl aspect-[3/4]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${budget.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20 group-hover:from-charcoal/70 group-hover:via-charcoal/35 group-hover:to-charcoal/15 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="font-serif text-4xl text-ivory mb-3 tracking-wide">
                  {budget.title}
                </h3>
                <p className="text-ivory/80 font-sans text-base">
                  {budget.tagline}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
