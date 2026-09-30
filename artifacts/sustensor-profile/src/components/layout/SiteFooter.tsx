import { company } from '@/content/company';
import { primaryNav } from '@/content/navigation';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 text-xs text-copy-muted sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-24">
        <div className="flex items-center gap-3">
          <img src={company.logo.onLight} alt="" className="h-9 w-auto object-contain" />
          <div>
            <p className="mono text-[10px] font-bold text-forest">{company.name}</p>
            <p className="mt-0.5 text-[11px]">
              {company.tagline} · {company.location}
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {primaryNav.map((item) => (
              <li key={item.id}>
                <a href={item.sectionHref} className="transition-colors hover:text-emerald">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-1 lg:items-end">
          <a href={company.emailUrl} className="transition-colors hover:text-emerald">
            {company.email}
          </a>
          <a href={company.whatsappUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald">
            {company.phone}
          </a>
          <p className="mt-2 text-[11px]">
            © {year} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
