/**
 * Sample figures for the hero "operating view", which cycles through the client's dashboard examples
 * (onboarding, compliance, supplier performance, spend taxonomy). Adapted for Saudi Arabia (ZATCA, CR, IBAN, SAR)
 * and kept consistent: the onboarding SLA is 5 days and the category averages below average 6 days.
 */

export interface Kpi {
  label: string;
  value: string;
  unit?: string;
  badge: string;
}

/** Shown above every view. */
export const kpis: Kpi[] = [
  { label: 'First-pass rate', value: '60%', badge: '−6.2% YoY' },
  { label: 'Audit-ready', value: '40%', badge: 'ZATCA · CR · IBAN' },
  { label: 'Onboarding cycle', value: '6', unit: 'days', badge: 'Target: 5d' },
  { label: 'Under contract', value: '97.5%', badge: '+6 pts YoY' },
];

/* ---------- Onboarding ---------- */

export const firstPass = {
  approved: 60,
  zeroRework: 3,
  revisions: 2,
  rootCauses: 'Insurance limits below the SAR 7.5M minimum; missing bank IBAN letters.',
};

export const onboardingSlaDays = 5;

/** Average days to register, vet and approve a vendor, by category (averages 6). `short` labels the chart. */
export const onboardingByCategory: { category: string; short: string; days: number }[] = [
  { category: 'IT', short: 'IT', days: 9 },
  { category: 'Logistics', short: 'Logistics', days: 4 },
  { category: 'Manufacturing', short: 'Mfg.', days: 8 },
  { category: 'Healthcare', short: 'Health', days: 2 },
  { category: 'Hardware', short: 'Hardware', days: 7 },
];

/* ---------- Compliance ---------- */

export const complianceChecks: { label: string; percent: number }[] = [
  { label: 'ZATCA VAT', percent: 80 },
  { label: 'Bank IBAN', percent: 80 },
  { label: 'Insurance (SAR 7.5M)', percent: 60 },
  { label: 'Commercial Reg.', percent: 80 },
];

export const auditOutlook = {
  score: 40,
  cleared: 2,
  total: 5,
  note: 'Zero critical tax or banking discrepancies.',
};

/* ---------- Supplier performance ---------- */

/** Radar axes, clockwise from the top; values out of 100. */
export const performanceLevers: { axis: string; actual: number; benchmark: number }[] = [
  { axis: 'Delivery', actual: 96, benchmark: 90 },
  { axis: 'Quality', actual: 98, benchmark: 92 },
  { axis: 'Contract SLA', actual: 92, benchmark: 88 },
  { axis: 'Docs', actual: 45, benchmark: 85 },
  { axis: 'ESG', actual: 85, benchmark: 80 },
  { axis: 'Innovation', actual: 72, benchmark: 78 },
];

export const coreLevers: { label: string; value: string; percent?: number }[] = [
  { label: 'On-time delivery', value: '95.6%', percent: 95.6 },
  { label: 'Quality acceptance', value: '97.5%', percent: 97.5 },
  { label: 'ESG index', value: '85/100', percent: 85 },
  { label: 'Cost variance', value: '0%' },
];

/* ---------- Spend taxonomy ---------- */

export const spendTaxonomy: { category: string; vendors: number }[] = [
  { category: 'IT & Cloud Software', vendors: 1 },
  { category: 'Logistics & Supply Chain', vendors: 1 },
  { category: 'Manufacturing & Equipment', vendors: 1 },
  { category: 'Healthcare & Medical', vendors: 1 },
  { category: 'Hardware & Networking', vendors: 1 },
];
