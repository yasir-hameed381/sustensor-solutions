import { company } from '@/content/company';
import { cn } from '@/lib/utils';

/** Logo + wordmark. `inverse` for dark backgrounds. */
export function BrandMark({ inverse = true, className }: { inverse?: boolean; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <img
        src={inverse ? company.logo.onDark : company.logo.onLight}
        alt=""
        width={118}
        height={156}
        className="h-9 w-auto"
      />
      <span className={cn('text-h4 font-semibold tracking-tight', inverse ? 'text-fg-inverse' : 'text-fg')}>
        {company.shortName}
      </span>
    </span>
  );
}
