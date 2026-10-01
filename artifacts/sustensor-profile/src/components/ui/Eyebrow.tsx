import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { useTone } from './tone';

/** Small uppercase label above a heading, with an accent dot. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  const inverse = useTone() === 'inverse';
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border py-1 pl-2.5 pr-3 text-eyebrow uppercase backdrop-blur-sm',
        inverse ? 'border-hairline-inverse-strong bg-white/5 text-accent-300' : 'border-accent-100 bg-surface/70 text-accent-700 shadow-xs',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-1.5 rounded-full ring-3', inverse ? 'bg-brand-300 ring-brand-300/20' : 'bg-brand-600 ring-brand-600/15')}
      />
      {children}
    </p>
  );
}
