/** DOM ids used for in-page navigation. Keep in sync with the header menu. */
export const SECTION_IDS = {
  about: 'about',
  realityCheck: 'reality-check',
  workflows: 'workflows',
  /** The interactive demo inside the workflows section; the header's Solutions links land here. */
  workflowDemo: 'workflow-demo',
  solutions: 'solutions',
  sectors: 'sectors',
  capabilities: 'capabilities',
  teams: 'teams',
  region: 'regional-lens',
  verdict: 'verdict',
  partners: 'partners',
  faq: 'faq',
  contact: 'contact',
} as const;

export const sectorAnchorId = (sectorId: string) => `sector-${sectorId}`;

export const disciplineAnchorId = (disciplineId: string) => `capability-${disciplineId}`;
