import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const VARIANTS = {
  /** Logo-green fill. The main call to action on light surfaces. */
  primary: 'btn-shine bg-accent-600 text-white shadow-sm hover:bg-accent-700',
  /** Logo-green fill with a soft glow. Use on ink. */
  'primary-inverse': 'btn-shine bg-accent-600 text-white shadow-glow hover:bg-accent-500',
  /** Outlined, light surfaces. */
  secondary: 'border border-hairline-strong bg-surface text-fg shadow-xs hover:border-fg-subtle hover:bg-canvas',
  /** Outlined, on ink. */
  'secondary-inverse':
    'border border-hairline-inverse-strong bg-white/5 text-fg-inverse hover:border-fg-inverse-subtle hover:bg-white/10',
  /** Text-only. */
  ghost: 'text-accent-700 hover:bg-accent-50',
  'ghost-inverse': 'text-accent-300 hover:bg-white/5',
} as const;

const SIZES = {
  // Small buttons still get a 44px touch target on coarse pointers.
  sm: 'h-9 gap-1.5 px-3.5 text-small pointer-coarse:h-11',
  md: 'h-11 gap-2 px-5 text-small',
  lg: 'h-13 gap-2.5 px-6 text-body',
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  /** Icon placement. Trailing icons nudge right on hover. */
  iconPosition?: 'leading' | 'trailing';
  className?: string;
  children: ReactNode;
}

export function buttonClassName({ variant = 'primary', size = 'md', className }: Pick<StyleProps, 'variant' | 'size' | 'className'>) {
  return cn(
    'group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-semibold',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-out-soft',
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

function Content({ icon: Icon, iconPosition = 'trailing', size = 'md', children }: StyleProps) {
  const iconClass = cn(size === 'lg' ? 'size-5' : 'size-4', 'shrink-0');
  return (
    <>
      {Icon && iconPosition === 'leading' && <Icon aria-hidden="true" className={iconClass} />}
      {children}
      {Icon && iconPosition === 'trailing' && (
        <Icon
          aria-hidden="true"
          className={cn(iconClass, 'transition-transform duration-(--duration-fast) group-hover/button:translate-x-0.5')}
        />
      )}
    </>
  );
}

type ButtonLinkProps = StyleProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

export function ButtonLink({ variant, size, icon, iconPosition, className, children, ...rest }: ButtonLinkProps) {
  return (
    <a className={buttonClassName({ variant, size, className })} {...rest}>
      <Content icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </Content>
    </a>
  );
}

type ButtonProps = StyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button({ variant, size, icon, iconPosition, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClassName({ variant, size, className })} {...rest}>
      <Content icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </Content>
    </button>
  );
}
