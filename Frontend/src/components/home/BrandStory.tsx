import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-cream/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Since 1989
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide text-charcoal leading-tight mb-6">
              CRAFTED WITH PURPOSE
            </h2>

            {/* Decorative line */}
            <div className="w-10 h-px bg-gold mb-6" />

            <p className="text-charcoal-muted leading-relaxed mb-8 font-sans text-sm md:text-base">
              For decades, we have combined Indian craftsmanship with contemporary
              design. Each piece is thoughtfully created in our Hyderabad workshop,
              blending heritage techniques with modern aesthetics.
            </p>
            <Link
              to="/about"
              className="inline-block border border-charcoal text-charcoal px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] hover:bg-charcoal hover:text-ivory transition-all duration-300"
            >
              DISCOVER OUR STORY →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop"
                alt="Estèle Jewellery craftsmanship"
                className="w-full h-[350px] md:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
