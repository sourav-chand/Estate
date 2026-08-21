import { useState } from 'react';
import { motion } from 'framer-motion';

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-champagne/50">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto py-20 md:py-28 px-6 lg:px-10 text-center"
      >
        {/* Decorative element */}
        <div className="mb-6">
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold mx-auto">
            <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-wide leading-tight mb-4">
          A LITTLE SPARKLE,{' '}
          <br className="hidden sm:block" />
          IN YOUR INBOX.
        </h2>

        <div className="w-10 h-px bg-gold mx-auto my-5" />

        <p className="text-charcoal-muted max-w-md mx-auto mb-10 font-sans text-sm md:text-base">
          Get first access to new collections, exclusive offers and styling
          inspiration.
        </p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-xl text-gold"
          >
            Thank you for joining us ✦
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full sm:flex-1 bg-transparent border-b-2 border-sand py-3.5 px-1 text-charcoal placeholder:text-charcoal-muted/50 font-sans text-sm outline-none focus:border-gold transition-colors duration-300"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-charcoal text-ivory px-8 py-3.5 uppercase tracking-[0.15em] text-xs font-sans font-semibold hover:bg-gold transition-colors duration-300"
            >
              JOIN US
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
