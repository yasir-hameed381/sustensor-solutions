import { useEffect, useState } from 'react';
import { ArrowRight, CircleCheck, CircleDashed, Cpu, Leaf, Target, TrendingUp, Truck, TriangleAlert } from 'lucide-react';

import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import { Card } from '../ui/Card';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';

// The three silos named in the problem statement, each with the gap it causes and how one operating view closes it.
const silos = [
  { icon: Cpu, label: 'Technology', issue: 'Systems not synced', fix: 'ERP & systems synced' },
  { icon: Truck, label: 'Procurement & supply chain', issue: 'Budget mismatch', fix: 'Spend matched to budget' },
  { icon: Leaf, label: 'ESG compliance', issue: 'Supplier data missing', fix: 'Supplier ESG data traced' },
];

/*
 * Story loop, one step every STEP_MS while on screen:
 *   1-3  each silo flags its problem in turn
 *   4-6  the operating view resolves them in turn
 *   7-8  hold, then start again
 * Reduced motion: the finished state, without the loop.
 */
const STEP_MS = 850;
const STEPS = 9;
const FINAL = 6;

function useStory() {
  const [ref, inView] = useInView<HTMLDivElement>('-10% 0px');
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(prefersReducedMotion()), []);
  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % STEPS), STEP_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);
  return [ref, reduced ? FINAL : step] as const;
}

export function RealityCheckSection() {
  const { realityCheck } = copy;
  const [storyRef, step] = useStory();
  const flagged = (index: number) => step >= index + 1;
  const resolved = (index: number) => step >= index + 4;
  const notes = [
    { icon: Target, label: 'Who we serve', text: realityCheck.whoWeServe },
    { icon: TrendingUp, label: 'The bottom line', text: realityCheck.bottomLine },
  ];

  return (
    <Section
      id={SECTION_IDS.realityCheck}
      labelledBy="reality-heading"
      variant="ink"
      backdrop={
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-site -translate-x-1/2 bg-linear-to-r from-transparent via-accent-400/40 to-transparent" />
          <div className="absolute -right-40 top-1/3 size-128 rounded-full bg-accent-500/10 blur-3xl" />
        </div>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-5">
          <Eyebrow>The signal</Eyebrow>
          <Heading id="reality-heading" size="h1" className="mt-4">
            {realityCheck.heading}
          </Heading>
        </div>

        <div data-reveal className="lg:col-span-7 lg:pt-2">
          <p className="text-h3 text-fg-inverse">{realityCheck.lead}</p>
          <p className="mt-5 text-lead text-fg-inverse-muted">{realityCheck.problem}</p>
        </div>
      </div>

      {/* Silos → one operating view */}
      <div ref={storyRef} data-reveal className="mt-14 grid items-stretch gap-4 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="rounded-xl border border-dashed border-hairline-inverse-strong p-6 sm:p-8">
          <p className="text-eyebrow uppercase text-fg-inverse-subtle">Today: disconnected silos</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {silos.map(({ icon, label, issue }, index) => (
              <li
                key={label}
                className={cn(
                  'flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border bg-white/3 p-3 text-small text-fg-inverse-muted transition-colors duration-500',
                  flagged(index) && !resolved(index) ? 'border-sand-300/40' : 'border-hairline-inverse',
                )}
              >
                <IconTile icon={icon} size="sm" />
                <span className="min-w-0 flex-1 basis-40">{label}</span>
                {/* Problem chip: appears in turn, dims once the operating view has resolved it. */}
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-micro font-semibold transition-[opacity,transform,color,border-color] duration-500 ease-out-soft',
                    !flagged(index) && 'translate-y-1 opacity-0',
                    flagged(index) && !resolved(index) && 'border-sand-300/50 bg-sand-300/10 text-sand-300',
                    resolved(index) && 'border-hairline-inverse text-fg-inverse-subtle line-through opacity-70',
                  )}
                >
                  <TriangleAlert aria-hidden="true" className="size-3" />
                  {issue}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="relative flex items-center justify-center lg:w-28">
          {/* Desktop: the three silo rows converge into one flow. */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-y-0 -left-6 -right-6 hidden h-full w-[calc(100%+3rem)] lg:block"
          >
            {[34, 57, 80].map((y) => (
              <path
                key={y}
                d={`M0 ${y} C 45 ${y}, 45 50, 100 50`}
                fill="none"
                stroke="var(--color-accent-400)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                className="animate-dash"
              />
            ))}
          </svg>
          <span className="relative flex size-12 rotate-90 items-center justify-center rounded-full border border-accent-400/40 bg-ink-900 text-accent-300 shadow-glow lg:rotate-0">
            <span className="absolute inset-0 animate-ping rounded-full border border-accent-400/40 [animation-duration:2.4s]" />
            <ArrowRight className="size-5" />
          </span>
        </div>

        <div className="border-spin relative flex flex-col justify-center overflow-hidden rounded-xl p-6 shadow-glow sm:p-8">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-accent-500/20 blur-3xl" />
          <p className="relative text-eyebrow uppercase text-accent-300">With Sustensor: one operating view</p>
          <p className="relative mt-5 text-h4 text-fg-inverse">{realityCheck.answer}</p>
          {/* Resolution checklist: each line turns green in turn as the matching silo's problem is closed. */}
          <ul className="relative mt-6 grid gap-2 border-t border-hairline-inverse pt-5">
            {silos.map(({ fix }, index) => (
              <li
                key={fix}
                className={cn(
                  'flex items-center gap-2.5 text-small font-medium transition-colors duration-500',
                  resolved(index) ? 'text-fg-inverse' : 'text-fg-inverse-subtle',
                )}
              >
                {resolved(index) ? (
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-accent-300" />
                ) : (
                  <CircleDashed aria-hidden="true" className="size-4 shrink-0" />
                )}
                {fix}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-6 lg:gap-6">
        {notes.map(({ icon, label, text }) => (
          <Card key={label} padding="lg" className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <IconTile icon={icon} />
            <div>
              <h3 className="text-eyebrow uppercase text-accent-300">{label}</h3>
              <p className="mt-3 text-lead text-fg-inverse">{text}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
