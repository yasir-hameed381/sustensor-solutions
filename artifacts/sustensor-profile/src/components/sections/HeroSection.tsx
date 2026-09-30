import { ArrowRight } from 'lucide-react';

import { company } from '@/content/company';
import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Eyebrow } from '../shared/Eyebrow';

export function HeroSection() {
  const columns = [
    { label: 'Focus', items: copy.hero.brief.focus },
    { label: 'Lens', items: copy.hero.brief.lens },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100dvh-72px)] overflow-hidden bg-forest text-ivory"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-50">
        <div className="absolute -right-[12%] top-[7%] h-[680px] w-[680px] rounded-full border border-sage/30" />
        <div className="absolute -right-[7%] top-[14%] h-[540px] w-[540px] rounded-full border border-sage/25" />
        <div className="absolute right-[3%] top-[21%] h-[400px] w-[400px] rounded-full border border-sage/20" />
        <div className="absolute bottom-[-100px] left-[34%] h-[310px] w-[310px] rounded-full bg-mint/10 blur-3xl" />
      </div>
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-10 border-r border-teal/25 sm:block" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1440px] grid-cols-1 items-center gap-14 px-5 py-20 sm:px-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:px-24 lg:py-24">
        <div className="reveal max-w-[780px]">
          <Eyebrow onDark>{copy.hero.eyebrow}</Eyebrow>
          <h1
            id="hero-heading"
            className="display mt-8 max-w-[820px] text-[clamp(3.2rem,7.8vw,7.5rem)] font-semibold leading-[0.9] text-ivory"
          >
            Make the case for a better, <em className="font-normal text-mint">sustainable</em> future.
          </h1>
          <p className="mt-8 max-w-[510px] border-l-2 border-gold pl-5 text-sm leading-7 text-on-dark sm:text-base">
            {company.focus}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={`#${SECTION_IDS.about}`}
              className="group flex items-center gap-3 bg-mint px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-mist"
            >
              Read the briefing
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="mono text-[10px] text-sage">{company.region}</span>
          </div>
        </div>

        <aside aria-label="Operating brief" className="reveal reveal-delay-2 mx-auto w-full max-w-[420px] lg:justify-self-end">
          <div className="border border-teal/55 bg-forest-2/75 p-5 backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-teal/45 pb-5">
              <span className="mono text-[10px] text-sage">The operating brief</span>
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint" />
            </div>
            <p className="display py-9 text-[30px] leading-[1.02] text-ivory sm:text-[38px]">{copy.hero.briefQuote}</p>
            <div className="grid grid-cols-2 gap-x-px bg-teal/45">
              {columns.map(({ label, items }) => (
                <div key={label} className="bg-forest-2 px-4 py-4">
                  <p className="mono text-[9px] text-sage">{label}</p>
                  <ul className="mt-3 space-y-3 text-sm leading-snug text-mist">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
