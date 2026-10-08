import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';

import { prefersReducedMotion } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: ReactNode;
}

interface TabListProps {
  label: string;
  items: TabItem[];
  activeId: string | null;
  onChange: (id: string) => void;
  /** DOM id prefix; tabs get `${idPrefix}-tab-${id}`, panels are expected at `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  className?: string;
  renderTab: (item: TabItem, isActive: boolean) => ReactNode;
  tabClassName?: (isActive: boolean) => string;
}

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/** WAI-ARIA tablist with roving tabindex: arrow keys, Home and End move between tabs. */
export function TabList({ label, items, activeId, onChange, idPrefix, className, renderTab, tabClassName }: TabListProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );

  // In a horizontally scrolling tab row (phones), keep the selected tab in view, e.g. when it is chosen from
  // the header menu. Scrolls only the row itself, never the page.
  useEffect(() => {
    const tab = refs.current[focusedIndex];
    const row = tab?.parentElement;
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return;
    const left = tab.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + tab.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: Math.max(0, left - 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }, [focusedIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onChange(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={className}>
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, item.id)}
            aria-selected={isActive}
            aria-controls={panelId(idPrefix, item.id)}
            tabIndex={index === focusedIndex ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={tabClassName?.(isActive)}
          >
            {renderTab(item, isActive)}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  idPrefix,
  id,
  hidden,
  className,
  children,
}: {
  idPrefix: string;
  id: string;
  hidden: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={panelId(idPrefix, id)}
      aria-labelledby={tabId(idPrefix, id)}
      hidden={hidden}
      tabIndex={0}
      className={cn('focus-visible:outline-offset-8', className)}
    >
      {children}
    </div>
  );
}
