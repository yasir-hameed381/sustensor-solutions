import { useEffect, type CSSProperties } from 'react';
import { ArrowUpRight, CircleCheck } from 'lucide-react';

import { SECTION_IDS, sectorAnchorId } from '@/content/sections';
import { sectors } from '@/content/sectors';
import { projectsForSector, technovez } from '@/content/technovez';
import type { PartnerProject, Sector } from '@/content/types';
import { cn } from '@/lib/utils';

import { Accent, SectionHeading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { TabList, TabPanel } from '../ui/Tabs';
import { ToneContext } from '../ui/tone';

const ID_PREFIX = 'sector';

interface SectorsSectionProps {
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Sector explorer: a sector list beside a detail panel. Each panel leads with Sustensor's focus in that sector;
 * where Technovez (technology partner) has delivered platforms, they follow as supporting proof.
 */
export function SectorsSection({ activeId, onSelect }: SectorsSectionProps) {
  // Open the sector named in the URL (`#sector-…`), on load and when the hash changes.
  useEffect(() => {
    const selectFromHash = () => {
      const sector = sectors.find(({ id }) => window.location.hash === `#${sectorAnchorId(id)}`);
      if (sector) onSelect(sector.id);
    };
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, [onSelect]);

  return (
    <Section id={SECTION_IDS.sectors} labelledBy="sectors-heading" variant="tint">
      <SectionHeading
        id="sectors-heading"
        eyebrow="Sectors"
        title={
          <>
            Sectors <Accent>We Serve</Accent>
          </>
        }
        lead="Sustainability, procurement, and technology expertise applied to the realities of each industry."
      />

      <div data-reveal className="relative mt-12 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Targets for the header and footer sector links; the links also select the tab (see App). */}
        {sectors.map(({ id }) => (
          <span key={id} id={sectorAnchorId(id)} aria-hidden="true" className="absolute top-0" />
        ))}

        <TabList
          label="Sectors"
          idPrefix={ID_PREFIX}
          items={sectors.map((sector) => ({ id: sector.id, label: sector.name }))}
          activeId={activeId}
          onChange={onSelect}
          className="scrollbar-none mask-fade-r -mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0"
          tabClassName={(isActive) =>
            cn(
              'spotlight group relative flex shrink-0 snap-start items-center gap-3 rounded-lg border py-2.5 pl-2.5 pr-3.5 text-left transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-out-soft lg:w-full',
              isActive ? 'border-accent-500 bg-surface shadow-md' : 'border-hairline bg-canvas hover:border-hairline-strong hover:bg-surface',
            )
          }
          renderTab={(item, isActive) => {
            const sector = sectors.find((entry) => entry.id === item.id)!;
            return (
              <>
                <IconTile icon={sector.icon} size="sm" emphasis={isActive ? 'solid' : 'soft'} />
                <span
                  className={cn(
                    'whitespace-nowrap text-small font-semibold lg:whitespace-normal',
                    isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg',
                  )}
                >
                  {item.label}
                </span>
              </>
            );
          }}
        />

        <div className="mt-4 lg:col-span-8 lg:mt-0">
          {sectors.map((sector) => (
            <TabPanel key={sector.id} idPrefix={ID_PREFIX} id={sector.id} hidden={sector.id !== activeId} className="h-full">
              <SectorDetail sector={sector} />
            </TabPanel>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** The selected sector on an ink panel: Sustensor's focus, then any partner projects. */
function SectorDetail({ sector }: { sector: Sector }) {
  const projects = projectsForSector(sector.id);
  const Icon = sector.icon;
  return (
    <ToneContext.Provider value="inverse">
      <div className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-ink-950 p-6 shadow-md sm:p-8">
        <Icon aria-hidden="true" strokeWidth={1} className="absolute -right-10 -top-10 -z-10 size-56 text-white/3" />

        <div className="flex items-start gap-4">
          <IconTile icon={Icon} />
          <div>
            <h3 className="text-h3 text-fg-inverse">{sector.name}</h3>
            <p className="mt-2 max-w-2xl text-body text-fg-inverse-muted">{sector.description}</p>
          </div>
        </div>

        <p className="mt-8 text-eyebrow uppercase text-fg-inverse">Where we focus</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {/* stage-pop replays each time this tab is opened (compliverse). */}
          {sector.focus.map((item, index) => (
            <li
              key={item}
              style={{ '--i': index } as CSSProperties}
              className="stage-pop flex items-start gap-2.5 rounded-xl border border-hairline-inverse bg-white/4 p-4 text-small font-medium text-fg-inverse"
            >
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              {item}
            </li>
          ))}
        </ul>

        {projects.length > 0 && <PartnerProjects sectorName={sector.name} projects={projects} />}
      </div>
    </ToneContext.Provider>
  );
}

/** Supporting proof: compact cards for platforms Technovez has delivered in this sector. */
function PartnerProjects({ sectorName, projects }: { sectorName: string; projects: PartnerProject[] }) {
  return (
    <div className="mt-auto pt-8">
      <div className="border-t border-hairline-inverse pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <p className="flex items-center gap-2 text-caption text-fg-inverse-subtle">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-technovez" />
            Platforms delivered with our technology partner, {technovez.name}
          </p>
          <a
            href={technovez.projectsUrl}
            target="_blank"
            rel="noreferrer"
            className="-my-2 inline-flex items-center gap-1 py-2 text-caption font-semibold text-accent-300 hover:text-accent-400 hover:underline"
          >
            View all
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{technovez.name} projects (opens in a new tab)</span>
          </a>
        </div>

        {/* A swipeable row on phones, three across from sm. */}
        <ul
          aria-label={`${technovez.name} projects in ${sectorName}`}
          className="-mx-6 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {projects.map((project, index) => (
            <li key={project.name} style={{ '--i': index + 3 } as CSSProperties} className="stage-pop w-[78%] shrink-0 snap-start scroll-ml-6 sm:w-auto">
              <a
                href={technovez.projectsUrl}
                target="_blank"
                rel="noreferrer"
                className="spotlight spotlight-inverse group flex h-full flex-col overflow-hidden rounded-xl border border-hairline-inverse bg-white/4 transition-[transform,background-color] duration-(--duration-base) ease-out-soft hover:-translate-y-0.5 hover:bg-white/6"
              >
                <span className="block aspect-2/1 overflow-hidden border-b border-hairline-inverse bg-white">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={600}
                    className="size-full object-cover object-top transition-transform duration-(--duration-slow) ease-out-soft group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-body font-semibold text-fg-inverse">{project.name}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-fg-inverse-subtle transition-[color,transform] duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-300"
                    />
                  </span>
                  <span className="mt-1 block text-small text-fg-inverse-muted">{project.summary}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
