import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANNOUNCEMENT_MESSAGES } from '../../utils/constants';

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="bg-charcoal text-ivory overflow-hidden">
      <div className="mx-auto flex items-center justify-center h-9 relative">
        {/* Desktop / auto-rotating */}
        <div className="hidden sm:flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-xs uppercase tracking-[0.2em] font-sans text-ivory/90"
            >
              {ANNOUNCEMENT_MESSAGES[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Mobile / horizontally scrollable */}
        <div className="sm:hidden flex items-center gap-8 overflow-x-auto no-scrollbar w-full px-4 snap-x snap-mandatory">
          {ANNOUNCEMENT_MESSAGES.map((msg, i) => (
            <span
              key={i}
              className="flex-none text-xs uppercase tracking-[0.2em] font-sans text-ivory/90 snap-center whitespace-nowrap"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
