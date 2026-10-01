import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Container } from './Container';
import { ToneContext, type Tone } from './tone';

const VARIANTS = {
  canvas: { className: 'bg-canvas text-fg', tone: 'light' },
  surface: { className: 'bg-surface text-fg', tone: 'light' },
  tint: { className: 'bg-tint text-fg', tone: 'light' },
  ink: { className: 'bg-ink-950 text-fg-inverse', tone: 'inverse' },
} as const satisfies Record<string, { className: string; tone: Tone }>;

export type SectionVariant = keyof typeof VARIANTS;

interface SectionProps {
  id: string;
  labelledBy: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  /** Rendered behind the container, e.g. a decorative background. */
  backdrop?: ReactNode;
  children: ReactNode;
}

export function Section({ id, labelledBy, variant = 'canvas', className, containerClassName, backdrop, children }: SectionProps) {
  const { className: variantClassName, tone } = VARIANTS[variant];
  return (
    <ToneContext.Provider value={tone}>
      <section
        id={id}
        aria-labelledby={labelledBy}
        className={cn('relative isolate overflow-hidden py-section', variantClassName, className)}
      >
        {backdrop}
        <Container className={containerClassName}>{children}</Container>
      </section>
    </ToneContext.Provider>
  );
}
