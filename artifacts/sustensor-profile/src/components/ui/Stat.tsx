import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { useTone } from './tone';

interface StatProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

/** A large figure with a caption, for stat bands. */
export function Stat({ value, label, className }: StatProps) {
  const inverse = useTone() === 'inverse';
  return (
    <div className={className}>
      <dt className={cn('text-small', inverse ? 'text-fg-inverse-muted' : 'text-fg-muted')}>{label}</dt>
      <dd className={cn('order-first text-h2 tabular-nums', inverse ? 'text-fg-inverse' : 'text-fg')}>{value}</dd>
    </div>
  );
}
