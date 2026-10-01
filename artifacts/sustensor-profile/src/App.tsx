import { useCallback, useRef, useState } from 'react';

import { BusinessCardModal } from '@/components/business-card/BusinessCardModal';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ExecutivePdfDocument } from '@/components/pdf/ExecutivePdfDocument';
import { AboutSection } from '@/components/sections/AboutSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { RealityCheckSection } from '@/components/sections/RealityCheckSection';
import { RegionSection } from '@/components/sections/RegionSection';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { VerdictSection } from '@/components/sections/VerdictSection';
import { StatusToast } from '@/components/shared/StatusToast';
import { company } from '@/content/company';
import type { NavLink } from '@/content/navigation';
import { solutions } from '@/content/solutions';
import { usePdfExport } from '@/hooks/usePdfExport';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useSpotlight } from '@/hooks/useSpotlight';

export default function App() {
  const [activeSolutionId, setActiveSolutionId] = useState(solutions[0].id);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [businessCardOpen, setBusinessCardOpen] = useState(false);
  const pdfSourceRef = useRef<HTMLDivElement>(null);
  const { status: pdfStatus, exportPdf } = usePdfExport(pdfSourceRef, company.pdfFileName);
  const pdfBusy = pdfStatus === 'working';

  useRevealOnScroll();
  useSpotlight();

  const selectSolution = useCallback((id: string) => {
    setShowAllSolutions(false);
    setActiveSolutionId(id);
  }, []);

  const handleNavigate = useCallback(
    ({ action }: NavLink) => {
      if (action?.type === 'solution') selectSolution(action.id);
    },
    [selectSolution],
  );

  return (
    <>
      <div id="site-root" className="min-h-dvh overflow-x-clip bg-canvas text-fg">
        <SiteHeader onNavigate={handleNavigate} />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <HeroSection />
          <AboutSection />
          <RealityCheckSection />
          <WorkflowSection />
          <SolutionsSection
            activeId={activeSolutionId}
            showAll={showAllSolutions}
            onSelect={selectSolution}
            onShowAllChange={setShowAllSolutions}
          />
          <SectorsSection />
          <CapabilitiesSection />
          <RegionSection />
          <VerdictSection pdfBusy={pdfBusy} onDownloadProfile={exportPdf} />
          <TeamSection />
          <ContactSection pdfBusy={pdfBusy} onDownloadProfile={exportPdf} onOpenBusinessCard={() => setBusinessCardOpen(true)} />
        </main>

        <SiteFooter onNavigate={handleNavigate} />

        <BusinessCardModal isOpen={businessCardOpen} onClose={() => setBusinessCardOpen(false)} />

        {pdfStatus === 'done' && <StatusToast tone="success" message="Profile PDF downloaded" />}
        {pdfStatus === 'error' && <StatusToast tone="error" message="Couldn’t create the PDF. Please try again." />}
      </div>

      <ExecutivePdfDocument ref={pdfSourceRef} />
    </>
  );
}
