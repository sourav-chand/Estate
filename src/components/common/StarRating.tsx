import { Star } from 'lucide-react';
import { getStarArray } from '../../utils/format';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const sizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
};

export function StarRating({ rating, size = 'sm', showNumber = false }: StarRatingProps) {
  const stars = getStarArray(rating);
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((type, i) => (
        <span key={i} className="relative">
          <Star
            size={iconSize}
            className="text-sand"
            fill="currentColor"
            strokeWidth={0}
          />
          {type === 'half' && (
            <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star
                size={iconSize}
                className="text-gold"
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
          )}
          {type === 'full' && (
            <Star
              size={iconSize}
              className="absolute inset-0 text-gold"
              fill="currentColor"
              strokeWidth={0}
            />
          )}
        </span>
      ))}
      {showNumber && (
        <span className="ml-1 font-sans text-xs text-charcoal-muted">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}
