import { disciplines } from './disciplines';
import { disciplineAnchorId, SECTION_IDS, sectorAnchorId } from './sections';
import { sectors } from './sectors';
import { solutionMenuOrder, solutions } from './solutions';

/** Optional side effect of a link, e.g. selecting a tab in the section it points to. */
export type NavAction = { type: 'solution' | 'sector'; id: string };

export interface NavLink {
  label: string;
  href: string;
  action?: NavAction;
}

export interface NavGroup {
  heading?: NavLink;
  links: NavLink[];
}

export interface NavItem {
  id: string;
  label: string;
  /** The section this item represents. Items without `groups` link straight to it. */
  sectionHref: string;
  /** When present, the item opens a dropdown instead of linking directly. */
  groups?: NavGroup[];
  /** `columns` renders groups side by side (mega menu); `list` stacks them. */
  layout?: 'list' | 'columns';
  align?: 'start' | 'end';
}

const anchor = (id: string) => `#${id}`;

const solutionLinks: NavLink[] = solutionMenuOrder.map((id) => {
  const solution = solutions.find((item) => item.id === id);
  if (!solution) throw new Error(`Unknown solution in menu order: ${id}`);
  // Lands on the "In motion" demo box itself (not the section heading), which opens this solution's workflow (see App).
  return { label: solution.menuLabel, href: anchor(SECTION_IDS.workflowDemo), action: { type: 'solution', id } };
});

const capabilityGroups: NavGroup[] = disciplines
  .filter((discipline) => discipline.menuGroup)
  .map((discipline) => {
    const href = anchor(disciplineAnchorId(discipline.id));
    return {
      heading: { label: discipline.menuGroup ?? discipline.title, href },
      links: discipline.capabilities.map((label) => ({ label, href })),
    };
  });

export const primaryNav: NavItem[] = [
  { id: 'about', label: 'About', sectionHref: anchor(SECTION_IDS.about) },
  { id: 'solutions', label: 'Solutions', sectionHref: anchor(SECTION_IDS.solutions), groups: [{ links: solutionLinks }] },
  {
    id: 'sector',
    label: 'Sectors',
    sectionHref: anchor(SECTION_IDS.sectors),
    groups: [
      {
        links: sectors.map((sector) => ({
          label: sector.name,
          href: anchor(sectorAnchorId(sector.id)),
          action: { type: 'sector', id: sector.id },
        })),
      },
    ],
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    sectionHref: anchor(SECTION_IDS.capabilities),
    layout: 'columns',
    groups: capabilityGroups,
  },
  { id: 'region', label: 'Region', sectionHref: anchor(SECTION_IDS.region) },
  { id: 'contact', label: 'Contact', sectionHref: anchor(SECTION_IDS.contact) },
];
