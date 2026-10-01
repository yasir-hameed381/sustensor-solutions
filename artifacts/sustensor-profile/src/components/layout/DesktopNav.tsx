import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { primaryNav, type NavItem, type NavLink } from '@/content/navigation';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/utils';

interface DesktopNavProps {
  activeHref: string | null;
  onNavigate: (link: NavLink) => void;
}

const linkClass = (active: boolean) =>
  cn(
    'relative inline-flex h-9 items-center gap-1 rounded-full px-3 text-small font-medium transition-colors duration-(--duration-fast)',
    active ? 'text-fg' : 'text-fg-muted hover:text-fg',
    'hover:bg-tint aria-expanded:bg-tint aria-expanded:text-fg',
  );

export function DesktopNav({ activeHref, onNavigate }: DesktopNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Hover intent: closing waits briefly so a diagonal path to a far column doesn't dismiss the menu.
  const setOpen = (id: string | null, delay = 0) => {
    window.clearTimeout(closeTimer.current);
    if (id !== null || delay === 0) setOpenId(id);
    else closeTimer.current = window.setTimeout(() => setOpenId(null), delay);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEscapeKey(() => setOpen(null), openId !== null);

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openId]);

  const follow = (link: NavLink) => {
    setOpen(null);
    onNavigate(link);
  };

  return (
    <nav ref={navRef} aria-label="Main" className="hidden h-full items-center xl:flex">
      {/* Items span the full header height so each panel starts exactly where its item ends. */}
      <ul className="flex h-full items-stretch gap-0.5">
        {primaryNav.map((item) => {
          const active = activeHref === item.sectionHref;
          if (!item.groups) {
            const link = { label: item.label, href: item.sectionHref };
            return (
              <li key={item.id} className="flex items-center">
                <a href={link.href} className={linkClass(active)} aria-current={active ? 'location' : undefined} onClick={() => follow(link)}>
                  {link.label}
                  {active && <ActiveDot />}
                </a>
              </li>
            );
          }
          return (
            <DropdownItem
              key={item.id}
              item={item}
              active={active}
              isOpen={openId === item.id}
              onOpenChange={(open, delay) => setOpen(open ? item.id : null, delay)}
              onFollow={follow}
            />
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveDot() {
  return <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 mx-auto size-1 rounded-full bg-accent-600" />;
}

interface DropdownItemProps {
  item: NavItem;
  active: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean, delay?: number) => void;
  onFollow: (link: NavLink) => void;
}

const CLOSE_DELAY_MS = 150;

function DropdownItem({ item, active, isOpen, onOpenChange, onFollow }: DropdownItemProps) {
  const panelId = `nav-panel-${item.id}`;
  const isColumns = item.layout === 'columns';

  const closeWhenFocusLeaves = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false);
  };

  return (
    <li
      className={cn('flex items-center', !isColumns && 'relative')}
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false, CLOSE_DELAY_MS)}
      onBlur={closeWhenFocusLeaves}
    >
      <button
        type="button"
        className={linkClass(active)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onOpenChange(!isOpen)}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn('size-3.5 transition-transform duration-(--duration-fast)', isOpen && 'rotate-180')}
        />
        {active && <ActiveDot />}
      </button>

      {isOpen && (
        // Hangs from the header's bottom edge, which is also this item's bottom edge (no hover gap).
        <div
          id={panelId}
          className={cn(
            'absolute top-full pt-2',
            isColumns ? 'left-1/2 w-[min(56rem,calc(100vw-3rem))] -translate-x-1/2' : item.align === 'end' ? 'right-0 w-64' : 'left-0 w-72',
          )}
        >
          <div
            className={cn(
              'panel-in rounded-xl border border-hairline bg-surface p-2 text-fg shadow-lg',
              isColumns && 'grid grid-cols-3 gap-2 p-4',
            )}
          >
            <a
              href={item.sectionHref}
              onClick={() => onFollow({ label: item.label, href: item.sectionHref })}
              className={cn(
                'flex items-center justify-between rounded-sm px-3 py-2 text-small font-semibold text-fg hover:bg-tint',
                isColumns ? 'col-span-3 mb-1 border-b border-hairline pb-3' : 'mb-1',
              )}
            >
              {item.label} overview
              <ArrowRight aria-hidden="true" className="size-4 text-accent-700" />
            </a>
            {item.groups?.map(({ heading, links }, index) => (
              <div key={heading?.label ?? index}>
                {heading && (
                  <a
                    href={heading.href}
                    onClick={() => onFollow(heading)}
                    className="mb-1 block rounded-sm px-3 py-2 text-eyebrow uppercase text-accent-700 hover:bg-tint"
                  >
                    {heading.label}
                  </a>
                )}
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => onFollow(link)}
                    className="block rounded-sm px-3 py-2 text-small text-fg-muted transition-colors duration-(--duration-fast) hover:bg-tint hover:text-fg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}
