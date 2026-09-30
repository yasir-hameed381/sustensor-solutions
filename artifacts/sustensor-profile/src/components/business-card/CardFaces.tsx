import { Mail, MapPin, Phone, QrCode } from 'lucide-react';

import { company } from '@/content/company';
import { cn } from '@/lib/utils';

export type CardEdition = 'dark' | 'light';

export interface CardDetails {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  tagline: string;
}

/** Card faces are designed at a fixed 460x263px (3.5in x 2in ratio) and scaled by their container. */
export const CARD_WIDTH = 460;
export const CARD_HEIGHT = 263;

const faceBase = 'relative flex select-none flex-col justify-between overflow-hidden border';

const faceTheme = (isDark: boolean) =>
  isDark
    ? 'border-[#2a5b50] bg-linear-to-br from-[#0c1c20] via-forest to-abyss text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(217,182,109,0.2)]'
    : 'border-[#c5d8cc] bg-linear-to-br from-white via-cream to-[#eae5d8] text-forest shadow-[0_20px_40px_-15px_rgba(23,52,58,0.25),inset_0_0_0_1px_rgba(39,131,98,0.2)]';

export function CardFront({ edition, tagline }: { edition: CardEdition; tagline: string }) {
  const isDark = edition === 'dark';
  const accent = isDark ? 'text-gold' : 'text-emerald';
  const tick = isDark ? 'border-gold/80' : 'border-emerald/80';

  return (
    <div className={cn(faceBase, faceTheme(isDark), 'p-6')} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      <span aria-hidden="true" className={cn('absolute left-2.5 top-2.5 h-3 w-3 border-l-2 border-t-2', tick)} />
      <span aria-hidden="true" className={cn('absolute right-2.5 top-2.5 h-3 w-3 border-r-2 border-t-2', tick)} />
      <span aria-hidden="true" className={cn('absolute bottom-2.5 left-2.5 h-3 w-3 border-b-2 border-l-2', tick)} />
      <span aria-hidden="true" className={cn('absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2', tick)} />
      <span aria-hidden="true" className="display pointer-events-none absolute bottom-2 right-4 text-7xl font-bold uppercase tracking-tighter opacity-5">
        {company.shortName}
      </span>

      <div className="relative flex items-center justify-between">
        <span className={cn('mono text-[9px] font-semibold tracking-[0.25em]', accent)}>Executive Advisory</span>
        <span
          className={cn(
            'mono border px-1.5 py-0.5 text-[9px] font-bold tracking-[0.2em]',
            isDark ? 'border-[#2a5b50] bg-[#0c1c20]/60 text-mint' : 'border-[#b5cebf] bg-white/70 text-forest',
          )}
        >
          KSA • GCC
        </span>
      </div>

      <div className="relative my-auto flex flex-col items-center">
        <img src={isDark ? company.logo.onDark : company.logo.onLight} alt="" className="mb-2 h-14 w-auto object-contain" />
        <div className="mt-1 flex items-center gap-2">
          <span className={cn('h-px w-8', isDark ? 'bg-gold/60' : 'bg-emerald/60')} />
          <span className={cn('mono text-[9.5px] font-bold tracking-[0.22em]', isDark ? 'text-white' : 'text-forest')}>{company.name}</span>
          <span className={cn('h-px w-8', isDark ? 'bg-gold/60' : 'bg-emerald/60')} />
        </div>
      </div>

      <p
        className={cn(
          'mono relative border-t border-dashed pt-2.5 text-center text-[9px] font-semibold tracking-wider',
          isDark ? 'border-mint/30 text-mint' : 'border-emerald/30 text-emerald',
        )}
      >
        {tagline}
      </p>
    </div>
  );
}

export function CardBack({ edition, details, qrSvg }: { edition: CardEdition; details: CardDetails; qrSvg: string }) {
  const isDark = edition === 'dark';
  const accent = isDark ? 'text-gold' : 'text-emerald';
  const icon = cn('h-3 w-3 shrink-0', isDark ? 'text-mint' : 'text-emerald');
  const rule = isDark ? 'border-white/20' : 'border-forest/20';

  return (
    <div className={cn(faceBase, faceTheme(isDark), 'p-6')} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      <div className={cn('flex items-center justify-between border-b pb-2', rule)}>
        <div className="flex items-center gap-2">
          <img src={isDark ? company.logo.onDark : company.logo.onLight} alt="" className="h-5 w-auto object-contain" />
          <span className="display text-xs font-bold uppercase tracking-tight">{company.name}</span>
        </div>
        <span
          className={cn(
            'mono border px-1.5 py-0.5 text-[8.5px] font-bold',
            isDark ? 'border-[#2a5b50] bg-[#0c1c20] text-gold' : 'border-[#b5cebf] bg-white text-emerald',
          )}
        >
          {details.location}
        </span>
      </div>

      <div className="my-auto grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <p className="display text-base font-bold uppercase leading-tight tracking-tight">{details.name}</p>
            <p className={cn('mono text-[9.5px] font-semibold tracking-wide', accent)}>{details.title}</p>
          </div>
          <span className={cn('h-px w-full bg-linear-to-r to-transparent', isDark ? 'from-gold/60' : 'from-emerald/60')} />
          <ul className="flex flex-col gap-1 text-[10px]">
            <li className="flex items-center gap-2">
              <Phone aria-hidden="true" className={icon} />
              <span className="font-semibold tracking-wide">{details.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" className={icon} />
              <span className="mono text-[9px] tracking-tight opacity-90">{details.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className={icon} />
              <span className="opacity-80">{company.locationLong}</span>
            </li>
          </ul>
        </div>

        <div className={cn('flex flex-col items-center border-l pl-2', rule)}>
          <div className={cn('rounded-sm border p-1.5 shadow-inner', isDark ? 'border-emerald/50 bg-[#0a181b]' : 'border-line-green bg-white')}>
            {qrSvg ? (
              <div
                className="flex h-18 w-18 items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                // Generated locally by the `qrcode` library from a fixed WhatsApp URL.
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <QrCode aria-hidden="true" className="h-18 w-18 text-gold" />
            )}
          </div>
          <span className={cn('mono mt-1 text-[7px] font-bold tracking-widest', accent)}>Direct WhatsApp</span>
        </div>
      </div>

      <div
        className={cn(
          'mono flex items-center justify-between border-t pt-2 text-[7.5px] font-semibold tracking-wider',
          rule,
          isDark ? 'text-mint' : 'text-emerald',
        )}
      >
        <span>Scope 3 GHG • CIPS Procurement</span>
        <span>Corporate Advisory Desk</span>
      </div>
    </div>
  );
}
