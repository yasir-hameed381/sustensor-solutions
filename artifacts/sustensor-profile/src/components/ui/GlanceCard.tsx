import type { LucideIcon } from 'lucide-react';

import { CountUp } from './CountUp';
import { IconTile } from './IconTile';

interface GlanceItem {
  value: number;
  label: string;
  icon: LucideIcon;
  tone?: 'accent' | 'brand';
}

/** Small "at a glance" metric card for section headers. Values must be counted from the site content. */
export function GlanceCard({ title, items }: { title: string; items: GlanceItem[] }) {
  return (
    <div className="spotlight group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-5 shadow-sm sm:p-6">
      <div aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-100/60 blur-2xl" />
      <p className="relative text-eyebrow uppercase text-fg-subtle">{title}</p>
      <dl className="relative mt-4 grid grid-cols-3 gap-3">
        {items.map(({ value, label, icon, tone }) => (
          // dt precedes dd in the markup; flex order shows the figure above its label.
          <div key={label} className="flex flex-col rounded-lg border border-hairline bg-canvas p-3">
            <IconTile icon={icon} size="sm" tone={tone} />
            <dt className="order-3 text-caption text-fg-muted">{label}</dt>
            <dd className="order-2 mt-3 text-h3 tabular-nums text-fg">
              <CountUp value={value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
