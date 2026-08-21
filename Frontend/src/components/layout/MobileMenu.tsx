import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '../../context';
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from '../../utils/constants';

const menuVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (href: string) => {
      closeMobileMenu();
      navigate(href);
    },
    [closeMobileMenu, navigate],
  );

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-full bg-ivory flex flex-col"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-16">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="font-serif tracking-[0.3em] text-xl text-charcoal font-semibold"
              >
                {SITE_NAME}
              </Link>
              <button
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-10 h-10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-beige mx-6" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleNavigate(link.href)}
                  className="font-serif text-2xl tracking-wider text-charcoal hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Social links */}
            <div className="px-6 pb-10 flex flex-col items-center gap-5">
              <div className="h-px bg-beige w-full mb-2" />
              <div className="flex items-center gap-6">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.15em] text-charcoal-muted hover:text-gold transition-colors duration-300"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
