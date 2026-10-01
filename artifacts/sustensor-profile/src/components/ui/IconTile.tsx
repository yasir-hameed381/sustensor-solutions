import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useTone } from './tone';

const SIZES = {
  sm: { box: 'size-9 rounded-sm', icon: 'size-4' },
  md: { box: 'size-11 rounded-md', icon: 'size-5' },
  lg: { box: 'size-14 rounded-lg', icon: 'size-6' },
} as const;

interface IconTileProps {
  icon: LucideIcon;
  size?: keyof typeof SIZES;
  /** `solid` fills with the accent (used for hover/active states). */
  emphasis?: 'soft' | 'solid';
  /** `brand` (logo teal) for sustainability/ESG items; logo green otherwise. */
  tone?: 'accent' | 'brand';
  className?: string;
}

export function IconTile({ icon: Icon, size = 'md', emphasis = 'soft', tone = 'accent', className }: IconTileProps) {
  const inverse = useTone() === 'inverse';
  const { box, icon } = SIZES[size];
  const palette = {
    accent: {
      solid: 'bg-accent-600 text-white',
      inverse: 'border border-accent-400/25 bg-linear-to-br from-accent-400/20 to-accent-400/5 text-accent-300',
      light: 'border border-accent-100 bg-linear-to-br from-accent-50 to-accent-100 text-accent-700 shadow-xs',
    },
    brand: {
      solid: 'bg-brand-600 text-white',
      inverse: 'border border-brand-300/25 bg-linear-to-br from-brand-300/20 to-brand-300/5 text-brand-300',
      light: 'border border-brand-100 bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 shadow-xs',
    },
  }[tone];
  const colors = emphasis === 'solid' ? palette.solid : inverse ? palette.inverse : palette.light;
  return (
    // Duotone tile; lifts and tilts when an ancestor `.group` is hovered.
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center transition-transform duration-(--duration-base) ease-out-soft group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:scale-105',
        box,
        colors,
        className,
      )}
    >
      <Icon className={icon} strokeWidth={1.75} />
    </span>
  );
}
