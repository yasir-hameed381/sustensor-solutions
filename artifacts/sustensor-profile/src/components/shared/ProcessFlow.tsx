import { ArrowDown, ArrowRight } from 'lucide-react';

import type { ProcessOutput, ProcessStep } from '@/content/types';

interface ProcessFlowProps {
  number: string;
  title: string;
  steps: ProcessStep[];
  outputs?: ProcessOutput[];
}

/** Illustrated step-by-step diagram: a title bar, numbered step cards with icon illustrations, and optional outputs. */
export function ProcessFlow({ number, title, steps, outputs }: ProcessFlowProps) {
  return (
    <figure className="relative mt-8 overflow-hidden rounded-2xl border border-line-green bg-linear-to-b from-mist-3 via-cream to-mist-3 p-4 sm:p-6">
      <CircuitPattern className="left-0" />
      <CircuitPattern className="right-0 -scale-x-100" />

      <figcaption className="relative flex items-center gap-3 rounded-xl bg-linear-to-r from-forest via-forest-2 to-emerald px-3 py-2.5 shadow-[0_12px_30px_-18px_rgba(15,36,40,0.9)] sm:px-4">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-abyss ring-2 ring-gold/70">
          <span aria-hidden="true" className="absolute inset-1 rounded-full border border-dashed border-gold/50" />
          <span className="mono text-xs font-bold tracking-normal text-gold">{number}</span>
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.08em] text-ivory sm:text-base">{title}</span>
        <span className="mono ml-auto hidden text-[9px] text-mint sm:block">How it works · {steps.length} steps</span>
      </figcaption>

      <ol className="relative mt-9 grid gap-x-5 gap-y-7 sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <StepCard step={step} index={index} />
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-[18px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line-green bg-paper text-emerald shadow-sm lg:flex"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </li>
        ))}
      </ol>

      {outputs && outputs.length > 0 && (
        <div className="relative mt-8 border-t border-dashed border-line-green pt-5">
          <p className="mono flex items-center gap-2 text-[9px] font-bold text-emerald">
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
            Key outputs
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outputs.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-line-green bg-paper p-3 shadow-[0_8px_24px_-18px_rgba(23,52,58,0.5)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-mist to-mist-2 text-emerald">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold leading-snug text-forest">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const { icon: Icon, accent: Accent } = step;
  return (
    // Phones: illustration on the left, text on the right. Wider screens: stacked and centred.
    <div className="grid h-full grid-cols-[auto_1fr] items-center gap-x-4 rounded-xl border border-line-green bg-linear-to-b from-paper to-mist-3 px-4 pb-4 pt-6 text-left shadow-[0_14px_34px_-22px_rgba(23,52,58,0.6)] sm:flex sm:flex-col sm:pb-5 sm:pt-8 sm:text-center">
      <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-mint ring-4 ring-cream sm:left-1/2 sm:-translate-x-1/2">
        {index + 1}
      </span>

      <div aria-hidden="true" className="relative row-span-2 h-20 w-20 sm:order-2 sm:mt-4 sm:h-28 sm:w-28">
        <span className="absolute inset-0 rounded-full border border-line-green bg-radial from-paper to-mist-2" />
        <span className="absolute inset-2 rounded-full border border-dashed border-emerald/35 sm:inset-2.5" />
        <span className="absolute -left-1 top-4 h-2 w-2 rounded-full bg-gold/80 sm:top-5" />
        <span className="absolute right-1.5 top-0.5 h-1.5 w-1.5 rounded-full bg-emerald/60 sm:right-2 sm:top-1" />
        <span className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-9 w-9 text-forest sm:h-12 sm:w-12" strokeWidth={1.4} />
        </span>
        <span className="absolute -bottom-1 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-emerald to-emerald-deep text-white shadow-md ring-[3px] ring-paper sm:-bottom-0.5 sm:-right-1 sm:h-10 sm:w-10 sm:ring-4">
          <Accent className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
      </div>

      <h5 className="self-end text-[13px] font-bold uppercase leading-tight tracking-[0.04em] text-forest sm:order-1 sm:flex sm:min-h-[2.6rem] sm:items-center sm:self-auto">
        {step.title}
      </h5>

      {step.detail && (
        <p className="mt-1 self-start text-xs leading-relaxed text-copy sm:order-3 sm:mt-4 sm:self-auto">{step.detail}</p>
      )}
    </div>
  );
}

/** Faint circuit-board lines along the diagram edges, echoing the reference infographics. */
function CircuitPattern({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 400"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute top-0 hidden h-full w-20 text-emerald/25 md:block ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 60 H30 L45 75 H70" />
      <path d="M0 130 H20 L35 115 H55" />
      <path d="M0 210 H40 L55 225 H75" />
      <path d="M0 290 H25 L40 275 H60" />
      <path d="M0 350 H35 L50 365 H68" />
      {[
        [70, 75],
        [55, 115],
        [75, 225],
        [60, 275],
        [68, 365],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="currentColor" />
      ))}
    </svg>
  );
}
