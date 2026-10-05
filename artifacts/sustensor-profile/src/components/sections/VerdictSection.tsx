import { Check } from 'lucide-react';

import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Container } from '../ui/Container';
import { ToneContext } from '../ui/tone';

export function VerdictSection() {
  const { verdict } = copy;

  return (
    <ToneContext.Provider value="inverse">
      <section id={SECTION_IDS.verdict} aria-labelledby="verdict-heading" className="bg-canvas py-section">
        <Container>
          <div
            data-reveal
            className="relative isolate overflow-hidden rounded-2xl bg-ink-900 px-6 py-14 text-fg-inverse shadow-lg sm:px-12 sm:py-16 lg:px-16 lg:py-20"
          >
            <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-50 mask-fade-l" />
            <div aria-hidden="true" className="absolute -right-24 -top-32 -z-10 size-112 rounded-full bg-accent-500/30 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-40 left-1/4 -z-10 size-96 rounded-full bg-brand-500/10 blur-3xl" />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-eyebrow uppercase text-accent-300">The verdict</p>
                {/* Line breaks from sm match the slide: "Verdict: Unify &" / "Accelerate" / "AI Transformation." */}
                <h2 id="verdict-heading" className="mt-4 text-h1 text-fg-inverse">
                  <span className="sm:block">
                    <span className="text-accent-300">{verdict.headingLead}</span> {verdict.headingLine1}
                  </span>{' '}
                  <span className="sm:block">{verdict.headingLine2}</span>{' '}
                  <span className="text-accent-300 sm:block">{verdict.headingAccent}</span>
                </h2>
                <p className="mt-6 max-w-2xl text-lead text-fg-inverse-muted">{verdict.body}</p>
              </div>

              <ul className="space-y-4 lg:col-span-5">
                {verdict.points.map((point) => (
                  // One line per check from sm, as the slide asks.
                  <li key={point} className="flex items-center gap-3 text-h4 text-fg-inverse sm:whitespace-nowrap">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-300 text-ink-950">
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </ToneContext.Provider>
  );
}
