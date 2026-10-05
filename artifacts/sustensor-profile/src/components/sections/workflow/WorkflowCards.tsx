import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUp, BadgeCheck, Building2, CornerDownRight, Landmark, Receipt, Users, Wallet, type LucideIcon } from 'lucide-react';

import { solutions } from '@/content/solutions';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

/*
 * Two pastel cards modelled on Zip's "Intake that feels human" / "Automated orchestration" pair.
 * Labels come from content/solutions.ts (vendor onboarding, P2P and APP copy).
 */

const byId = (id: string) => solutions.find((solution) => solution.id === id)!;
const vendor = byId('vendor-management');
const p2p = byId('procure-to-pay');
const onboarding = vendor.deliverables.find((row) => row.area === 'Vendor Onboarding')!;
const doa = p2p.deliverables.find((row) => row.area.startsWith('Delegation of Authority'))!;

function ShowcaseCard({ title, text, tone, children }: { title: string; text: string; tone: 'mint' | 'teal'; children: ReactNode }) {
  return (
    <article className="group">
      <div
        className={cn(
          'relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-hairline p-6 shadow-sm transition-shadow duration-(--duration-base) group-hover:shadow-lg sm:aspect-16/11',
          tone === 'teal' ? 'bg-linear-to-b from-brand-100 via-brand-50 to-brand-300/60' : 'bg-linear-to-b from-accent-50 via-surface to-accent-100',
        )}
      >
        {/* Soft blurred light, like the reference's pastel cards. */}
        <div aria-hidden="true" className="absolute -bottom-24 left-1/2 -z-10 h-64 w-3/4 -translate-x-1/2 rounded-full bg-surface/70 blur-3xl" />
        {children}
      </div>
      <h3 className="mt-5 text-h4 text-fg">{title}</h3>
      <p className="mt-1.5 max-w-lg text-body text-fg-muted">{text}</p>
    </article>
  );
}

/* ---------- Card 1: intake that types a request and routes it to a workflow ---------- */

// Plain-language requests, one per solution, in the same order as the solutions list.
const REQUESTS: Record<string, string> = {
  'vendor-management': 'I need to onboard and qualify a new supplier',
  'contract-sustainability': 'Add green SLA clauses to our logistics contract',
  'procure-to-pay': 'Raise a requisition and route it for DoA approval',
  'annual-procurement-planning': 'Build next year’s procurement plan from our spend',
};
const intakeItems = solutions.filter((solution) => REQUESTS[solution.id]).map((solution) => ({ text: REQUESTS[solution.id], route: solution.menuLabel }));

type IntakePhase = 'typing' | 'sent' | 'routed';

export function IntakeCard() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<IntakePhase>('typing');
  const item = intakeItems[index];

  useEffect(() => {
    if (prefersReducedMotion()) {
      setChars(item.text.length);
      setPhase('routed');
      return;
    }
    if (!inView) return;
    let timer: number;
    if (phase === 'typing') {
      timer = chars < item.text.length ? window.setTimeout(() => setChars(chars + 1), 38) : window.setTimeout(() => setPhase('sent'), 500);
    } else if (phase === 'sent') {
      timer = window.setTimeout(() => setPhase('routed'), 700);
    } else {
      timer = window.setTimeout(() => {
        setIndex((value) => (value + 1) % intakeItems.length);
        setChars(0);
        setPhase('typing');
      }, 2600);
    }
    return () => window.clearTimeout(timer);
  }, [inView, phase, chars, item.text.length]);

  return (
    <ShowcaseCard title="Intake that routes itself" text={onboarding.scope} tone="teal">
      <div ref={ref} aria-hidden="true" className="w-full max-w-sm">
        <p className="text-center text-small font-semibold text-fg">Hi, what do you need help with?</p>
        <div className="mt-4 rounded-xl bg-surface p-4 shadow-md">
          <p className="min-h-16 text-small text-fg-muted">
            {item.text.slice(0, chars)}
            {phase === 'typing' && <span className="caret ml-px inline-block h-4 w-px translate-y-0.5 bg-fg" />}
          </p>
          <div className="mt-3 flex justify-end">
            <span
              className={cn(
                'flex size-7 items-center justify-center rounded-md bg-ink-900 text-white transition-transform duration-300',
                phase === 'sent' && 'scale-90',
              )}
            >
              <ArrowUp className="size-3.5" />
            </span>
          </div>
        </div>
        <div
          className={cn(
            'mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-caption shadow-sm transition-[opacity,transform] duration-500 ease-out-soft',
            phase === 'routed' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          <CornerDownRight className="size-3.5 text-accent-600" />
          <span className="text-fg-subtle">Routed to</span>
          <span className="font-semibold text-fg">{item.route}</span>
        </div>
      </div>
    </ShowcaseCard>
  );
}

/* ---------- Card 2: DoA approval chain on dotted rings ---------- */

const approvers: { label: string; icon: LucideIcon }[] = [
  { label: 'Finance', icon: Wallet },
  { label: 'Procurement', icon: Building2 },
  { label: 'Leadership', icon: Landmark },
];

/** Cycles 0..count (the extra value is a "complete" pause) while in view; static when reduced. */
function useSequence(count: number, inView: boolean, interval = 900) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(count);
      return;
    }
    if (!inView) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % (count + 2)), interval);
    return () => window.clearInterval(timer);
  }, [count, inView, interval]);
  return step;
}

/** Small solid ▼ connector between chain steps. */
function Triangle({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 10 8" className="h-2 w-2.5">
      <path d="M0 0 H10 L5 8 Z" className={cn('transition-colors duration-500', on ? 'fill-accent-600' : 'fill-hairline-strong')} />
    </svg>
  );
}

// Chain labels: the request, its budget check, the approvers, then the award (contract or PO).
const BUDGET_LABEL = 'Budget checks';
const AWARD_LABEL = 'Contract/PO';

export function ApprovalChainCard() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(4, inView);

  const pill = (active: boolean, reached: boolean) =>
    cn(
      'inline-flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2 text-small font-semibold text-fg transition-[box-shadow,opacity] duration-500 ease-out-soft',
      active ? 'node-glow' : 'shadow-sm',
      !reached && 'opacity-70',
      // `reached` is always true for the first node; later nodes dim until the flow gets there.
    );
  return (
    <ShowcaseCard title="Automated orchestration, DoA built in" text={doa.scope} tone="mint">
      <div ref={ref} aria-hidden="true" className="relative flex flex-col items-center gap-2.5">
        {/* Dotted concentric rings */}
        <span className="animate-orbit pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-accent-500/50" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 size-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-accent-500/30" />

        <span className={pill(step === 0, step >= 0)}>
          <span className="flex size-6 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Users className="size-3.5" />
          </span>
          Requisition
        </span>
        <Triangle on={step > 0} />
        <span className={pill(step === 1, step >= 1)}>
          <span className="flex size-6 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Receipt className="size-3.5" />
          </span>
          {BUDGET_LABEL}
        </span>
        <Triangle on={step > 1} />
        <div className="flex flex-wrap justify-center gap-2">
          {approvers.map(({ label, icon: Icon }) => (
            <span key={label} className={pill(step === 2, step >= 2)}>
              <span className="flex size-6 items-center justify-center rounded-full bg-ink-900 text-accent-300">
                <Icon className="size-3.5" />
              </span>
              {label}
            </span>
          ))}
        </div>
        <Triangle on={step > 2} />
        <span className={pill(step === 3, step >= 3)}>
          <span className="flex size-6 items-center justify-center rounded-full bg-ink-900 text-accent-300">
            <BadgeCheck className="size-3.5" />
          </span>
          {AWARD_LABEL}
        </span>
      </div>
    </ShowcaseCard>
  );
}
