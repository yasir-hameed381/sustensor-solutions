import { Building2, ConciergeBell, Cpu, Factory, GraduationCap, HardHat, HeartPulse, Landmark, Zap } from 'lucide-react';

import type { Sector } from './types';

// TODO (PLACEHOLDER): all sector descriptions are draft copy. The last four sectors were added where the brief said "please add more".
export const sectors: Sector[] = [
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Procurement governance, vendor compliance, and sustainability reporting for universities, schools, and training providers.',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Landmark,
    description: 'Audit-ready ESG disclosure, third-party risk management, and controlled spend for banks, insurers, and funds.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    description: 'Resilient medical supply chains, supplier qualification, and carbon tracking across hospitals and health networks.',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Cpu,
    description: 'Scalable vendor ecosystems, cloud and hardware sourcing, and Scope 3 visibility for fast-growing technology firms.',
  },
  {
    id: 'service-hospitality',
    name: 'Service & Hospitality',
    icon: ConciergeBell,
    description: 'Category management, sustainable sourcing, and local-content compliance for hotels, venues, and service operators.',
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    icon: Building2,
    description: 'Transparent tendering, DoA compliance, and annual procurement planning for ministries, authorities, and agencies.',
  },
  {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    icon: Zap,
    description: 'Decarbonisation roadmaps, contractor governance, and emissions reporting across generation and utility networks.',
  },
  {
    id: 'construction-real-estate',
    name: 'Construction & Real Estate',
    icon: HardHat,
    description: 'Giga-project supply chains, contractor performance, and embodied-carbon tracking from tender to handover.',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    icon: Factory,
    description: 'Supplier risk, sustainable materials sourcing, and ERP-integrated procurement for industrial operations.',
  },
];
