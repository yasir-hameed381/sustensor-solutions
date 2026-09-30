import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { primaryNav, type NavLink } from '@/content/navigation';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  onFollow: (link: NavLink) => void;
}

export function MobileNav({ onFollow }: MobileNavProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-teal/50 bg-forest px-5 py-3 lg:hidden"
    >
      <ul>
        {primaryNav.map((item) => {
          if (!item.groups) {
            const link = { label: item.label, href: item.sectionHref };
            return (
              <li key={item.id} className="border-b border-teal/30 last:border-b-0">
                <a href={link.href} className="block py-3 text-sm text-mist" onClick={() => onFollow(link)}>
                  {link.label}
                </a>
              </li>
            );
          }

          const isExpanded = expandedId === item.id;
          const panelId = `mobile-nav-${item.id}`;
          return (
            <li key={item.id} className="border-b border-teal/30">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left text-sm text-mist"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                {item.label}
                <ChevronDown aria-hidden="true" className={cn('h-4 w-4 text-sage transition-transform', isExpanded && 'rotate-180')} />
              </button>
              {isExpanded && (
                <div id={panelId} className="pb-3 pl-3">
                  {item.groups?.map((group, index) => (
                    <div key={group.heading?.label ?? index} className={cn(group.heading && 'pb-2')}>
                      {group.heading && <p className="mono pb-1 pt-3 text-[9px] text-sage">{group.heading.label}</p>}
                      {group.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block py-1.75 text-[13px] text-on-dark hover:text-mint"
                          onClick={() => onFollow(link)}
                        >
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
  );
}
