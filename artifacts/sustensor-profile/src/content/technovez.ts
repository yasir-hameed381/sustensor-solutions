import type { PartnerProject } from './types';

/** Technology delivery partner whose live platforms are shown in the Sectors section. */
export const technovez = {
  name: 'Technovez',
  url: 'https://www.technovez.com',
  projectsUrl: 'https://www.technovez.com/projects',
  /** White wordmark with an orange mark: use on dark backgrounds only. */
  logo: '/technovez/logo.webp',
} as const;

// Source: technovez.com/projects. Summaries are condensed from each project's description there.
// Up to three per sector; screenshots are about 2:1 and cropped from the top.
export const technovezProjects: PartnerProject[] = [
  // Education
  {
    name: 'AfterSchoolHQ',
    summary: 'School management with registration, attendance and fees in one integrated system.',
    sectorId: 'education',
    image: '/technovez/afterschoolhq.webp',
  },
  {
    name: 'Curriculum.com',
    summary: 'Curriculum management and lesson planning tools that reduce teacher workload.',
    sectorId: 'education',
    image: '/technovez/curriculum.webp',
  },
  {
    name: 'Esco Institute',
    summary: 'Training and certification for HVACR and building-science professionals.',
    sectorId: 'education',
    image: '/technovez/esco-institute.webp',
  },

  // Finance
  {
    name: 'RuleOneToolbox',
    summary: 'Investor training platform with live stock-exchange data and interactive charts.',
    sectorId: 'finance',
    image: '/technovez/ruleonetoolbox.webp',
  },
  {
    name: 'Equity World',
    summary: 'Community FinTech where creators own, control and profit from their content.',
    sectorId: 'finance',
    image: '/technovez/equity-world.webp',
  },
  {
    name: 'Price Tracer',
    summary: 'Competitor price monitoring and market analysis for data-driven pricing.',
    sectorId: 'finance',
    image: '/technovez/price-tracer.webp',
  },

  // Healthcare
  {
    name: 'ECS Clinical',
    summary: 'HIPAA-compliant chat, voice, video and text messaging for care teams.',
    sectorId: 'healthcare',
    image: '/technovez/ecs-clinical.webp',
  },
  {
    name: 'Legacy Healthcare',
    summary: 'Case and clinical-document management for chiropractic and legal teams.',
    sectorId: 'healthcare',
    image: '/technovez/legacy-healthcare.webp',
  },
  {
    name: 'Findd.io',
    summary: 'Payroll and time-attendance for thousands of concurrent users, integrated with ServiceNow.',
    sectorId: 'healthcare',
    image: '/technovez/findd.webp',
  },

  // Technology
  {
    name: 'AI Voice Agent SaaS',
    summary: 'Multi-tenant AI voice agents handling calls for US agencies and small businesses.',
    sectorId: 'technology',
    image: '/technovez/ai-voice-agent.webp',
  },
  {
    name: 'Aixplain',
    summary: 'Development and hosting platform for building explainable AI solutions.',
    sectorId: 'technology',
    image: '/technovez/aixplain.webp',
  },
  {
    name: 'AgilityHealthRadar',
    summary: 'Analytics and customisable dashboards for tracking agile team performance.',
    sectorId: 'technology',
    image: '/technovez/agilityhealthradar.webp',
  },

  // Service & Hospitality
  {
    name: 'Luxuri',
    summary: 'Luxury rentals and premium services in Miami, Aspen, Los Angeles and Washington, DC.',
    sectorId: 'service-hospitality',
    image: '/technovez/luxuri.webp',
  },
  {
    name: 'Eventio.ai',
    summary: 'AI agents that plan events end to end, from venue discovery to task lists.',
    sectorId: 'service-hospitality',
    image: '/technovez/eventio.webp',
  },
  {
    name: 'Holidog',
    summary: 'Marketplace matching pet owners with professional trainers in real time.',
    sectorId: 'service-hospitality',
    image: '/technovez/holidog.webp',
  },
];

export const projectsForSector = (sectorId: string) => technovezProjects.filter((project) => project.sectorId === sectorId);
