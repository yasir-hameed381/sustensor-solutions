import type { CSSProperties } from 'react';
import { ArrowRight, ChevronDown, MessageCircleQuestion } from 'lucide-react';

import { faq } from '@/content/faq';
import { SECTION_IDS } from '@/content/sections';

import { ButtonLink } from '../ui/Button';
import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';

/**
 * FAQ (idea from liztek.ca): an accordion beside a "still have questions?" card. Native <details>, so it works with
 * keyboard and screen readers without extra code; the open item is highlighted.
 */
export function FaqSection() {
  return (
    <Section id={SECTION_IDS.faq} labelledBy="faq-heading" variant="canvas">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
            <SectionHeading
              id="faq-heading"
              eyebrow="FAQs"
              title={
                <>
                  Questions, <Accent>answered.</Accent>
                </>
              }
              lead="What procurement, finance and IT leaders usually ask us first."
            />
            <div data-reveal className="mt-8 rounded-2xl bg-ink-950 p-6 text-fg-inverse shadow-md">
              <MessageCircleQuestion aria-hidden="true" className="size-6 text-accent-300" />
              <p className="mt-4 text-h4 text-fg-inverse">Still have questions?</p>
              <p className="mt-1.5 text-small text-fg-inverse-muted">Tell us about your goals and we’ll find the right fit together.</p>
              <ButtonLink href={`#${SECTION_IDS.contact}`} variant="primary-inverse" size="sm" icon={ArrowRight} className="mt-5">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid gap-3">
            {faq.map((item, index) => (
              <li key={item.question} data-reveal style={{ '--reveal-index': index % 3 } as CSSProperties}>
                <details
                  open={index === 0}
                  className="group rounded-xl border border-hairline bg-surface shadow-xs transition-[border-color,box-shadow] duration-(--duration-base) open:border-accent-300 open:bg-linear-to-br open:from-accent-50 open:to-surface open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-body font-semibold text-fg sm:px-6 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface text-accent-700 transition-transform duration-(--duration-base) group-open:rotate-180">
                      <ChevronDown aria-hidden="true" className="size-4" />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-body text-fg-muted sm:px-6">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
