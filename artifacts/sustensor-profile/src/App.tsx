import { useCallback, useState } from 'react';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AboutSection } from '@/components/sections/AboutSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { RealityCheckSection } from '@/components/sections/RealityCheckSection';
import { RegionSection } from '@/components/sections/RegionSection';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { TeamsSection } from '@/components/sections/TeamsSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import type { WorkflowRequest } from '@/components/sections/workflow/Orchestrator';
import { VerdictSection } from '@/components/sections/VerdictSection';
import type { NavLink } from '@/content/navigation';
import { sectors } from '@/content/sectors';
import { solutions } from '@/content/solutions';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useSpotlight } from '@/hooks/useSpotlight';

export default function App() {
  const [activeSolutionId, setActiveSolutionId] = useState(solutions[0].id);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [activeSectorId, setActiveSectorId] = useState(sectors[0].id);
  const [workflowRequest, setWorkflowRequest] = useState<WorkflowRequest>();

  useRevealOnScroll();
  useSpotlight();

  const selectSolution = useCallback((id: string) => {
    setShowAllSolutions(false);
    setActiveSolutionId(id);
  }, []);

  const handleNavigate = useCallback(
    ({ action }: NavLink) => {
      if (action?.type === 'solution') {
        // Header links land on the "In motion" demo and footer links on the Solutions tabs; keep both in step.
        selectSolution(action.id);
        setWorkflowRequest((previous) => ({ id: action.id, nonce: (previous?.nonce ?? 0) + 1 }));
      }
      if (action?.type === 'sector') setActiveSectorId(action.id);
    },
    [selectSolution],
  );

  return (
    <div id="site-root" className="min-h-dvh overflow-x-clip bg-canvas text-fg">
      <SiteHeader onNavigate={handleNavigate} />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <RealityCheckSection />
        <WorkflowSection request={workflowRequest} />
        <SolutionsSection
          activeId={activeSolutionId}
          showAll={showAllSolutions}
          onSelect={selectSolution}
          onShowAllChange={setShowAllSolutions}
        />
        <SectorsSection activeId={activeSectorId} onSelect={setActiveSectorId} />
        <CapabilitiesSection />
        {/* <TeamsSection /> */}
        <RegionSection />
        <VerdictSection />
        <PartnersSection />
        {/* <FaqSection /> */}
        <ContactSection />
      </main>

      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
