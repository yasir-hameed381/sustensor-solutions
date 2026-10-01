import { useRef, useState } from 'react';
import { ArrowRight, Menu } from 'lucide-react';

import { primaryNav, type NavLink } from '@/content/navigation';
import { SECTION_IDS } from '@/content/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

import { BrandMark } from '../shared/BrandMark';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

const sectionIds = primaryNav.map((item) => item.sectionHref.slice(1));

export function SiteHeader({ onNavigate }: { onNavigate: (link: NavLink) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled();
  const activeId = useActiveSection(sectionIds);

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  const followFromMobile = (link: NavLink) => {
    setMobileOpen(false);
    onNavigate(link);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-(--z-header) border-b transition-shadow duration-(--duration-base) ease-out-soft',
          'border-hairline bg-surface/95 backdrop-blur-xl backdrop-saturate-150',
          scrolled ? 'shadow-sm' : 'shadow-none',
        )}
      >
        <a
          href="#main"
          className="sr-only rounded-full bg-ink-900 px-4 py-2 text-small font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <Container className="flex h-header items-center justify-between gap-6">
          <a href="#top" aria-label="Sustensor Solutions, back to top" className="flex min-h-11 items-center rounded-sm">
            <BrandMark inverse={false} />
          </a>

          <DesktopNav activeHref={activeId ? `#${activeId}` : null} onNavigate={onNavigate} />

          <div className="flex items-center gap-2">
            <ButtonLink
              href={`#${SECTION_IDS.contact}`}
              variant="primary"
              size="sm"
              icon={ArrowRight}
              className="hidden sm:inline-flex"
            >
              Book a consultation
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-11 items-center justify-center rounded-full border border-hairline-strong bg-surface text-fg hover:bg-tint xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </Container>
        <span
          aria-hidden="true"
          className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-accent-600 via-accent-500 to-brand-500"
        />
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the drawer's containing block. */}
    {mobileOpen && <MobileNav onClose={closeMobile} onFollow={followFromMobile} />}
    </>
  );
}
