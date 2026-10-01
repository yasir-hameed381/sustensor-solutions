import type { CSSProperties } from 'react';

import { SECTION_IDS } from '@/content/sections';

import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';
import { Orchestrator } from './workflow/Orchestrator';
import { ApprovalChainCard, IntakeCard } from './workflow/WorkflowCards';

/** Animated, Zip-style showcase of the solutions' real workflows. */
export function WorkflowSection() {
  return (
    <Section id={SECTION_IDS.workflows} labelledBy="workflows-heading" variant="canvas">
      <SectionHeading
        id="workflows-heading"
        eyebrow="In motion"
        title={
          <>
            Every solution, <Accent>orchestrated</Accent> end to end
          </>
        }
        lead="Choose a workflow and watch each step run, from first request to audit-ready evidence."
        align="center"
      />

      <div data-reveal className="mt-12 lg:mt-16">
        <Orchestrator />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8 lg:gap-8">
        <div data-reveal>
          <IntakeCard />
        </div>
        <div data-reveal style={{ '--reveal-index': 1 } as CSSProperties}>
          <ApprovalChainCard />
        </div>
      </div>
    </Section>
  );
}
