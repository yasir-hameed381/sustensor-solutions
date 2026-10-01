import type { Partner, Person } from './types';

// Names and roles come from the revision brief.
// TODO (PLACEHOLDER): bios, photos, and LinkedIn links are not yet available. Add an `image` (file in /public/team) and `linkedInUrl` when ready.
export const leadershipTeam: Person[] = [
  {
    name: 'M. Noman Arshad',
    role: 'Senior Manager – Engineering & Procurement',
    bio: 'Leads engineering and procurement engagements, bringing hands-on experience in vendor management, sourcing strategy, and procurement transformation.',
  },
  {
    name: 'Usman Raza',
    role: 'Director – Sustainability & Procurement',
    bio: 'Directs sustainability and procurement advisory, helping organisations embed ESG governance and carbon accountability into commercial operations.',  },
];

export const expertNetwork: Person[] = [
  {
    name: 'Abdulrahman Gull',
    role: 'Technology',
    bio: 'Specialist in enterprise software delivery and system integration.',
  },
  {
    name: 'Maaz Arshad',
    role: 'Technology',
    bio: 'Specialist in data platforms, dashboards, and digital tooling.',
  },
  {
    name: 'Sean McKenzie',
    role: 'Sustainability & Procurement',
    bio: 'Specialist in sustainable sourcing and supply chain governance.',
  },
  {
    name: 'Imran Sheikh',
    role: 'Sustainability',
    bio: 'Specialist in corporate sustainability strategy and ESG programmes.',
  },
  {
    name: 'Prince Osisiadan',
    role: 'Sustainability & Reporting',
    bio: 'Specialist in ESG disclosure, frameworks, and reporting assurance.',
  },
];

// TODO (PLACEHOLDER): partner descriptions and website links are not yet available. "Sean X" is listed exactly as provided in the brief.
export const partnerNetwork: Partner[] = [
  { name: 'Technovez', description: 'Technology delivery partner' },
  { name: 'SUCCA Africa', description: 'Regional sustainability partner' },
  { name: 'Sean X', description: 'Strategic advisory partner' },
];
