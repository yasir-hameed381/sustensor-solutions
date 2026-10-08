import { ArrowRight, CheckCircle2, CircleCheck, LoaderCircle, PlugZap } from 'lucide-react';

import { useInView, useStepLoop } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

/*
 * Small looping UI previews on the Capabilities cards (idea from compliverse.ai's module cards), so each discipline
 * shows what it does at a glance. Decorative: the card text says the same thing, so these are hidden from screen
 * readers. They loop only while on screen; with reduced motion they show their finished state.
 */

const STEP_MS = 900;

export function DisciplinePreview({ id, inverse }: { id: string; inverse: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'mt-5 flex h-36 flex-col justify-center rounded-xl border p-3.5',
        inverse ? 'border-hairline-inverse bg-white/4' : 'border-hairline bg-canvas',
      )}
    >
      {id === 'procurement' && <ApprovalChain active={inView} />}
      {id === 'saas-solutions' && <VendorList active={inView} />}
      {id === 'technology' && <SystemSync active={inView} />}
    </div>
  );
}

/** Procurement (dark card): a request moves through DoA approval to a PO, then passes the policy check. */
function ApprovalChain({ active }: { active: boolean }) {
  const steps = ['Request', 'DoA approval', 'PO issued'];
  const step = useStepLoop(6, active, STEP_MS, 4);
  return (
    <>
      <div className="flex items-center gap-1.5">
        {steps.map((label, index) => {
          const on = step >= index;
          return (
            <span key={label} className="flex min-w-0 flex-1 items-center gap-1.5">
              {index > 0 && <ArrowRight className={cn('size-3 shrink-0 transition-colors duration-500', on ? 'text-accent-300' : 'text-white/25')} />}
              <span
                className={cn(
                  'flex-1 rounded-md border px-1.5 py-1.5 text-center text-micro font-semibold leading-tight transition-colors duration-500',
                  on ? 'border-accent-400/60 bg-accent-500/20 text-fg-inverse' : 'border-hairline-inverse text-fg-inverse-subtle',
                )}
              >
                {label}
              </span>
            </span>
          );
        })}
      </div>
      <span
        className={cn(
          'mt-3 inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-micro font-semibold transition-[opacity,transform] duration-500 ease-out-soft',
          'border-accent-400/40 bg-accent-500/15 text-accent-300',
          step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        )}
      >
        <CheckCircle2 className="size-3.5" />
        Policy &amp; DoA compliant
      </span>
    </>
  );
}

/** SaaS: vendors are screened in turn and each gets a risk rating (always shown with its label, never colour alone). */
function VendorList({ active }: { active: boolean }) {
  const vendors = [
    { name: 'Vendor A', check: 'KYC verified', risk: 'Low', tone: 'text-accent-800 bg-accent-50 border-accent-100' },
    { name: 'Vendor B', check: 'Documents pending', risk: 'Medium', tone: 'text-sand-700 bg-sand-300/25 border-sand-300' },
    { name: 'Vendor C', check: 'Insurance expired', risk: 'High', tone: 'text-danger-600 bg-danger-50 border-danger-600/25' },
  ];
  const step = useStepLoop(6, active, STEP_MS, 3);
  return (
    <ul className="space-y-1.5">
      {vendors.map((vendor, index) => {
        const rated = step > index;
        return (
          <li key={vendor.name} className="flex items-center gap-2 rounded-md border border-hairline bg-surface px-2.5 py-1.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-tint text-micro font-semibold text-accent-700">
              {vendor.name.slice(-1)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-micro font-semibold leading-tight text-fg">{vendor.name}</span>
              <span className="block truncate text-micro leading-tight text-fg-subtle">{vendor.check}</span>
            </span>
            <span
              className={cn(
                'shrink-0 rounded-full border px-2 py-0.5 text-micro font-semibold transition-[opacity,transform] duration-500 ease-out-soft',
                vendor.tone,
                rated ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              )}
            >
              {vendor.risk}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Technology: connected systems sync one after another. */
function SystemSync({ active }: { active: boolean }) {
  const systems = ['SAP S/4HANA', 'Oracle Cloud ERP', 'ZATCA Fatoora'];
  const step = useStepLoop(6, active, STEP_MS, 3);
  return (
    <ul className="space-y-1.5">
      {systems.map((system, index) => {
        const synced = step > index;
        const syncing = step === index;
        return (
          <li key={system} className="flex items-center gap-2 rounded-md border border-hairline bg-surface px-2.5 py-2">
            <PlugZap className="size-3.5 shrink-0 text-accent-600" />
            <span className="min-w-0 flex-1 truncate text-micro font-semibold text-fg">{system}</span>
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1 text-micro font-semibold transition-colors duration-300',
                synced ? 'text-accent-700' : 'text-fg-subtle',
              )}
            >
              {synced ? (
                <CircleCheck className="size-3" />
              ) : (
                <LoaderCircle className={cn('size-3', syncing && 'animate-spin')} />
              )}
              {synced ? 'Synced' : syncing ? 'Syncing' : 'Queued'}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
