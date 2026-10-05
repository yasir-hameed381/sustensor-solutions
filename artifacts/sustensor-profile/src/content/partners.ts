import { Cloud, Cpu, Users, type LucideIcon } from 'lucide-react';

import { technovez } from './technovez';

export interface Backer {
  label: string;
  name: string;
  /** Shown in a tile when there is no logo. */
  icon: LucideIcon;
  /** Logo under /public for dark backgrounds. */
  logo?: string;
  url?: string;
}

/** "Backed by" section: the partners and team behind Sustensor's delivery. */
export const backers: Backer[] = [
  { label: 'Our technology partner', name: technovez.name, icon: Cpu, logo: technovez.logo, url: technovez.url },
  // Hosting platform for Sustensor's SaaS, as proposed in the revision brief.
  { label: 'Our cloud hosting platform', name: 'Google Cloud', icon: Cloud },
  { label: 'In-house procurement & ESG experts', name: 'Sustensor team', icon: Users },
];
