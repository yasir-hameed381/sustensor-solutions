import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { ChevronDown } from 'lucide-react';

import { primaryNav, type NavItem, type NavLink } from '@/content/navigation';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/utils';

interface DesktopNavProps {
  onNavigate: (link: NavLink) => void;
}

export function DesktopNav({ onNavigate }: DesktopNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEscapeKey(() => setOpenId(null), openId !== null);

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openId]);

  const follow = (link: NavLink) => {
    setOpenId(null);
    onNavigate(link);
  };

  return (
    <nav ref={navRef} aria-label="Main navigation" className="hidden h-full items-center gap-7 lg:flex xl:gap-9">
      {primaryNav.map((item) => {
        if (!item.groups) {
          const link = { label: item.label, href: item.sectionHref };
          return (
            <a key={item.id} href={link.href} className="nav-link" onClick={() => follow(link)}>
              {link.label}
            </a>
          );
        }
        return (
          <DropdownItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onOpenChange={(open) => setOpenId(open ? item.id : null)}
            onFollow={follow}
          />
        );
      })}
    </nav>
  );
}

interface DropdownItemProps {
  item: NavItem;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFollow: (link: NavLink) => void;
}

function DropdownItem({ item, isOpen, onOpenChange, onFollow }: DropdownItemProps) {
  const panelId = `nav-panel-${item.id}`;
  const isColumns = item.layout === 'columns';

  const closeWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false);
  };

  return (
    <div
      className={cn('flex h-full items-center', !isColumns && 'relative')}
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={closeWhenFocusLeaves}
    >
      <button
        type="button"
        className="nav-link flex items-center gap-1"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onOpenChange(true)}
      >
        {item.label}
        <ChevronDown aria-hidden="true" className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className={cn(
            'nav-panel',
            isColumns && 'left-1/2 grid w-[min(900px,calc(100vw-48px))] -translate-x-1/2 grid-cols-3 gap-6 p-6',
            !isColumns && (item.align === 'end' ? 'right-0 w-65' : 'left-0 w-75'),
          )}
        >
          {item.groups?.map(({ heading, links }, index) => (
            <div key={heading?.label ?? index}>
              {heading && (
                <a
                  href={heading.href}
                  onClick={() => onFollow(heading)}
                  className="mono mb-2 block border-b border-line pb-2 text-[10px] font-bold text-emerald hover:text-forest"
                >
                  {heading.label}
                </a>
              )}
              {links.map((link) => (
                <a key={link.label} href={link.href} className="nav-panel-link" onClick={() => onFollow(link)}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
