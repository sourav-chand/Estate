import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collectionService, type Collection } from '../../services/collectionService';

export function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    collectionService.getCollections().then(setCollections).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <h1 className="mb-2 text-center font-serif text-4xl font-semibold tracking-wide text-charcoal">
          COLLECTIONS
        </h1>
        <p className="mb-12 text-center font-sans text-sm text-charcoal-muted">
          Explore our curated jewellery collections
        </p>

        {loading ? (
          <div className="py-20 text-center text-charcoal-muted">Loading...</div>
        ) : collections.length === 0 ? (
          <div className="py-20 text-center text-charcoal-muted">No collections found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/collection/${collection.slug}`}
                  className="group block overflow-hidden rounded-xl border border-cream bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-semibold text-white">{collection.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="mb-3 font-sans text-sm text-charcoal-muted line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs text-charcoal-muted">
                        {collection.productCount} products
                      </span>
                      <span className="flex items-center gap-1 font-sans text-xs font-medium text-gold group-hover:text-gold-dark transition-colors">
                        View Collection <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
