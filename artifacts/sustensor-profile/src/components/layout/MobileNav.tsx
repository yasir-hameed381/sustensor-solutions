import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown, X } from 'lucide-react';

import { primaryNav, type NavLink } from '@/content/navigation';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/utils';

import { BrandMark } from '../shared/BrandMark';

interface MobileNavProps {
  onClose: () => void;
  onFollow: (link: NavLink) => void;
}

/** Full-height drawer for screens below `xl`. Traps focus while open. */
export function MobileNav({ onClose, onFollow }: MobileNavProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(true);
  useEscapeKey(onClose);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const linkClass = 'flex min-h-11 items-center rounded-sm px-3 py-2.5 text-small text-fg-inverse-muted hover:bg-white/5 hover:text-fg-inverse';

  return (
    <div className="fixed inset-0 z-(--z-drawer) xl:hidden">
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onKeyDown={trapFocus}
        className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink-950 text-fg-inverse shadow-lg"
      >
        <div className="flex h-header items-center justify-between border-b border-hairline-inverse px-4 sm:px-6">
          <BrandMark />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-11 items-center justify-center rounded-full border border-hairline-inverse-strong text-fg-inverse hover:bg-white/5"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4 sm:px-4">
          <ul className="space-y-0.5">
            {primaryNav.map((item) => {
              if (!item.groups) {
                const link = { label: item.label, href: item.sectionHref };
                return (
                  <li key={item.id}>
                    <a href={link.href} onClick={() => onFollow(link)} className="block rounded-md px-3 py-3 text-h4 text-fg-inverse hover:bg-white/5">
                      {link.label}
                    </a>
                  </li>
                );
              }

              const isExpanded = expandedId === item.id;
              const groupId = `mobile-nav-${item.id}`;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={groupId}
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-h4 text-fg-inverse hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('size-5 text-fg-inverse-subtle transition-transform duration-(--duration-fast)', isExpanded && 'rotate-180')}
                    />
                  </button>
                  {isExpanded && (
                    <div id={groupId} className="panel-in mb-2 ml-3 border-l border-hairline-inverse pl-2">
                      <a
                        href={item.overviewHref ?? item.sectionHref}
                        onClick={() => onFollow({ label: item.label, href: item.overviewHref ?? item.sectionHref })}
                        className={cn(linkClass, 'font-semibold text-accent-300')}
                      >
                        {item.label} overview
                      </a>
                      {item.groups.map((group, index) => (
                        <div key={group.heading?.label ?? index}>
                          {group.heading && (
                            <p className="px-3 pb-1 pt-3 text-eyebrow uppercase text-fg-inverse-subtle">{group.heading.label}</p>
                          )}
                          {group.links.map((link) => (
                            <a key={link.label} href={link.href} onClick={() => onFollow(link)} className={linkClass}>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
