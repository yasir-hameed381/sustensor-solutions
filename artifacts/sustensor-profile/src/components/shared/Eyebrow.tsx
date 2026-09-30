import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: string;
  onDark?: boolean;
  className?: string;
}

export function Eyebrow({ children, onDark = false, className }: EyebrowProps) {
  return (
    <p className={cn('mono flex items-center gap-3 text-[10px] font-medium', onDark ? 'text-sage' : 'text-emerald', className)}>
      <span aria-hidden="true" className={cn('h-px w-8', onDark ? 'bg-sage' : 'bg-emerald')} />
      {children}
    </p>
  );
}
