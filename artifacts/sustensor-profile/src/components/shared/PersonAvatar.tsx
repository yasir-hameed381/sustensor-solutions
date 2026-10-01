import { initials } from '@/lib/initials';
import { cn } from '@/lib/utils';

const SIZES = {
  md: { box: 'size-14 text-h4', px: 56 },
  lg: { box: 'size-20 text-h3', px: 80 },
} as const;

interface PersonAvatarProps {
  name: string;
  /** Portrait path; falls back to a monogram when absent. */
  image?: string;
  size?: keyof typeof SIZES;
  className?: string;
}

/** Portrait when an image exists, otherwise a monogram on a dark-teal gradient. */
export function PersonAvatar({ name, image, size = 'md', className }: PersonAvatarProps) {
  const { box, px } = SIZES[size];
  return (
    // Logo green → teal gradient ring around the portrait or monogram.
    <span className={cn('relative inline-flex w-fit shrink-0 self-start rounded-full bg-conic from-accent-500 via-brand-500 to-accent-500 p-0.5 transition-transform duration-(--duration-slow) ease-out-soft group-hover:rotate-12', className)}>
      <AvatarFace name={name} image={image} box={box} px={px} />
    </span>
  );
}

function AvatarFace({ name, image, box, px }: { name: string; image?: string; box: string; px: number }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`Portrait of ${name}`}
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        className={cn('shrink-0 rounded-full object-cover ring-2 ring-surface', box)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-ink-700 to-ink-950 font-semibold tracking-tight text-white ring-2 ring-surface',
        box,
      )}
    >
      {initials(name)}
    </span>
  );
}
