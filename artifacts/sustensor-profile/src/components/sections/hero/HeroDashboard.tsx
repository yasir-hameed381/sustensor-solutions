import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { CheckCircle2, CircleCheck, TriangleAlert } from 'lucide-react';

import {
  auditOutlook,
  complianceChecks,
  coreLevers,
  firstPass,
  kpis,
  onboardingByCategory,
  onboardingSlaDays,
  performanceLevers,
  spendTaxonomy,
} from '@/content/dashboard';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import { CountUp } from '../../ui/CountUp';

/*
 * An illustrative product view built in code. The KPI row stays put while the panels below cross-fade through
 * four dashboards from the client's examples: onboarding, compliance, supplier performance, spend taxonomy.
 * Figures come from content/dashboard.ts and are sample data.
 *
 * Chart colours (checked with the dataviz palette validator on white): actual #1f8a5c vs rework #c27c0e pass all
 * checks; the benchmark grey #9aa8a6 is a labelled reference, never a series on its own.
 */

const ACTUAL = '#1f8a5c';
const REWORK = '#c27c0e';
const BENCHMARK = '#9aa8a6';

/** Milliseconds each view stays on screen. */
const VIEW_MS = 3200;

/** Circumference of the r=18 ring. */
const RING = 2 * Math.PI * 18;

/** Upper bound of the onboarding chart, in days. */
const CHART_MAX = 10;

/**
 * `tab` is the short label in the tab row; `label` is announced to screen readers.
 * `callout` is the floating card for that view: an event the platform raised, and the action it suggests
 * (idea from compliverse.ai). Gaps are amber, completed items green; both carry an icon and text, not colour alone.
 */
const views = [
  {
    id: 'onboarding',
    tab: 'Onboarding',
    label: 'Onboarding',
    callout: { kind: 'gap', title: 'Gap · Insurance below SAR 7.5M', action: 'Request updated certificate' },
  },
  {
    id: 'compliance',
    tab: 'Compliance',
    label: 'Compliance',
    callout: { kind: 'done', title: 'DoA approval routed', action: 'Policy check passed · 3 approvers' },
  },
  {
    id: 'performance',
    tab: 'Performance',
    label: 'Supplier performance',
    callout: { kind: 'gap', title: 'Gap · Doc readiness 45%', action: 'Send renewal reminders' },
  },
  {
    id: 'spend',
    tab: 'Spend',
    label: 'Spend taxonomy',
    callout: { kind: 'done', title: '5 verticals classified', action: 'Spend taxonomy up to date' },
  },
] as const;

/** "97.5%" → { amount: 97.5, suffix: "%" }; "6" → { amount: 6, suffix: "" }. */
const splitValue = (value: string) => ({ amount: parseFloat(value), suffix: value.replace(/[\d.]/g, '') });

export function HeroDashboard({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ref, inView] = useInView<HTMLElement>();
  useEffect(() => setReduced(prefersReducedMotion()), []);

  // The active tab's progress line drives the rotation: when it finishes filling, the next view opens.
  // Pausing the line (hover, keyboard focus, off screen) therefore pauses the rotation at the same point.
  const running = inView && !paused && !reduced;
  const next = () => setActive((index) => (index + 1) % views.length);

  return (
    <figure
      ref={ref}
      aria-label="Illustrative Sustensor vendor operating view"
      className={cn('relative select-none', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Glow behind the window. */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-2xl bg-accent-400/25 blur-3xl" />

      <div className="relative overflow-hidden rounded-xl border border-hairline-strong bg-surface text-fg shadow-lg">
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-hairline bg-canvas px-4 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
          </span>
          <span className="truncate text-micro font-semibold text-fg-muted">Vendor operating view</span>
          <span aria-hidden="true" className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-micro font-semibold text-brand-700">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-600" />
            </span>
            Live
          </span>
        </div>

        {/* View tabs: the active tab's line fills over VIEW_MS, then the next view opens. */}
        <div className="grid grid-cols-4 gap-2 border-b border-hairline px-3 pt-2.5 sm:gap-3 sm:px-4" role="group" aria-label="Dashboard views">
          {views.map((view, index) => {
            const isActive = index === active;
            return (
              <button
                key={view.id}
                type="button"
                aria-label={`Show ${view.label} view`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className={cn(
                  'min-w-0 pb-2.5 text-left text-micro font-semibold transition-colors duration-(--duration-fast)',
                  isActive ? 'text-accent-700' : 'text-fg-subtle hover:text-fg',
                )}
              >
                <span className="block truncate">{view.tab}</span>
                <span aria-hidden="true" className="mt-2 block h-0.5 overflow-hidden rounded-full bg-hairline">
                  {isActive && (
                    <span
                      // Remount on each activation so the fill restarts from empty.
                      key={`${view.id}-${active}`}
                      onAnimationEnd={next}
                      className={cn('block h-full origin-left rounded-full bg-accent-600', !reduced && 'animate-tab-progress')}
                      style={{ animationDuration: `${VIEW_MS}ms`, animationPlayState: running ? 'running' : 'paused' } as CSSProperties}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          {views[active].label} view
        </p>

        <div aria-hidden="true" className="grid gap-3 p-3 sm:p-4">
          {/* KPI tiles: two per row on phones, four from sm. */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((kpi) => {
              const { amount, suffix } = splitValue(kpi.value);
              return (
                <div key={kpi.label} className="min-w-0 rounded-md border border-hairline bg-surface p-2.5">
                  <p className="truncate text-micro text-fg-subtle">{kpi.label}</p>
                  <p className="mt-1 flex items-baseline gap-1 text-h4 font-semibold tabular-nums tracking-tight text-fg">
                    <CountUp value={amount} suffix={suffix} />
                    {kpi.unit && <span className="text-micro font-medium text-fg-muted">{kpi.unit}</span>}
                  </p>
                  <p className="mt-0.5 truncate text-micro text-brand-700">{kpi.badge}</p>
                </div>
              );
            })}
          </div>

          {/*
            Views share one grid cell, so the stage is as tall as the tallest view and nothing jumps.
            Fade out, then fade in: the leaving view fades straight away; the next one waits for it (delay = duration).
          */}
          <div className="grid">
            {views.map((view, index) => (
              <div
                key={view.id}
                className={cn(
                  'col-start-1 row-start-1 grid gap-3 transition-opacity duration-350 ease-out-soft motion-reduce:transition-none sm:grid-cols-5',
                  index === active ? 'opacity-100 delay-350' : 'pointer-events-none opacity-0 delay-0',
                )}
              >
                {/* Remounts when the view becomes active, so its bars grow and meters fill again (compliverse cv-grow). */}
                <Fragment key={index === active ? 'on' : 'off'}>
                  {view.id === 'onboarding' && <OnboardingView />}
                  {view.id === 'compliance' && <ComplianceView />}
                  {view.id === 'performance' && <PerformanceView />}
                  {view.id === 'spend' && <SpendView />}
                </Fragment>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating satellite card: ESG index ring (large screens only, so it never overflows). */}
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
            style={{ strokeDasharray: RING, strokeDashoffset: RING * (1 - 0.85), '--ring-length': RING } as CSSProperties}
          />
        </svg>
        <span>
          <span className="block text-h4 font-semibold tabular-nums leading-none text-fg">
            <CountUp value={85} />
            <span className="text-micro font-medium text-fg-muted">/100</span>
          </span>
          <span className="mt-1 block text-micro text-fg-subtle">Supplier ESG index</span>
        </span>
      </div>

      {/* Phones: the callout sits under the window instead of floating over it. */}
      <div aria-hidden="true" className="mt-3 sm:hidden">
        <div
          key={views[active].id}
          className="callout-in flex items-center gap-2.5 rounded-lg border border-hairline bg-surface px-3.5 py-2.5 shadow-sm"
        >
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-full text-white',
              views[active].callout.kind === 'gap' ? 'bg-sand-500' : 'bg-brand-600',
            )}
          >
            {views[active].callout.kind === 'gap' ? <TriangleAlert className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
          </span>
          <span className="min-w-0">
            <span className="block text-micro font-semibold text-fg">{views[active].callout.title}</span>
            <span className={cn('block text-micro', views[active].callout.kind === 'gap' ? 'font-semibold text-sand-700' : 'text-fg-subtle')}>
              {views[active].callout.kind === 'gap' && '→ '}
              {views[active].callout.action}
            </span>
          </span>
        </div>
      </div>

      {/* Floating callout: changes with the view (remounts, so it fades in each time). */}
      <div aria-hidden="true" className="animate-float absolute -bottom-5 -left-3 hidden sm:block lg:-left-8">
        <div
          key={views[active].id}
          className="callout-in flex items-center gap-2.5 rounded-lg border border-hairline bg-surface px-3.5 py-2.5 shadow-lg"
        >
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full text-white',
              views[active].callout.kind === 'gap' ? 'bg-sand-500' : 'bg-brand-600',
            )}
          >
            {views[active].callout.kind === 'gap' ? <TriangleAlert className="size-4" /> : <CheckCircle2 className="size-4" />}
          </span>
          <span>
            <span className="block text-micro font-semibold text-fg">{views[active].callout.title}</span>
            <span className={cn('block text-micro', views[active].callout.kind === 'gap' ? 'font-semibold text-sand-700' : 'text-fg-subtle')}>
              {views[active].callout.kind === 'gap' && '→ '}
              {views[active].callout.action}
            </span>
          </span>
        </div>
      </div>

      <figcaption className="sr-only">
        Illustrative interface with sample data, cycling through onboarding, compliance, supplier performance and spend
        dashboards: {kpis.map((kpi) => `${kpi.label} ${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ''}`).join(', ')}; average
        onboarding cycle against a {onboardingSlaDays}-day SLA.
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- Views */

function OnboardingView() {
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const approved = (circumference * firstPass.approved) / 100;
  const gap = 2;
  return (
    <>
      <Panel title="Onboarding cycle time" subtitle={`Avg. days by category · SLA ${onboardingSlaDays}d`} className="sm:col-span-3">
        <div className="relative mt-3 h-28 border-b border-hairline pb-px">
          <div className="flex h-full items-end gap-2">
            {onboardingByCategory.map((row, i) => (
              <div key={row.category} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-micro font-semibold tabular-nums text-fg">{row.days}</span>
                <span className="animate-grow-y w-full max-w-7 rounded-t-xs" style={{ height: `${(row.days / CHART_MAX) * 85}%`, background: ACTUAL, '--i': i } as CSSProperties} />
              </div>
            ))}
          </div>
          <span className="absolute inset-x-0 border-t-2 border-dashed" style={{ bottom: `${(onboardingSlaDays / CHART_MAX) * 85}%`, borderColor: BENCHMARK }} />
        </div>
        <div className="mt-1.5 flex gap-2">
          {onboardingByCategory.map((row) => (
            <span key={row.category} className="min-w-0 flex-1 truncate text-center text-[0.625rem] text-fg-subtle">
              {row.short}
            </span>
          ))}
        </div>
      </Panel>
      <Panel title="First-pass rate" subtitle="Approved without rework" className="sm:col-span-2">
        <div className="mt-3 flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="size-20 shrink-0 -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" strokeWidth="10" stroke={ACTUAL} strokeDasharray={`${approved - gap} ${circumference}`} />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              strokeWidth="10"
              stroke={REWORK}
              strokeDasharray={`${circumference - approved - gap} ${circumference}`}
              strokeDashoffset={-approved}
            />
          </svg>
          <ul className="space-y-1.5 text-micro text-fg-muted">
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-xs" style={{ background: ACTUAL }} />
              {firstPass.zeroRework} zero-rework
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-xs" style={{ background: REWORK }} />
              {firstPass.revisions} revisions
            </li>
          </ul>
        </div>
        <p className="mt-3 text-micro leading-snug text-fg-subtle">{firstPass.rootCauses}</p>
      </Panel>
    </>
  );
}

function ComplianceView() {
  return (
    <>
      <Panel title="Compliance readiness" subtitle="Verified vendor records" className="sm:col-span-3">
        <ul className="mt-3 space-y-3">
          {complianceChecks.map((check, i) => (
            <li key={check.label} style={{ '--i': i } as CSSProperties}>
              <Meter label={check.label} value={`${check.percent}%`} percent={check.percent} />
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Audit risk outlook" subtitle="Disbursement readiness" className="flex flex-col sm:col-span-2">
        <p className="mt-3 text-h2 font-semibold tabular-nums text-accent-700">{auditOutlook.score}%</p>
        <p className="text-micro text-fg-muted">
          {auditOutlook.cleared} of {auditOutlook.total} vendors cleared for payment
        </p>
        <p className="mt-auto flex items-start gap-1.5 rounded-sm border border-accent-100 bg-accent-50 p-2 text-micro text-accent-800">
          <CircleCheck className="mt-px size-3 shrink-0" />
          {auditOutlook.note}
        </p>
      </Panel>
    </>
  );
}

function PerformanceView() {
  const cx = 110;
  const cy = 74;
  const R = 52;
  const n = performanceLevers.length;
  const point = (i: number, v: number) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + (Math.cos(a) * R * v) / 100, cy + (Math.sin(a) * R * v) / 100] as const;
  };
  const polygon = (key: 'actual' | 'benchmark') => performanceLevers.map((d, i) => point(i, d[key]).join(',')).join(' ');
  return (
    <>
      <Panel title="Supplier performance levers" subtitle="Actual vs. benchmark" className="sm:col-span-3">
        <svg viewBox="0 0 220 148" className="mx-auto mt-1 w-full max-sm:max-h-36">
          {[1 / 3, 2 / 3, 1].map((ring) => (
            <polygon key={ring} points={performanceLevers.map((_, i) => point(i, ring * 100).join(',')).join(' ')} fill="none" stroke="var(--color-hairline)" />
          ))}
          {performanceLevers.map((d, i) => {
            const [lx, ly] = point(i, 122);
            const anchor = Math.abs(lx - cx) < 4 ? 'middle' : lx > cx ? 'start' : 'end';
            return (
              <text key={d.axis} x={lx} y={ly + 3} textAnchor={anchor} fill="var(--color-fg-subtle)" fontSize="8">
                {d.axis}
              </text>
            );
          })}
          <polygon points={polygon('benchmark')} fill={BENCHMARK} fillOpacity="0.18" stroke={BENCHMARK} strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points={polygon('actual')} fill={ACTUAL} fillOpacity="0.28" stroke={ACTUAL} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <div className="mt-1 flex justify-center gap-4 text-micro text-fg-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-xs" style={{ background: ACTUAL }} />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-xs" style={{ background: BENCHMARK }} />
            Benchmark
          </span>
        </div>
      </Panel>
      <Panel title="Core levers" subtitle="All active contracts" className="sm:col-span-2">
        <ul className="mt-3 space-y-3">
          {coreLevers.map((lever, i) => (
            <li key={lever.label} style={{ '--i': i } as CSSProperties}>
              <Meter label={lever.label} value={lever.value} percent={lever.percent} />
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

function SpendView() {
  const total = spendTaxonomy.reduce((sum, row) => sum + row.vendors, 0);
  return (
    <Panel title="Vendor spend taxonomy" subtitle={`${spendTaxonomy.length} active verticals · ${total} vendors`} className="flex flex-col sm:col-span-5">
      {/* Rows spread to fill the panel, since this view is shorter than the others sharing the stage. */}
      <ul className="mt-3 flex flex-1 flex-col justify-around gap-2.5">
        {spendTaxonomy.map((row, i) => {
          const share = Math.round((row.vendors / total) * 100);
          return (
            <li key={row.category} style={{ '--i': i } as CSSProperties}>
              <Meter label={row.category} value={`${row.vendors} (${share}%)`} percent={share} />
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ---------------------------------------------------------------- Pieces */

function Panel({ title, subtitle, className, children }: { title: string; subtitle?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-md border border-hairline bg-surface p-3 sm:p-3.5', className)}>
      <p className="text-caption font-semibold text-fg">{title}</p>
      {subtitle && <p className="text-micro text-fg-subtle">{subtitle}</p>}
      {children}
    </div>
  );
}

function Meter({ label, value, percent }: { label: string; value: string; percent?: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-micro">
        <span className="truncate font-medium text-fg">{label}</span>
        <span className="shrink-0 tabular-nums text-fg-muted">{value}</span>
      </div>
      {percent !== undefined && (
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-tint">
          <span className="animate-grow-x block h-full rounded-full" style={{ width: `${percent}%`, background: ACTUAL }} />
        </span>
      )}
    </div>
  );
}
