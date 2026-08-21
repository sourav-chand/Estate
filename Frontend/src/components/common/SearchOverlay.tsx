import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search as SearchIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearch } from '../../context';
import { formatPrice } from '../../utils/format';

const TRENDING = ['Necklaces', 'Earrings', 'Mangalsutra', 'Wedding', 'Gifts'];

export function SearchOverlay() {
  const { isOpen, query, results, closeSearch, setQuery, clearQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeSearch]);

  const handleSelect = (slug: string) => {
    closeSearch();
    clearQuery();
    navigate(`/product/${slug}`);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
            onClick={closeSearch}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 bg-ivory shadow-xl"
          >
            <div className="mx-auto max-w-3xl px-6 py-6">
              <div className="flex items-center gap-4">
                <SearchIcon className="h-5 w-5 shrink-0 text-charcoal-muted" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jewellery..."
                  className="flex-1 bg-transparent font-sans text-lg text-charcoal placeholder:text-charcoal-muted/50 outline-none"
                />
                <button
                  onClick={() => { closeSearch(); clearQuery(); }}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-cream transition-colors"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4 text-charcoal" />
                </button>
              </div>

              <div className="mt-6 max-h-[60vh] overflow-y-auto">
                {!query.trim() ? (
                  <div>
                    <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal-muted">
                      Trending searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleTrendingClick(term)}
                          className="rounded-full border border-beige bg-cream/50 px-4 py-2 font-sans text-sm text-charcoal transition-colors hover:border-gold hover:text-gold"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div>
                    <p className="mb-4 font-sans text-xs text-charcoal-muted">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="flex flex-col gap-1">
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSelect(product.slug)}
                          className="flex items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-cream"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-14 w-14 shrink-0 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-charcoal truncate">
                              {product.name}
                            </p>
                            <p className="font-sans text-xs text-charcoal-muted">
                              {product.category}
                            </p>
                          </div>
                          <span className="shrink-0 font-sans text-sm font-semibold text-charcoal">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="font-sans text-sm text-charcoal-muted">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
