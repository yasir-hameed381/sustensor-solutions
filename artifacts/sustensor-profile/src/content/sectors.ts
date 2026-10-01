import { Building2, ConciergeBell, Cpu, Factory, GraduationCap, HardHat, HeartPulse, Landmark, Truck } from 'lucide-react';

import type { Sector } from './types';

// TODO (PLACEHOLDER): all sector descriptions are draft copy. The last four sectors were added where the brief said "please add more".
export const sectors: Sector[] = [
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Procurement governance, vendor compliance, and sustainability reporting for universities, schools, and training providers.',
    focus: ['Procurement governance', 'Vendor compliance', 'Sustainability reporting'],
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Landmark,
    description: 'Audit-ready ESG disclosure, third-party risk management, and controlled spend for banks, insurers, and funds.',
    focus: ['Audit-ready ESG disclosure', 'Third-party risk management', 'Controlled spend'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    description: 'Resilient medical supply chains, supplier qualification, and carbon tracking across hospitals and health networks.',
    focus: ['Resilient medical supply chains', 'Supplier qualification', 'Carbon tracking'],
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Cpu,
    description: 'Scalable vendor ecosystems, cloud and hardware sourcing, and Scope 3 visibility for fast-growing technology firms.',
    focus: ['Scalable vendor ecosystems', 'Cloud & hardware sourcing', 'Scope 3 visibility'],
  },
  {
    id: 'service-hospitality',
    name: 'Service & Hospitality',
    icon: ConciergeBell,
    description: 'Category management, sustainable sourcing, and local-content compliance for hotels, venues, and service operators.',
    focus: ['Category management', 'Sustainable sourcing', 'Local-content compliance'],
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    icon: Building2,
    description: 'Transparent tendering, DoA compliance, and annual procurement planning for ministries, authorities, and agencies.',
    focus: ['Transparent tendering', 'DoA compliance', 'Annual procurement planning'],
  },
  {
    id: 'construction-real-estate',
    name: 'Construction & Real Estate',
    icon: HardHat,
    description: 'Giga-project supply chains, contractor performance, and embodied-carbon tracking from tender to handover.',
    focus: ['Giga-project supply chains', 'Contractor performance', 'Embodied-carbon tracking'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    icon: Factory,
    description: 'Supplier risk, sustainable materials sourcing, and ERP-integrated procurement for industrial operations.',
    focus: ['Supplier risk management', 'Sustainable materials sourcing', 'ERP-integrated procurement'],
  },
  {
    id: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    icon: Truck,
    description: 'Carrier and 3PL governance, freight emissions reporting, and resilient sourcing for logistics operators and distributors.',
    focus: ['Carrier & 3PL governance', 'Freight emissions reporting', 'Resilient sourcing'],
  },
];
