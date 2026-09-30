import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const TONES = {
  cream: 'bg-cream text-forest',
  paper: 'bg-paper text-forest',
  mist: 'bg-mist text-forest',
  sage: 'bg-mist-2 text-forest',
  forest: 'bg-forest text-ivory',
} as const;

export type SectionTone = keyof typeof TONES;

interface SectionProps {
  id: string;
  tone?: SectionTone;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = 'cream', labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-20 sm:py-28 lg:py-32', TONES[tone], className)}>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-12 lg:px-24">{children}</div>
    </section>
  );
}
