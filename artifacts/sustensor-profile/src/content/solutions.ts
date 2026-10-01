import {
  Award,
  CalendarCheck,
  ChartLine,
  ChartNoAxesGantt,
  ChartPie,
  CheckCheck,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Earth,
  FilePenLine,
  Files,
  FolderArchive,
  Gauge,
  Grid3x3,
  Handshake,
  Landmark,
  LayoutDashboard,
  Leaf,
  MapPin,
  Package,
  Receipt,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Telescope,
  TrendingUp,
  UserSearch,
  Wallet,
  Workflow,
} from 'lucide-react';

import type { Solution } from './types';

// TODO (PLACEHOLDER): the `detail` captions on the process steps of solutions 01–04 are draft copy; replace with final wording.
export const solutions: Solution[] = [
  {
    id: 'vendor-management',
    number: '01',
    title: 'Vendor Management',
    menuLabel: 'Vendor Onboarding & Management',
    badge: 'Core Enterprise Lifecycle',
    subtitle: 'Global Procurement & Vendor Solutions',
    summary:
      'Our enterprise equips modern organisations with agile, transparent, and automated vendor management systems. By bridging legacy enterprise resource planning with next-generation artificial intelligence, we eliminate procurement friction, enforce rigorous multi-jurisdiction compliance, and optimise vendor performance in real time.',
    process: [
      { title: 'Vetting & Qualification', detail: 'KYC checks · Supplier pre-qualification', icon: UserSearch, accent: CircleCheck },
      { title: 'Digital Onboarding & Contracting', detail: 'Self-service portal · e-Signature', icon: FilePenLine, accent: Handshake },
      { title: 'Performance & Risk Assessment', detail: 'Scorecards · Risk monitoring', icon: Gauge, accent: ShieldCheck },
      { title: 'Lifecycle Optimisation & Offboarding', detail: 'Renewals · Structured retirement', icon: TrendingUp, accent: FolderArchive },
    ],
    deliverables: [
      {
        area: 'Vendor Onboarding',
        scope: 'Self-service portals, automated KYC verification, and tax document parsing.',
        impact: 'Significantly accelerates onboarding cycles and eliminates administrative backlogs.',
      },
      {
        area: 'Risk Management',
        scope: 'Continuous supplier risk monitoring, automated early warnings, and executive profiling heatmaps.',
        impact: 'Equips leadership with actionable risk intelligence, substantially reducing disruption exposure.',
      },
      {
        area: 'Audit Readiness',
        scope:
          'Automated right-to-audit verification, pre-configured statutory audit dossiers, complete transactional provenance, and local-content (LCGPA) tracking.',
        impact: 'Maximises first-pass audit success and substantially compresses audit response lead times.',
      },
      {
        area: 'Supplier Performance',
        scope: 'Objective tier scorecards, delivery reliability analytics, and renewal alerts.',
        impact: 'Enables data-driven renewals and renegotiations.',
      },
    ],
    pillars: [
      {
        label: 'AI-Native Architecture',
        detail: 'Built from day one to leverage reasoning agents for deep document inspection and invoice reconciliation.',
      },
      {
        label: 'Enterprise Security',
        detail: 'Rigorous role-based access control (RBAC), multi-tenant data segregation, and audit logs.',
      },
      {
        label: 'Fast Deployment',
        detail: 'Cloud-first modular integration designed to plug seamlessly into existing accounting workflows.',
      },
    ],
  },
  {
    id: 'contract-sustainability',
    number: '02',
    title: 'Contract Sustainability Tracking',
    menuLabel: 'Contract Sustainability Tracking',
    badge: 'Scope 3 & Green Governance',
    subtitle: 'Embedding ESG Accountability into Commercial Agreements',
    summary:
      'With the vast majority of corporate carbon footprints embedded within supplier networks, sustainability cannot remain an isolated policy. We transform static ESG pledges into active contractual covenants, continuous green SLA tracking, dual-submission low-carbon tender evaluations, and dynamic supplier incentive frameworks.',
    process: [
      { title: 'Establishing Baseline Criteria', detail: 'ESG clauses · Supplier code of conduct', icon: ClipboardList, accent: Leaf },
      { title: 'Defining Key Sustainability Metrics', detail: 'Emissions · Local content · Labour KPIs', icon: Earth, accent: MapPin },
      { title: 'Real-Time Performance Analytics', detail: 'Live dashboards · Early warnings', icon: LayoutDashboard, accent: ChartLine },
      { title: 'Continuous Improvement & Reporting', detail: 'Corrective actions · Compliance certificates', icon: RefreshCw, accent: Award },
    ],
    deliverables: [
      {
        area: 'Green SLA & ESG Covenants',
        scope:
          'Clause-level tracking of decarbonisation milestones, supplier code of conduct adherence, and automated covenant audits.',
        impact: 'Eliminates supplier greenwashing and enforces rigorous contractual accountability across strategic agreements.',
      },
      {
        area: 'Dual-Submission Low-Carbon Tendering',
        scope:
          'Systematic tender evaluation architecture comparing commercial baseline submissions against audited low-carbon and circular alternatives.',
        impact: 'Drives substantial Scope 3 carbon intensity reductions at contract award stage.',
      },
      {
        area: 'Performance-Linked Incentive Models',
        scope:
          'Contractual rebate, bonus, and penalty mechanisms tied to verified emissions milestones, renewable energy thresholds, and CBAM exposure.',
        impact: 'Accelerates supplier decarbonisation velocity compared to voluntary targets.',
      },
      {
        area: 'Supply Chain Traceability & Due Diligence',
        scope:
          'Algorithmic sub-tier supplier mapping ensuring full compliance with CSDDD, local content mandates (LCGPA), and ethical labour standards.',
        impact: 'Eliminates third-party compliance liabilities with continuous audit-ready data verification.',
      },
    ],
    pillars: [
      {
        label: 'Horizontal ESG Governance',
        detail: 'Treats sustainability as an enterprise-wide commercial operating layer rather than an isolated silo.',
      },
      {
        label: 'Pragmatic Milestone Tracking',
        detail: 'Delivers measurable supplier progress with actionable data benchmarks across multi-tier networks.',
      },
      {
        label: 'Regulatory Defensibility',
        detail: 'Automated audit documentation protecting boards from greenwashing penalties and regulatory scrutiny.',
      },
    ],
  },
  {
    id: 'procure-to-pay',
    number: '03',
    title: 'Procure-to-Pay (P2P) Automation',
    menuLabel: 'Procure-to-Pay (P2P) Automation',
    badge: 'Closed-Loop Cloud Platform',
    subtitle: 'Source-to-Pay (S2P) Automation & Enterprise Category Intelligence',
    summary:
      'Built by procurement practitioners for commercial leadership, our cloud-native operations suite replaces manual approvals and fragmented legacy tools with a seamless, automated workflow spanning requisition, category management, DoA compliance, and bidirectional ERP synchronisation.',
    process: [
      { title: 'Request for Proposal & Bidding', detail: 'e-Sourcing · Bid evaluation', icon: Files, accent: Telescope },
      { title: 'Requisition & Approval Workflow', detail: 'DoA routing · Budget checks', icon: FilePenLine, accent: CheckCheck },
      { title: 'Purchase Order Management', detail: 'PO issue · Goods receipt', icon: ClipboardCheck, accent: Package },
      { title: 'Invoicing & Payment Settlement', detail: '3-way match · Payment release', icon: Receipt, accent: Landmark },
    ],
    deliverables: [
      {
        area: 'Autonomous Source-to-Pay (S2P)',
        scope:
          'Guided requisitioning, digital RFx e-sourcing, reverse auctioning, catalogue management, and automated order dispatch.',
        impact: 'Dramatically compresses operational cycle times across all procurement events.',
      },
      {
        area: 'AI Spend Intelligence & Category Workbench',
        scope:
          'Autonomous taxonomy categorisation of unstructured accounts payable data, supplier consolidation, and tail-spend mining.',
        impact: 'Unlocks substantial addressable cost savings through consolidated volume and eliminated rogue spend.',
      },
      {
        area: 'Delegation of Authority (DoA) Automation',
        scope:
          'Dynamic multi-tier approval matrix engine enforcing local financial controls, threshold limits, and segregation of duties (SoD).',
        impact: 'Enforces rigorous policy adherence, eliminating unauthorised budget leakage and audit infractions.',
      },
      {
        area: 'Bidirectional ERP Connectors',
        scope: 'Pre-configured, real-time connectors and webhooks for SAP S/4HANA, Oracle Cloud ERP, and Microsoft Dynamics 365.',
        impact: 'Slashes integration lead times from months to weeks with bi-directional master data integrity.',
      },
    ],
    pillars: [
      {
        label: 'Closed-Loop Lifecycle',
        detail: 'Connects upfront category strategy directly to day-to-day transactional purchasing and settlement.',
      },
      {
        label: 'Practitioner-Grade Toolkits',
        detail: 'Embedded industry-tested RFP templates, evaluation criteria, and contract templates.',
      },
      {
        label: 'Scalable Cloud Architecture',
        detail: 'Microservices-based deployment supporting multi-subsidiary and holding company structures.',
      },
    ],
  },
  // TODO (PLACEHOLDER): summary, deliverables, and pillars below are drafted from the APP process diagram; replace with final copy.
  {
    id: 'annual-procurement-planning',
    number: '04',
    title: 'Annual Procurement Planning (APP)',
    menuLabel: 'Annual Procurement Planning',
    badge: 'Budget-Aligned Planning Cycle',
    subtitle: 'Demand Forecasting, Sourcing Strategy & Approved Procurement Plans',
    summary:
      'We turn next year’s demand into an approved, budget-aligned procurement plan. Historical spend and demand data, supplier market research, and a structured sourcing design come together in a single plan, reviewed for risk and signed off before the financial year begins.',
    process: [
      { title: 'Demand Forecasting', detail: 'Historical data analysis · Budget alignment', icon: TrendingUp, accent: Telescope },
      { title: 'Supplier Market Research', detail: 'Supplier market study · Sourcing strategy', icon: ScanSearch, accent: Earth },
      { title: 'Strategic Sourcing Design', detail: 'RFx route selection · Contract timeline planning', icon: Workflow, accent: CalendarCheck },
      { title: 'Plan Formulation & Review', detail: 'Risk mitigation plans · Final plan approval', icon: ClipboardCheck, accent: ChartPie },
    ],
    outputs: [
      { label: 'Approved APP Document', icon: Award },
      { label: 'Budget Allocation', icon: Wallet },
      { label: 'Strategic Sourcing Roadmap', icon: ChartNoAxesGantt },
      { label: 'Risk Assessment Matrix', icon: Grid3x3 },
    ],
    deliverables: [
      {
        area: 'Demand Forecasting',
        scope:
          'Historical spend and consumption analysis, stakeholder demand collection, and forecast alignment with the approved budget.',
        impact: 'Plans are built on evidence rather than last year’s list, reducing emergency and unplanned purchases.',
      },
      {
        area: 'Supplier Market Research',
        scope: 'Supply market analysis, local-content (LCGPA) availability checks, and category-level sourcing strategies.',
        impact: 'Sourcing routes reflect real market capacity, pricing trends, and local-content obligations.',
      },
      {
        area: 'Strategic Sourcing Design',
        scope: 'Package and lot structuring, RFx route selection, and contract timeline planning across the financial year.',
        impact: 'Tender workload is spread evenly and critical contracts are awarded before they are needed.',
      },
      {
        area: 'Plan Formulation & Approval',
        scope: 'Consolidated APP document, budget allocation by category, risk assessment matrix, and DoA-based sign-off.',
        impact: 'A single approved plan that finance, procurement, and leadership can track and audit against.',
      },
    ],
    pillars: [
      {
        label: 'Budget Alignment',
        detail: 'Every planned purchase is linked to an approved budget line before sourcing begins.',
      },
      {
        label: 'Risk-Aware Roadmap',
        detail: 'Supply risks and mitigation actions are identified at planning stage, not during delivery.',
      },
      {
        label: 'Governance Ready',
        detail: 'Structured approval and documentation aligned with Policy, DoA, and audit requirements.',
      },
    ],
  },
];

/** Order of items in the header's Solutions menu (as specified in the revision brief). */
export const solutionMenuOrder = [
  'contract-sustainability',
  'vendor-management',
  'procure-to-pay',
  'annual-procurement-planning',
] as const;
