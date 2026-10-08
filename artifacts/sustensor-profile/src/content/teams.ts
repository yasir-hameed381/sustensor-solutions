import { Cpu, Landmark, Leaf, ShoppingCart, type LucideIcon } from 'lucide-react';

/**
 * "Built for every team": the question each stakeholder asks, and how Sustensor answers it (idea from procure-verse's
 * stakeholder-fit section, styled like compliverse's audience cards). Answers only restate capabilities shown
 * elsewhere on the site. TODO (DRAFT): confirm wording with the client.
 */
export const teams: { team: string; icon: LucideIcon; tone: 'accent' | 'brand'; question: string; answer: string; outcome: string }[] = [
  {
    team: 'Procurement',
    icon: ShoppingCart,
    tone: 'accent',
    question: 'Will this cut manual work?',
    answer: 'Requisitions, sourcing, approvals and vendor follow-up run in one workflow, with DoA routing built in.',
    outcome: 'Less re-keying between request, PO and invoice.',
  },
  {
    team: 'Finance',
    icon: Landmark,
    tone: 'brand',
    question: 'Will controls stay visible?',
    answer: 'Budget checks, 3-way matching and the approval history stay attached to every purchase.',
    outcome: 'Audit-ready records without month-end chasing.',
  },
  {
    team: 'Sustainability & ESG',
    icon: Leaf,
    tone: 'accent',
    question: 'Can we prove supplier ESG claims?',
    answer: 'ESG clauses, KPIs and evidence are tracked inside contracts, not in separate spreadsheets.',
    outcome: 'Scope 3 data you can defend to auditors.',
  },
  {
    team: 'IT',
    icon: Cpu,
    tone: 'brand',
    question: 'Does it fit our ERP?',
    answer: 'Connectors for SAP S/4HANA, Oracle Cloud ERP and Microsoft Dynamics 365, or run standalone.',
    outcome: 'No rip-and-replace of existing systems.',
  },
];
