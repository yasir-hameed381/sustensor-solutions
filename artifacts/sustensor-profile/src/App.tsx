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
import { VerdictSection } from '@/components/sections/VerdictSection';
import { StatusToast } from '@/components/shared/StatusToast';
import { company } from '@/content/company';
import { disciplines } from '@/content/disciplines';
import type { NavLink } from '@/content/navigation';
import { solutions } from '@/content/solutions';
import { usePdfExport } from '@/hooks/usePdfExport';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function App() {
  const [activeSolutionId, setActiveSolutionId] = useState(solutions[0].id);
  const [openDisciplineId, setOpenDisciplineId] = useState<string | null>(disciplines[0].id);
  const [businessCardOpen, setBusinessCardOpen] = useState(false);
  const pdfSourceRef = useRef<HTMLDivElement>(null);
  const { status: pdfStatus, exportPdf } = usePdfExport(pdfSourceRef, company.pdfFileName);

  useRevealOnScroll();

  const handleNavigate = useCallback(({ action }: NavLink) => {
    if (action?.type === 'solution') setActiveSolutionId(action.id);
    if (action?.type === 'discipline') setOpenDisciplineId(action.id);
  }, []);

  return (
    <>
      <div id="site-root" className="grain min-h-dvh overflow-x-hidden bg-cream text-forest">
        <SiteHeader onNavigate={handleNavigate} />

        <main className="pt-[72px]">
          <HeroSection />
          <AboutSection number="01" />
          <RealityCheckSection number="02" />
          <SolutionsSection number="03" activeId={activeSolutionId} onActiveChange={setActiveSolutionId} />
          <SectorsSection number="04" />
          <CapabilitiesSection number="05" openId={openDisciplineId} onOpenChange={setOpenDisciplineId} />
          <RegionSection number="06" />
          <VerdictSection number="07" />
          <TeamSection number="08" />
          <ContactSection
            number="09"
            pdfBusy={pdfStatus === 'working'}
            onDownloadProfile={exportPdf}
            onOpenBusinessCard={() => setBusinessCardOpen(true)}
          />
        </main>

        <SiteFooter />

        <BusinessCardModal isOpen={businessCardOpen} onClose={() => setBusinessCardOpen(false)} />

        {pdfStatus === 'done' && <StatusToast tone="success" message="Profile PDF downloaded" />}
        {pdfStatus === 'error' && <StatusToast tone="error" message="Couldn’t create the PDF. Please try again." />}
      </div>

      <ExecutivePdfDocument ref={pdfSourceRef} />
    </>
  );
}
