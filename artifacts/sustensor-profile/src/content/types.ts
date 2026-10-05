import type { LucideIcon } from 'lucide-react';

export interface ProcessStep {
  title: string;
  detail?: string;
  /** Main illustration icon. */
  icon: LucideIcon;
  /** Small badge icon layered on the main icon. */
  accent: LucideIcon;
  /** Parallel sub-steps that run beneath this step, e.g. technical and commercial evaluation. */
  branches?: string[];
}

export interface ProcessOutput {
  label: string;
  icon: LucideIcon;
}

/** A top-level discipline shown in the Capabilities section ("The Integrated Sustensor Architecture"). */
export interface Discipline {
  id: string;
  number: string;
  title: string;
  /** Column heading in the Capabilities mega-menu. Disciplines without one are not listed in the menu. */
  menuGroup?: string;
  logic: string;
  solution: string;
  capabilities: string[];
}

export interface Deliverable {
  area: string;
  scope: string;
  impact: string;
}

/** A solution area shown as a tab in the Solutions section. */
export interface Solution {
  id: string;
  number: string;
  title: string;
  /** Label used in the header's Solutions menu. */
  menuLabel: string;
  badge: string;
  subtitle: string;
  summary: string;
  process: ProcessStep[];
  outputs?: ProcessOutput[];
  deliverables: Deliverable[];
  pillars: { label: string; detail: string }[];
}

export interface Sector {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  /** Key focus areas (three or four), shown in the sector panel. */
  focus: string[];
}

export interface Person {
  name: string;
  role: string;
  bio: string;
  /** Portrait path under /public, e.g. "/team/usman-raza.jpg" (square, at least 160×160). A monogram is shown when missing. */
  image?: string;
  /** Full LinkedIn profile URL. The LinkedIn button is hidden when missing. */
  linkedInUrl?: string;
}

/** A live platform delivered by Technovez, the technology delivery partner. */
export interface PartnerProject {
  name: string;
  /** One line shown on the project card. */
  summary: string;
  /** Sector the project is listed under (`Sector.id`). */
  sectorId: string;
  /** Screenshot path under /public, roughly 2:1; cropped from the top. */
  image: string;
}

export interface Partner {
  name: string;
  description: string;
  url?: string;
}
