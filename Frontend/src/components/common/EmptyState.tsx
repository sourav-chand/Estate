import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-cream p-5">
        <Icon className="h-10 w-10 text-charcoal-muted" strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 font-serif text-2xl font-semibold text-charcoal">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-charcoal-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link
          to={actionHref}
          className="rounded-sm bg-charcoal px-6 py-3 font-sans text-sm font-semibold tracking-wider text-ivory transition-colors hover:bg-charcoal-light"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
