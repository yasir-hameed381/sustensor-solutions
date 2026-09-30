import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  onDark?: boolean;
}

/** Eyebrow + large display heading, with an optional short note aligned to the right on desktop. */
export function SectionHeader({ id, eyebrow, title, aside, onDark = false }: SectionHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="reveal-on-scroll" data-reveal>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <h2 id={id} className="display mt-6 max-w-[780px] text-[clamp(2.6rem,4.8vw,5.2rem)] font-semibold leading-[0.92]">
          {title}
        </h2>
      </div>
      {aside && (
        <p
          className={cn(
            'max-w-[360px] border-l-2 border-gold pl-5 text-sm leading-6',
            onDark ? 'text-on-dark' : 'text-copy',
          )}
        >
          {aside}
        </p>
      )}
    </div>
  );
}
