import { motion } from 'framer-motion';
import { Shield, RotateCcw, Truck, Gem, Award } from 'lucide-react';

const trustItems = [
  { icon: Shield, label: '100% Anti-Tarnish' },
  { icon: RotateCcw, label: '7-Day Easy Returns' },
  { icon: Truck, label: 'Free Shipping' },
  { icon: Gem, label: '24K Gold Plated' },
  { icon: Award, label: '1-Year Warranty' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function TrustSection() {
  return (
    <section className="border-t border-b border-sand/60">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-[1400px] mx-auto py-10 md:py-14 px-4 md:px-8 lg:px-16 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4"
      >
        {trustItems.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="flex flex-col items-center text-center gap-3"
          >
            <item.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
            <span className="font-sans text-sm font-medium text-charcoal">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
