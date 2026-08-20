import { useState } from 'react';
import { motion } from 'framer-motion';

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-champagne">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-[1400px] mx-auto py-20 md:py-28 px-4 md:px-8 lg:px-16 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal tracking-wide leading-tight mb-4">
          A LITTLE SPARKLE,{' '}
          <br className="hidden sm:block" />
          IN YOUR INBOX.
        </h2>
        <p className="text-charcoal-muted max-w-md mx-auto mb-10">
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full sm:flex-1 bg-transparent border-b-2 border-charcoal py-4 px-1 text-charcoal placeholder:text-charcoal-muted/60 font-sans text-base outline-none focus:border-gold transition-colors duration-300"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-charcoal text-ivory px-8 py-4 uppercase tracking-widest text-sm font-sans font-medium hover:bg-gold transition-colors duration-300"
            >
              JOIN US
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
