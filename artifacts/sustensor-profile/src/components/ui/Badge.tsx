import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { useTone } from './tone';

const LIGHT = {
  accent: 'border-accent-100 bg-accent-50 text-accent-800',
  neutral: 'border-hairline bg-canvas text-fg-muted',
  sand: 'border-sand-300 bg-surface text-sand-700',
} as const;

const INVERSE = {
  accent: 'border-accent-400/30 bg-accent-400/10 text-accent-300',
  neutral: 'border-hairline-inverse bg-white/5 text-fg-inverse-muted',
  sand: 'border-sand-300/30 bg-sand-300/10 text-sand-300',
} as const;

interface BadgeProps {
  tone?: keyof typeof LIGHT;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = 'accent', className, children }: BadgeProps) {
  const inverse = useTone() === 'inverse';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption font-medium',
        (inverse ? INVERSE : LIGHT)[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
