import type { ReactNode, Ref } from 'react';
import { Mail, MessageCircle } from 'lucide-react';

import { company } from '@/content/company';
import { copy } from '@/content/copy';
import { disciplines } from '@/content/disciplines';
import { sectors } from '@/content/sectors';
import { solutions } from '@/content/solutions';
import { expertNetwork, leadershipTeam, partnerNetwork } from '@/content/team';
import type { Solution } from '@/content/types';

/*
 * Print/PDF version of the profile, laid out as fixed A4 pages.
 * html2canvas cannot parse modern colour functions (oklab/color-mix), so this component must not use
 * Tailwind opacity modifiers such as `bg-forest/50`. Use the solid brand tokens only.
 */

interface PdfPage {
  title: string;
  content: ReactNode;
}

// Look solutions up by id so adding or removing one never shifts the PDF pages.
const solutionsById = (...ids: string[]) =>
  ids.map((id) => solutions.find((solution) => solution.id === id)).filter((solution): solution is Solution => Boolean(solution));

export function ExecutivePdfDocument({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const pages: PdfPage[] = [
    { title: 'Executive Overview', content: <OverviewPage /> },
    { title: 'The Integrated Architecture', content: <ArchitecturePage /> },
    {
      title: 'Solutions (Part I)',
      content: <SolutionsPage label="Solutions — Part I" heading="Vendor Lifecycle & Contract Sustainability" items={solutionsById('vendor-management', 'contract-sustainability')} />,
    },
    {
      title: 'Solutions (Part II)',
      content: <SolutionsPage label="Solutions — Part II" heading="Procure-to-Pay Automation" items={solutionsById('procure-to-pay')} />,
    },
    { title: 'Planning & Sectors', content: <PlanningAndSectorsPage /> },
    { title: 'Team & Contact', content: <TeamAndContactPage /> },
  ];

  return (
    <div ref={ref} className="executive-pdf-container" aria-hidden="true">
      {pages.map((page, index) => (
        <div key={page.title} className="executive-pdf-page">
          <PdfHeader title={page.title} />
          <div className="my-auto flex flex-col gap-3.5 py-2">{page.content}</div>
          <PdfFooter page={index + 1} total={pages.length} />
        </div>
      ))}
    </div>
  );
}

const pad = (value: number) => String(value).padStart(2, '0');

function PdfHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 text-[9.5px]">
      <div className="flex items-center gap-2">
        <img src={company.logo.onLight} alt="" className="h-5 w-auto object-contain" />
        <span className="mono font-bold text-forest">{company.name}</span>
        <span className="text-line-green">|</span>
        <span className="mono text-copy">Corporate Capability Profile</span>
      </div>
      <span className="mono text-[9px] font-semibold text-emerald">{title}</span>
    </div>
  );
}

function PdfFooter({ page, total }: { page: number; total: number }) {
  return (
    <div className="mono flex items-center justify-between border-t border-line pt-2 text-[8px] text-copy-muted">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-forest">{company.name}</span>
        <span>•</span>
        <span>{company.location}</span>
        <span>•</span>
        <span>{company.email}</span>
        <span>•</span>
        <span>{company.phone}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2 pl-3">
        <span className="font-semibold text-emerald">Confidential</span>
        <span>•</span>
        <span className="font-bold text-forest">
          Page {pad(page)} of {pad(total)}
        </span>
      </div>
    </div>
  );
}

function PageIntro({ label, heading, accent, text }: { label: string; heading: string; accent?: string; text?: string }) {
  return (
    <div>
      <p className="mono text-[9.5px] font-semibold text-emerald">{label}</p>
      <h2 className="display mt-1 text-[24px] font-semibold leading-tight text-forest">
        {heading} {accent && <span className="text-emerald">{accent}</span>}
      </h2>
      {text && <p className="mt-1 text-[11px] leading-relaxed text-copy">{text}</p>}
    </div>
  );
}

function OverviewPage() {
  return (
    <>
      <div className="flex items-center gap-5">
        <img src={company.logo.onLight} alt="" className="h-14 w-auto object-contain" />
        <p className="display text-[27px] font-bold uppercase leading-none text-forest">Corporate Capability Profile</p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border border-line-green bg-mist p-3">
        <div>
          <p className="mono text-[8.5px] font-bold text-emerald">Focus & Mandate</p>
          <p className="mt-0.5 text-xs font-semibold text-forest">Enterprise Governance, CIPS Procurement & Carbon Accounting</p>
        </div>
        <div className="h-8 w-px bg-sage" />
        <div className="text-right">
          <p className="mono text-[8.5px] font-bold text-emerald">Regional Calibration</p>
          <p className="mt-0.5 text-xs font-semibold text-forest">Saudi Vision 2030 & Regional Market Growth</p>
        </div>
      </div>

      <div>
        <p className="mono text-[9.5px] font-semibold text-emerald">01 / Executive Briefing</p>
        <h2 className="display mt-1 text-[27px] font-semibold leading-[1.05] text-forest">
          Transforming Ambition into <span className="text-emerald">Defensible Enterprise Execution</span>
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed text-copy-strong">
          Continuing to manage digital change, procurement and supply chain complexity, and ESG metrics independently is an
          operational liability. Sustensor Solutions unifies these disciplines into a single high-integrity operating layer
          calibrated for the high-velocity scaling demands of the Kingdom and the wider region.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-line bg-paper p-3">
          <p className="mono text-[8.5px] font-bold text-emerald">The Strategic Execution Gap</p>
          <p className="mt-1 text-[10px] leading-relaxed text-copy">
            Most transformation strategies dissolve in execution between disconnected silos of technology, procurement and supply
            chain, and ESG compliance. Fragmented records lead to audit vulnerabilities and compliance penalties under modern
            corporate governance.
          </p>
        </div>
        <div className="border border-emerald bg-mist-3 p-3">
          <p className="mono text-[8.5px] font-bold text-emerald">The Sustensor Operating Model</p>
          <p className="mt-1 text-[10px] font-medium leading-relaxed text-forest">
            We turn sustainability ambition, digital change, and team capability into operating improvements the board can see.
            We hardwire efficiency, local-content governance, and verifiable carbon data directly into corporate profit and loss
            statements.
          </p>
        </div>
      </div>

      <div className="border border-line bg-paper p-3">
        <p className="mono text-[8.5px] font-bold text-emerald">The Strategic Operating Brief</p>
        <div className="mt-1.5 grid grid-cols-3 gap-2 border-t border-line pt-1.5 text-[9.5px]">
          <BriefColumn label="Focus" items={copy.hero.brief.focus} />
          <BriefColumn label="Lens" items={copy.hero.brief.lens} />
          <BriefColumn label="Business Impact" items={['Decoupled Scaling', 'Regulatory Defensibility', 'P&L Bottom-Line Integration']} highlight />
        </div>
      </div>

      <p className="border-l-2 border-gold bg-sand px-3 py-2 text-[10px] leading-relaxed text-forest">
        <span className="font-semibold">Target Clientele: </span>
        Exclusively engineered for government-backed entities, sovereign gigaprojects, and listed corporations navigating accelerated
        growth and strict statutory compliance requirements.
      </p>
    </>
  );
}

function BriefColumn({ label, items, highlight = false }: { label: string; items: readonly string[]; highlight?: boolean }) {
  return (
    <div>
      <p className="mono block text-[8px] text-line-green">{label}</p>
      {items.map((item, index) => (
        <p
          key={item}
          className={highlight ? 'font-semibold text-emerald' : index === 0 ? 'font-semibold text-forest' : 'text-copy'}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function ArchitecturePage() {
  return (
    <>
      <PageIntro
        label="02 / System Architecture"
        heading="The Integrated"
        accent="Sustensor Architecture"
        text="Four connected disciplines. One operating view. A cohesive architecture designed to eliminate operational silos between commercial procurement, carbon governance, and technology."
      />
      <div className="flex flex-col gap-2.5">
        {disciplines.map((discipline) => (
          <div key={discipline.id} className="border border-line-green bg-paper p-3">
            <div className="flex items-center gap-2 border-b border-line pb-1">
              <span className="mono text-[10.5px] font-bold text-emerald">{discipline.number}</span>
              <h3 className="display text-sm font-semibold text-forest">{discipline.title}</h3>
            </div>
            <div className="mt-1.5 grid grid-cols-[0.85fr_1.15fr] gap-3 text-[10px]">
              <div>
                <p className="mono text-[8px] font-semibold text-emerald">The Strategic Logic</p>
                <p className="mt-0.5 leading-relaxed text-copy">{discipline.logic}</p>
              </div>
              <div className="border-l border-line pl-3">
                <p className="mono text-[8px] font-semibold text-emerald">The Delivered Solution</p>
                <p className="mt-0.5 font-medium leading-relaxed text-forest">{discipline.solution}</p>
              </div>
            </div>
            <p className="mt-1.5 border-t border-line pt-1 text-[8.5px] text-copy">
              <span className="mono font-bold text-forest">Capabilities: </span>
              {discipline.capabilities.join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function SolutionsPage({ label, heading, items }: { label: string; heading: string; items: Solution[] }) {
  return (
    <>
      <PageIntro label={label} heading={heading} />
      {items.map((solution) => (
        <PdfSolutionCard key={solution.id} solution={solution} />
      ))}
    </>
  );
}

function PdfSolutionCard({ solution }: { solution: Solution }) {
  return (
    <div className="border border-line-green bg-paper p-3">
      <div className="border-b border-line pb-1.5">
        <div className="flex items-center gap-2">
          <span className="mono text-[10.5px] font-bold text-emerald">{solution.number}</span>
          <h3 className="display text-sm font-semibold text-forest">{solution.title}</h3>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[8px] font-bold uppercase text-emerald">{solution.badge}</span>
          <span className="text-line-green">|</span>
          <span className="mono text-[8.5px] text-copy">{solution.subtitle}</span>
        </div>
      </div>
      <p className="mt-1 text-[9.5px] leading-relaxed text-copy">{solution.summary}</p>

      <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[8.5px] text-forest">
        <span className="mono mr-1 font-bold">Process:</span>
        {solution.process.map((step, index) => (
          <span key={step.title} className="flex items-center gap-1">
            <span className="font-bold text-emerald">{index + 1}.</span>
            {step.title}
            {index < solution.process.length - 1 && <span className="px-0.5 text-emerald">→</span>}
          </span>
        ))}
      </div>

      <table className="mt-1.5 w-full border-t border-line text-left text-[9.5px]">
        <thead>
          <tr className="mono border-b border-line text-[8px] text-emerald">
            <th className="w-[24%] py-1 font-semibold">Area</th>
            <th className="w-[46%] py-1 font-semibold">Key Deliverables</th>
            <th className="w-[30%] py-1 font-semibold">Business Impact</th>
          </tr>
        </thead>
        <tbody>
          {solution.deliverables.map((row) => (
            <tr key={row.area} className="border-b border-line-soft last:border-b-0">
              <td className="py-1 pr-2 align-top font-semibold text-forest">{row.area}</td>
              <td className="py-1 pr-2 align-top text-copy">{row.scope}</td>
              <td className="py-1 align-top font-medium text-forest">{row.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mono mt-1.5 flex flex-wrap gap-x-3 border-t border-line pt-1 text-[8px] text-emerald">
        <span className="font-bold text-forest">Core Pillars:</span>
        {solution.pillars.map((pillar) => (
          <span key={pillar.label}>• {pillar.label}</span>
        ))}
      </p>
    </div>
  );
}

function PlanningAndSectorsPage() {
  const [planning] = solutionsById('annual-procurement-planning');
  return (
    <>
      <PageIntro label="Solutions — Part III" heading="Annual Procurement Planning" />
      <PdfSolutionCard solution={planning} />
      {planning.outputs && (
        <p className="text-[9px] text-copy">
          <span className="mono font-bold text-forest">Key outputs: </span>
          {planning.outputs.map((output) => output.label).join(' · ')}
        </p>
      )}

      <PageIntro label="Sectors" heading="Sectors" accent="We Serve" />
      <div className="grid grid-cols-3 gap-2">
        {sectors.map(({ id, name, icon: Icon, description }) => (
          <div key={id} className="border border-line bg-paper p-2.5">
            <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-forest">
              <Icon className="h-3.5 w-3.5 text-emerald" />
              {name}
            </p>
            <p className="mt-1 text-[8.5px] leading-snug text-copy">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function TeamAndContactPage() {
  return (
    <>
      <PageIntro
        label="Regional Lens"
        heading="Engineered for"
        accent="Saudi Vision 2030"
        text={copy.region.body}
      />
      <div className="grid grid-cols-3 gap-2.5">
        {copy.region.pillars.map((pillar) => (
          <div key={pillar.title} className="border border-line bg-paper p-2.5">
            <p className="mono text-[8px] font-bold text-emerald">{pillar.title}</p>
            <p className="mt-1 text-[9px] leading-relaxed text-copy">{pillar.text}</p>
          </div>
        ))}
      </div>

      <PageIntro label="Our Team" heading="The People" accent="Behind the Work" />
      <div className="grid grid-cols-2 gap-2.5">
        {leadershipTeam.map((person) => (
          <div key={person.name} className="border border-line-green bg-mist p-2.5">
            <p className="display text-[13px] font-semibold text-forest">{person.name}</p>
            <p className="text-[9px] font-medium text-emerald">{person.role}</p>
            <p className="mt-1 text-[8.5px] leading-snug text-copy">{person.bio}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-2.5 text-[9px]">
        <div className="border border-line bg-paper p-2.5">
          <p className="mono text-[8px] font-bold text-emerald">Expert Network</p>
          <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
            {expertNetwork.map((expert) => (
              <li key={expert.name}>
                <span className="font-semibold text-forest">{expert.name}</span>
                <span className="text-copy"> — {expert.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-paper p-2.5">
          <p className="mono text-[8px] font-bold text-emerald">Partner Network</p>
          <ul className="mt-1 space-y-0.5">
            {partnerNetwork.map((partner) => (
              <li key={partner.name} className="font-semibold text-forest">
                {partner.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PageIntro label="Contact" heading="Executive Engagement &" accent="Direct Channels" text={copy.contact.lead} />
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-line-green bg-mist p-3">
          <p className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center bg-forest text-mint">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
            <span className="mono text-[8.5px] text-emerald">WhatsApp & Phone</span>
          </p>
          <p className="display mt-1.5 text-lg font-semibold text-forest">{company.phone}</p>
          <p className="text-[10px] text-copy">{copy.contact.whatsappNote}</p>
        </div>
        <div className="border border-forest bg-forest p-3 text-ivory">
          <p className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center bg-gold text-forest">
              <Mail className="h-3.5 w-3.5" />
            </span>
            <span className="mono text-[8.5px] text-sage">Corporate Briefing Desk</span>
          </p>
          <p className="display mt-1.5 text-sm font-semibold text-ivory">{company.email}</p>
          <p className="text-[10px] text-on-dark">{copy.contact.emailNote}</p>
        </div>
      </div>
    </>
  );
}
