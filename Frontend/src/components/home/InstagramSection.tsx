import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=400&fit=crop',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function InstagramSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">@estelejewellery</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-charcoal">
            Styled by You
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4"
        >
          {images.map((src, index) => (
            <motion.div key={index} variants={itemVariants}>
              <a
                href="https://instagram.com/estelejewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={src}
                  alt={`Estèle jewellery style ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <Heart className="w-5 h-5 text-ivory mb-1.5" />
                  <span className="text-ivory text-[10px] font-sans uppercase tracking-widest">
                    View on Instagram
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
