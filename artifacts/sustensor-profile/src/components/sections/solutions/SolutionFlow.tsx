import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, CornerDownRight } from 'lucide-react';

import type { ProcessOutput, ProcessStep } from '@/content/types';
import { cn } from '@/lib/utils';

interface SolutionFlowProps {
  steps: ProcessStep[];
  outputs?: ProcessOutput[];
}

/** "How it works": a connected timeline, vertical on small screens and horizontal from `lg`. */
export function SolutionFlow({ steps, outputs }: SolutionFlowProps) {
  // Longer flows (e.g. P2P's seven stages) use a tighter title size so every step fits on one row.
  const compact = steps.length > 4;
  const listRef = useRef<HTMLOListElement>(null);
  // The connector runs from the centre of the first number circle to the centre of the last one (not past it),
  // measured so it fits any number of steps, vertically on small screens and horizontally from lg.
  const [track, setTrack] = useState<{ style: CSSProperties; horizontal: boolean } | null>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const nodes = list.querySelectorAll<HTMLElement>('[data-flow-node]');
      if (nodes.length < 2) return setTrack(null);
      const box = list.getBoundingClientRect();
      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      };
      const first = centre(nodes[0]);
      const last = centre(nodes[nodes.length - 1]);
      const horizontal = Math.abs(last.y - first.y) < 2;
      setTrack({
        horizontal,
        style: horizontal
          ? { left: first.x, top: first.y, width: last.x - first.x, height: 1 }
          : { left: first.x, top: first.y, width: 1, height: last.y - first.y },
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [steps.length]);
  return (
    <div data-reveal className="rounded-xl border border-hairline bg-canvas p-5 sm:p-8">
      <ol
        ref={listRef}
        style={{ '--flow-cols': `repeat(${steps.length}, minmax(0, 1fr))` } as CSSProperties}
        className={cn('relative grid gap-8 lg:grid-cols-(--flow-cols)', compact ? 'lg:gap-4' : 'lg:gap-6')}
      >
        {/* Connector, first circle to last: it draws in, then a data pulse travels along it on a loop (compliverse). */}
        {track && (
          <span aria-hidden="true" className="absolute" style={track.style}>
            <span
              className={cn(
                'anim-on-reveal animate-draw-line absolute inset-0 from-accent-500 via-accent-400 to-accent-300',
                track.horizontal ? 'bg-linear-to-r' : 'bg-linear-to-b',
              )}
            />
            <span className="anim-on-reveal animate-packet size-2 rounded-full bg-accent-500 shadow-[0_0_0_4px] shadow-accent-500/20" />
          </span>
        )}
        {steps.map((step, index) => {
          const { icon: Icon, accent: Accent } = step;
          return (
            <li key={step.title} className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 lg:block">
              <span
                data-flow-node
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
                <h5 className={cn('mt-4 text-fg', compact ? 'text-body font-semibold' : 'text-h4')}>{step.title}</h5>
                {step.detail && <p className="mt-1.5 text-small text-fg-muted">{step.detail}</p>}
                {step.branches && (
                  <ul className="mt-3 space-y-1.5" aria-label={`${step.title}: sub-steps`}>
                    {step.branches.map((branch) => (
                      <li
                        key={branch}
                        className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2 py-1 text-caption font-medium text-fg-muted"
                      >
                        <CornerDownRight aria-hidden="true" className="size-3 shrink-0 text-accent-600" />
                        {branch}
                      </li>
                    ))}
                  </ul>
                )}
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
