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
    transition: { staggerChildren: 0.08 },
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
    <section className="border-y border-sand/40">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-7xl mx-auto py-10 md:py-12 px-6 lg:px-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className={`flex flex-col items-center text-center gap-2.5 ${
                i < trustItems.length - 1 ? 'md:border-r md:border-sand/30' : ''
              }`}
            >
              <item.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="font-sans text-xs font-medium text-charcoal tracking-wide">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
