import { ArrowRight, Cpu, Leaf, Target, TrendingUp, Truck } from 'lucide-react';

import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Card } from '../ui/Card';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';

// The three silos named in the problem statement.
const silos = [
  { icon: Cpu, label: 'Technology' },
  { icon: Truck, label: 'Procurement & supply chain' },
  { icon: Leaf, label: 'ESG compliance' },
];

export function RealityCheckSection() {
  const { realityCheck } = copy;
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
      <div data-reveal className="mt-14 grid items-stretch gap-4 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="rounded-xl border border-dashed border-hairline-inverse-strong p-6 sm:p-8">
          <p className="text-eyebrow uppercase text-fg-inverse-subtle">Today: disconnected silos</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {silos.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-md border border-hairline-inverse bg-white/3 p-3 text-small text-fg-inverse-muted">
                <IconTile icon={icon} size="sm" />
                {label}
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
