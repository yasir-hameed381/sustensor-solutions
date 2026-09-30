/** DOM ids used for in-page navigation. Keep in sync with the header menu. */
export const SECTION_IDS = {
  about: 'about',
  realityCheck: 'reality-check',
  solutions: 'solutions',
  sectors: 'sectors',
  capabilities: 'capabilities',
  region: 'regional-lens',
  verdict: 'verdict',
  team: 'team',
  teamLeadership: 'team-leadership',
  teamExperts: 'team-experts',
  teamPartners: 'team-partners',
  contact: 'contact',
} as const;

export const sectorAnchorId = (sectorId: string) => `sector-${sectorId}`;
