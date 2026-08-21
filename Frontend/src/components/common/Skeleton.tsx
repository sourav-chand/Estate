interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rect', width, height }: SkeletonProps) {
  const baseClass = 'animate-pulse bg-champagne/50';

  const variantClass = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded-sm h-4',
  }[variant];

  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? (variant === 'circle' ? width : variant === 'text' ? 16 : 200),
  };

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton variant="rect" className="aspect-square w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-1/3" />
    </div>
  );
}

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return <Skeleton variant="rect" className={`aspect-square w-full ${className}`} />;
}

export function TextSkeleton({ className = '', lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}
