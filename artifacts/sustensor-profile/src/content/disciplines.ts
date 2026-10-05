import type { Discipline } from './types';

export const disciplines: Discipline[] = [
  {
    id: 'procurement',
    number: '01',
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
    number: '02',
    title: 'SaaS Solutions',
    logic: 'Legacy software creates operational friction and slows down fast-scaling organisations.',
    solution:
      'Scalable, hyper-localised Vendor Management, Procurement and Contract governance SaaS applications designed for rapid deployment and ERP (Oracle/SAP) integration or Standalone functionality, built to comply with your Policy & DoA and regulatory requirements.',
    capabilities: [
      'Vendor Management Portal',
      'e-Procurement & P2P Suite',
      'Contract ESG Tracking',
      'Annual Procurement Planning (APP)',
      'Oracle / SAP Connectors',
    ],
  },
  {
    id: 'technology',
    number: '03',
    title: 'Technology',
    menuGroup: 'Technology',
    logic:
      'Fragmented systems and reactive reporting are critical liabilities that cannot keep pace with the aggressive scale of Saudi Vision 2030.',
    solution:
      'We architect the digital backbone for modern business operations. By enabling AI-driven applications with custom, user-centric UX/UI design, we seamlessly integrate complex ERPs and cloud data platforms to scale up and accelerate organisational maturity.',
    capabilities: [
      'ERP Implementation',
      'Cloud & Data Platforms',
      'AI Apps Development',
      'Business Intelligence & Dashboards',
      'AI & Predictive Analytics',
      'Process Orchestration',
      'Intelligent Process Automation',
      'Enterprise UX Design',
    ],
  },
];
