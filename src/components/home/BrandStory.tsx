import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BrandStory() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 md:order-1"
        >
          <p className="font-sans text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Since 1989
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal tracking-wide leading-tight mb-6">
            CRAFTED WITH PURPOSE
          </h2>
          <p className="text-charcoal-muted leading-relaxed mb-8 max-w-lg">
            For decades, we have combined Indian craftsmanship with contemporary
            design. Each piece is thoughtfully created in our Hyderabad workshop,
            blending heritage techniques with modern aesthetics.
          </p>
          <Link
            to="/about"
            className="inline-block border border-charcoal text-charcoal px-8 py-3.5 uppercase tracking-widest text-sm font-sans font-medium hover:bg-charcoal hover:text-ivory transition-all duration-300"
          >
            DISCOVER OUR STORY →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="order-1 md:order-2"
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop"
              alt="Estèle Jewellery craftsmanship"
              className="w-full h-[400px] md:h-[560px] object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
