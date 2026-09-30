import { disciplines } from './disciplines';
import { SECTION_IDS, sectorAnchorId } from './sections';
import { sectors } from './sectors';
import { solutionMenuOrder, solutions } from './solutions';

/** Optional side effect of a link, e.g. selecting a tab in the section it points to. */
export type NavAction = { type: 'solution'; id: string } | { type: 'discipline'; id: string };

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
  return { label: solution.menuLabel, href: anchor(SECTION_IDS.solutions), action: { type: 'solution', id } };
});

const capabilityGroups: NavGroup[] = disciplines
  .filter((discipline) => discipline.menuGroup)
  .map((discipline) => {
    const action: NavAction = { type: 'discipline', id: discipline.id };
    const href = anchor(SECTION_IDS.capabilities);
    return {
      heading: { label: discipline.menuGroup ?? discipline.title, href, action },
      links: discipline.capabilities.map((label) => ({ label, href, action })),
    };
  });

export const primaryNav: NavItem[] = [
  { id: 'about', label: 'About', sectionHref: anchor(SECTION_IDS.about) },
  { id: 'solutions', label: 'Solutions', sectionHref: anchor(SECTION_IDS.solutions), groups: [{ links: solutionLinks }] },
  {
    id: 'sector',
    label: 'Sector',
    sectionHref: anchor(SECTION_IDS.sectors),
    groups: [{ links: sectors.map((sector) => ({ label: sector.name, href: anchor(sectorAnchorId(sector.id)) })) }],
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    sectionHref: anchor(SECTION_IDS.capabilities),
    layout: 'columns',
    groups: capabilityGroups,
  },
  {
    id: 'team',
    label: 'Our Team',
    sectionHref: anchor(SECTION_IDS.team),
    align: 'end',
    groups: [
      {
        links: [
          { label: 'Leadership team', href: anchor(SECTION_IDS.teamLeadership) },
          { label: 'Expert network', href: anchor(SECTION_IDS.teamExperts) },
          { label: 'Partner network', href: anchor(SECTION_IDS.teamPartners) },
        ],
      },
    ],
  },
  { id: 'contact', label: 'Contact', sectionHref: anchor(SECTION_IDS.contact) },
];
