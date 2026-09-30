import type { Discipline } from './types';

export const disciplines: Discipline[] = [
  {
    id: 'sustainability-esg',
    number: '01',
    title: 'Sustainability & ESG',
    menuGroup: 'Sustainability',
    logic:
      'Vague net-zero promises trigger greenwashing accusations and compliance penalties under modern corporate governance.',
    solution:
      'We deploy verifiable carbon accounting frameworks that turn ESG mandates into concrete, auditable data points that stand up to institutional scrutiny.',
    capabilities: [
      'Corporate Sustainability',
      'Sustainability Reporting',
      'ESG Governance',
      'Scope 3 & Carbon Accounting',
    ],
  },
  {
    id: 'procurement',
    number: '02',
    title: 'Procurement',
    menuGroup: 'Procurement',
    logic: 'Fragmented procurement lifecycles degrade commercial value and introduce severe governance risks.',
    solution:
      'Our solution maps the 5 core dimensions of the CIPS Framework (Leadership & Organisation, Strategy & Policy, People, Processes & Systems and Performance Management) to deliver full operational revamp. We build robust vendor management and procurement systems designed for strict Policy & DoA compliance, Risk management, local-content (LCGPA) compliance, Audit readiness, Operational performance and Sustainability governance & conformance.',
    capabilities: [
      'Procurement Excellence',
      'Risk & Compliance',
      'Supply Chain Risk Mgmt.',
      'Sustainable Sourcing',
      'Category Management',
      'Contract Governance',
    ],
  },
  {
    id: 'saas-solutions',
    number: '03',
    title: 'SaaS Solutions',
    logic:
      'Legacy software creates operational friction and slows down fast-scaling, government-backed ventures.',
    solution:
      'Scalable, hyper-localised Vendor Management, Procurement and Sustainability SaaS applications designed for rapid deployment and ERP (Oracle/SAP) integration or Standalone functionality, built to comply with your Policy & DoA and regulatory requirements.',
    // TODO (PLACEHOLDER): capability list not yet provided; derived from the solution description above.
    capabilities: [
      'Vendor Management Portal',
      'e-Procurement & P2P Suite',
      'Contract & Obligation Tracking',
      'ESG Data & Reporting Platform',
      'Oracle / SAP Connectors',
    ],
  },
  {
    id: 'technology',
    number: '04',
    title: 'Technology',
    menuGroup: 'Technology',
    // TODO (PLACEHOLDER): logic and solution copy rewritten to cover the broader Technology scope; replace when final copy is available.
    logic:
      'Disconnected systems, manual reporting, and reactive decision-making cannot keep pace with Saudi Vision 2030 and modern market competition.',
    solution:
      'We engineer the digital backbone behind procurement and sustainability operations: custom software, ERP integration, cloud data platforms, and decision dashboards, with predictive analytics that future-proof forecasting, asset tracking, and carbon optimisation.',
    capabilities: [
      'Software Engineering',
      'ERP Integration',
      'Cloud Architecture & Data Lakes',
      'UI/UX for Enterprise Tools',
      'Dashboard & Reporting',
      // TODO (PLACEHOLDER): the two items below were added where the brief said "please add".
      'AI & Predictive Analytics',
      'Process Automation',
    ],
  },
];
