import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import type { NavLink } from '@/content/navigation';
import { useEscapeKey } from '@/hooks/useEscapeKey';

import { BrandMark } from '../shared/BrandMark';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

interface SiteHeaderProps {
  onNavigate: (link: NavLink) => void;
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  const followFromMobile = (link: NavLink) => {
    setMobileOpen(false);
    onNavigate(link);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-forest/95 text-ivory backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Sustensor Solutions, back to top" onClick={() => setMobileOpen(false)}>
          <BrandMark />
        </a>

        <DesktopNav onNavigate={onNavigate} />

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center border border-teal text-mist lg:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && <MobileNav onFollow={followFromMobile} />}
    </header>
  );
}
