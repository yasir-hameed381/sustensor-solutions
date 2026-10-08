import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Eyebrow } from './Eyebrow';
import { useTone } from './tone';

const SIZES = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const;

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: keyof typeof SIZES;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Heading({ as: Tag = 'h2', size = 'h2', id, className, children }: HeadingProps) {
  const inverse = useTone() === 'inverse';
  return (
    <Tag id={id} className={cn(SIZES[size], inverse ? 'text-fg-inverse' : 'text-fg', className)}>
      {children}
    </Tag>
  );
}

/**
 * Highlighted words inside a heading. Logo green by default; `brand` (logo teal) for variety
 * in one or two headings.
 */
export function Accent({ tone = 'accent', children }: { tone?: 'accent' | 'brand'; children: ReactNode }) {
  const inverse = useTone() === 'inverse';
  const colors = {
    accent: inverse ? 'text-accent-300' : 'text-accent-600',
    brand: inverse ? 'text-brand-300' : 'text-brand-600',
  };
  return <span className={colors[tone]}>{children}</span>;
}

interface SectionHeadingProps {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  /** Optional card shown beside the heading on large screens (left-aligned headings only). */
  aside?: ReactNode;
  className?: string;
}

/** Eyebrow + H2 + optional lead, left aligned or centred. */
export function SectionHeading({ id, eyebrow, title, lead, align = 'start', aside, className }: SectionHeadingProps) {
  const inverse = useTone() === 'inverse';
  const leadClass = cn('text-lead', inverse ? 'text-fg-inverse-muted' : 'text-fg-muted');

  const centered = align === 'center';
  if (aside && !centered) {
    return (
      <div className={cn('grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12', className)}>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} className="lg:col-span-7" />
        <div data-reveal className="lg:col-span-5">
          {aside}
        </div>
      </div>
    );
  }
  return (
    <div data-reveal className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {centered ? (
        // Centred headings get a thin line either side of the label (liztek section labels).
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className={cn('h-px w-10 bg-linear-to-l to-transparent sm:w-16', inverse ? 'from-accent-300/60' : 'from-accent-500/60')} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <span aria-hidden="true" className={cn('h-px w-10 bg-linear-to-r to-transparent sm:w-16', inverse ? 'from-accent-300/60' : 'from-accent-500/60')} />
        </div>
      ) : (
        <Eyebrow>{eyebrow}</Eyebrow>
      )}
      <Heading id={id} className="mt-4">
        {title}
      </Heading>
      {lead && <p className={cn(leadClass, 'mt-5 max-w-2xl', centered && 'mx-auto')}>{lead}</p>}
    </div>
  );
}
