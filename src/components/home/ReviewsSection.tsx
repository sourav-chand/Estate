import { useRef } from 'react';
import { motion } from 'framer-motion';
import { reviews } from '../../data/reviews';
import { StarRating } from '../common/StarRating';

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-4xl text-charcoal text-center tracking-wide mb-12"
      >
        LOVED BY THOUSANDS
      </motion.h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="flex-none w-[85vw] sm:w-[420px] md:w-[calc(33.333%-16px)] snap-start bg-cream rounded-lg p-8 relative"
          >
            <span
              aria-hidden
              className="absolute top-4 left-6 font-serif text-6xl text-gold/20 leading-none select-none"
            >
              &ldquo;
            </span>

            <p className="font-serif italic text-lg text-charcoal leading-relaxed mt-8 mb-6 relative z-10">
              {review.comment}
            </p>

            <StarRating rating={review.rating} />

            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="font-sans text-sm font-medium text-charcoal">
                — {review.customerName}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-sans text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="w-3 h-3"
                >
                  <path
                    d="M6 0l1.5 3.5L11 4.5 8.5 7l.5 3.5L6 9l-3 1.5.5-3.5L1 4.5l3.5-1z"
                    fill="currentColor"
                  />
                </svg>
                Verified Customer
              </span>
            </div>

            {review.product && (
              <p className="mt-3 text-xs font-sans text-charcoal-muted">
                Purchased: {review.product}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
