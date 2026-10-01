import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { useTone } from './tone';

interface CardProps {
  as?: ElementType;
  /** Adds a lift + border highlight on hover. */
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  children: ReactNode;
}

const PADDING = { sm: 'p-5', md: 'p-6 sm:p-7', lg: 'p-6 sm:p-8 lg:p-10' } as const;

export function Card({ as: Tag = 'div', interactive = false, padding = 'md', className, id, children }: CardProps) {
  const inverse = useTone() === 'inverse';
  return (
    <Tag
      id={id}
      className={cn(
        'relative rounded-xl border',
        inverse ? 'border-hairline-inverse bg-white/4' : 'border-hairline bg-surface shadow-xs',
        interactive &&
          'group transition-[transform,box-shadow,border-color,background-color] duration-(--duration-base) ease-out-soft hover:-translate-y-0.5',
        interactive && (inverse ? 'spotlight spotlight-inverse hover:bg-white/6' : 'spotlight hover:shadow-md'),
        PADDING[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
