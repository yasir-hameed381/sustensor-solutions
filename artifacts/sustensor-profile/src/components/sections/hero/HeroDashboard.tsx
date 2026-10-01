import type { CSSProperties, ReactNode } from 'react';
import { CalendarClock, CheckCircle2, CircleDot, FileSignature, Leaf, Search, ShieldCheck, TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';

import { CountUp } from '../../ui/CountUp';

/*
 * An illustrative product view built in code: emissions trend, supplier scorecard, contract milestones.
 * All figures are placeholders that only show the kind of information the platform tracks.
 */

const emissions = [
  { quarter: 'Q1', value: 100 },
  { quarter: 'Q2', value: 91 },
  { quarter: 'Q3', value: 84 },
  { quarter: 'Q4', value: 76 },
  { quarter: 'Q1', value: 71 },
  { quarter: 'Q2', value: 64 },
];

/** Circumference of the r=18 ring. */
const RING = 2 * Math.PI * 18;

const suppliers = [
  { name: 'Supplier A', score: 92, status: 'Qualified' },
  { name: 'Supplier B', score: 81, status: 'Qualified' },
  { name: 'Supplier C', score: 58, status: 'Review' },
] as const;

const milestones = [
  { icon: FileSignature, label: 'Green SLA clause signed', meta: 'Complete', done: true },
  { icon: Leaf, label: 'Scope 3 supplier data received', meta: 'Complete', done: true },
  { icon: CalendarClock, label: 'Covenant audit', meta: 'Due in 12 days', done: false },
];

export function HeroDashboard({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Illustrative Sustensor operating view: an emissions intensity trend falling quarter on quarter, a supplier scorecard, and contract sustainability milestones."
      className={cn('relative select-none', className)}
    >
      {/* Glow behind the window. */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-2xl bg-accent-400/25 blur-3xl" />

      <div aria-hidden="true" className="relative overflow-hidden rounded-xl border border-hairline-strong bg-surface text-fg shadow-lg">
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-hairline bg-canvas px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
          </span>
          <span className="text-micro font-semibold text-fg-muted">Operating view</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-micro font-semibold text-brand-700">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-600" />
            </span>
            Live
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-micro text-fg-subtle sm:flex">
            <Search className="size-3" />
            Suppliers, contracts, reports
          </span>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-5 sm:p-4">
          {/* KPI tiles */}
          {/* Two KPIs on phones (so labels never truncate), three from sm. */}
          <div className="grid grid-cols-2 gap-3 sm:col-span-5 sm:grid-cols-3">
            <Kpi label="Local content" value={41} note="LCGPA target 40%" />
            <Kpi label="Spend under contract" value={87} note="+6 pts YoY" />
            <Kpi label="Audit-ready records" value={100} note="Scope 1–3 traced" className="hidden sm:block" />
          </div>

          {/* Emissions chart */}
          <Panel title="Emissions intensity" subtitle="tCO₂e per SAR m revenue, indexed" className="sm:col-span-3">
            <div className="mt-3 flex h-28 items-end gap-2 border-b border-hairline pb-px">
              {emissions.map((point, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className={cn('text-micro tabular-nums', index === emissions.length - 1 ? 'font-semibold text-fg' : 'text-transparent')}>
                    {point.value}
                  </span>
                  <span
                    className={cn('animate-grow-y w-full max-w-7 rounded-t-xs', index === emissions.length - 1 ? 'bg-brand-600' : 'bg-brand-300')}
                    style={{ height: `${point.value * 0.8}%`, '--i': index } as CSSProperties}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-2">
              {emissions.map((point, index) => (
                <span key={index} className="flex-1 text-center text-micro text-fg-subtle">
                  {point.quarter}
                </span>
              ))}
            </div>
          </Panel>

          {/* Supplier scorecard */}
          <Panel title="Supplier scorecard" subtitle="ESG · risk · delivery" className="sm:col-span-2">
            <ul className="mt-3 space-y-3">
              {suppliers.map((supplier, index) => (
                <li key={supplier.name}>
                  <div className="flex items-center justify-between text-micro">
                    <span className="font-medium text-fg">{supplier.name}</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        supplier.status === 'Qualified' ? 'text-brand-700' : 'text-sand-700',
                      )}
                    >
                      {supplier.status === 'Qualified' ? <ShieldCheck className="size-3" /> : <TriangleAlert className="size-3" />}
                      {supplier.status}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-tint">
                      <span
                        className="animate-grow-x block h-full rounded-full bg-accent-500"
                        style={{ width: `${supplier.score}%`, '--i': index } as CSSProperties}
                      />
                    </span>
                    <span className="w-6 text-right text-micro tabular-nums text-fg-muted">{supplier.score}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Contract milestones */}
          <Panel title="Contract sustainability milestones" className="hidden sm:col-span-5 sm:block">
            <ol className="mt-3 grid gap-2 sm:grid-cols-3">
              {milestones.map(({ icon: Icon, label, meta, done }) => (
                <li key={label} className="flex items-start gap-2.5 rounded-sm border border-hairline bg-canvas p-2.5">
                  <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-sm', done ? 'bg-brand-50 text-brand-700' : 'bg-surface text-sand-700 ring-1 ring-sand-300')}>
                    <Icon className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-micro font-semibold leading-snug text-fg">{label}</span>
                    <span className={cn('mt-0.5 inline-flex items-center gap-1 text-micro', done ? 'text-brand-700' : 'text-sand-700')}>
                      {done ? <CheckCircle2 className="size-3" /> : <CircleDot className="size-3" />}
                      {meta}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>

      {/* Floating satellite card: Scope 3 coverage ring (large screens only, so it never overflows). */}
      <div
        aria-hidden="true"
        className="animate-float absolute -right-6 -top-20 hidden items-center gap-3 rounded-lg border border-hairline bg-surface/95 px-3.5 py-3 shadow-lg backdrop-blur [animation-delay:-3s] xl:flex"
      >
        <svg viewBox="0 0 44 44" className="size-11 -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="5" className="stroke-brand-100" />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-ring stroke-brand-600"
            style={{ strokeDasharray: RING, strokeDashoffset: RING * (1 - 0.72), '--ring-length': RING } as CSSProperties}
          />
        </svg>
        <span>
          <span className="block text-h4 font-semibold tabular-nums leading-none text-fg">
            <CountUp value={72} suffix="%" />
          </span>
          <span className="mt-1 block text-micro text-fg-subtle">Scope 3 supplier coverage</span>
        </span>
      </div>

      {/* Floating approval chip */}
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-lg border border-hairline bg-surface px-3.5 py-2.5 shadow-lg sm:flex lg:-left-8"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 className="size-4" />
        </span>
        <span>
          <span className="block text-micro font-semibold text-fg">DoA approval routed</span>
          <span className="block text-micro text-fg-subtle">Policy check passed · 3 approvers</span>
        </span>
      </div>

      <figcaption className="sr-only">Illustrative interface. Figures are examples only.</figcaption>
    </figure>
  );
}

function Kpi({ label, value, note, className }: { label: string; value: number; note: string; className?: string }) {
  return (
    <div className={cn('rounded-md border border-hairline bg-surface p-2.5 sm:p-3', className)}>
      <p className="truncate text-micro text-fg-subtle">{label}</p>
      <p className="mt-1 text-h4 font-semibold tabular-nums tracking-tight text-fg">
        <CountUp value={value} suffix="%" />
      </p>
      <p className="mt-0.5 truncate text-micro text-brand-700">{note}</p>
    </div>
  );
}

function Panel({ title, subtitle, className, children }: { title: string; subtitle?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-md border border-hairline bg-surface p-3 sm:p-3.5', className)}>
      <p className="text-caption font-semibold text-fg">{title}</p>
      {subtitle && <p className="text-micro text-fg-subtle">{subtitle}</p>}
      {children}
    </div>
  );
}
