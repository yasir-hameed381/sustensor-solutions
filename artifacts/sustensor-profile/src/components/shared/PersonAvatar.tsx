import { initials } from '@/lib/initials';
import { cn } from '@/lib/utils';

interface PersonAvatarProps {
  name: string;
  photo?: string;
  className?: string;
}

export function PersonAvatar({ name, photo, className }: PersonAvatarProps) {
  if (photo) {
    return <img src={photo} alt={name} className={cn('shrink-0 rounded-full object-cover', className)} />;
  }
  return (
    <span aria-hidden="true" className={cn('flex shrink-0 items-center justify-center rounded-full font-semibold', className)}>
      {initials(name)}
    </span>
  );
}
