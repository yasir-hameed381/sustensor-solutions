import type { CSSProperties } from 'react';
import { ArrowDown } from 'lucide-react';

import type { ProcessOutput, ProcessStep } from '@/content/types';

interface SolutionFlowProps {
  steps: ProcessStep[];
  outputs?: ProcessOutput[];
}

/** "How it works": a connected timeline, vertical on small screens and horizontal from `lg`. */
export function SolutionFlow({ steps, outputs }: SolutionFlowProps) {
  return (
    <div data-reveal className="rounded-xl border border-hairline bg-canvas p-5 sm:p-8">
      <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {/* Connector line: vertical through the nodes on mobile, horizontal from lg. */}
        <span
          aria-hidden="true"
          className="anim-on-reveal animate-draw-line absolute bottom-6 left-5 top-6 w-px bg-linear-to-b from-accent-500 via-accent-400 to-hairline-strong lg:bottom-auto lg:left-6 lg:right-6 lg:top-5 lg:h-px lg:w-auto lg:bg-linear-to-r"
        />
        {steps.map((step, index) => {
          const { icon: Icon, accent: Accent } = step;
          return (
            <li key={step.title} className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 lg:block">
              <span
                style={{ '--i': index } as CSSProperties}
                className="anim-on-reveal animate-pop-in relative z-(--z-raised) flex size-10 items-center justify-center rounded-full border-2 border-accent-500 bg-surface text-small font-semibold tabular-nums text-fg shadow-xs">
                {index + 1}
              </span>
              <div className="lg:mt-5">
                <div className="relative inline-flex">
                  <span className="flex size-12 items-center justify-center rounded-lg border border-hairline bg-linear-to-br from-surface to-accent-50 text-accent-700 shadow-xs transition-transform duration-(--duration-base) ease-out-soft group-hover:-translate-y-0.5 group-hover:-rotate-6">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-ink-900 text-accent-300 ring-2 ring-canvas">
                    <Accent aria-hidden="true" className="size-3.5" strokeWidth={2} />
                  </span>
                </div>
                <h5 className="mt-4 text-h4 text-fg">{step.title}</h5>
                {step.detail && <p className="mt-1.5 text-small text-fg-muted">{step.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {outputs && outputs.length > 0 && (
        <div className="mt-8 border-t border-dashed border-hairline-strong pt-6">
          <p className="flex items-center gap-2 text-eyebrow uppercase text-accent-700">
            <ArrowDown aria-hidden="true" className="size-3.5" />
            Key outputs
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outputs.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3 rounded-md border border-hairline bg-surface p-3 shadow-xs">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-accent-50 text-accent-700">
                  <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
                </span>
                <span className="text-small font-semibold text-fg">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
