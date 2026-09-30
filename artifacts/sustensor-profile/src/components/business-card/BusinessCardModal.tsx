import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Printer, RotateCw, SlidersHorizontal, X } from 'lucide-react';

import { company } from '@/content/company';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/utils';

import { CardBack, CardFront, type CardDetails, type CardEdition } from './CardFaces';
import { CardPrintSheet } from './CardPrintSheet';

interface BusinessCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO (PLACEHOLDER): default card holder details; replace with the executive's real name and title.
const DEFAULT_DETAILS: CardDetails = {
  name: 'Executive Leadership',
  title: 'Founder & Managing Director',
  phone: company.phone,
  email: company.email,
  location: company.location,
  tagline: 'Enterprise Governance • CIPS Procurement • Carbon Accounting',
};

const DETAIL_FIELDS: { key: keyof CardDetails; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'phone', label: 'Phone / WhatsApp' },
  { key: 'email', label: 'Email' },
  { key: 'location', label: 'Location' },
  { key: 'tagline', label: 'Front tagline' },
];

type CopyState = 'idle' | 'copied' | 'failed';

export function BusinessCardModal({ isOpen, onClose }: BusinessCardModalProps) {
  if (!isOpen) return null;
  return <BusinessCardDialog onClose={onClose} />;
}

function BusinessCardDialog({ onClose }: { onClose: () => void }) {
  const [edition, setEdition] = useState<CardEdition>('dark');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBothSides, setShowBothSides] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [details, setDetails] = useState<CardDetails>(DEFAULT_DETAILS);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const qrSvg = useWhatsAppQr(edition);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const fieldIdPrefix = useId();

  useEscapeKey(onClose);
  useBodyScrollLock(true);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  const copyWhatsAppLink = async () => {
    try {
      await navigator.clipboard.writeText(company.whatsappUrl);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2000);
  };

  const printCards = () => {
    const root = document.documentElement;
    const cleanUp = () => {
      root.classList.remove('print-business-card');
      window.removeEventListener('afterprint', cleanUp);
    };
    root.classList.add('print-business-card');
    window.addEventListener('afterprint', cleanUp);
    window.print();
  };

  const front = <CardFront edition={edition} tagline={details.tagline} />;
  const back = <CardBack edition={edition} details={details} qrSvg={qrSvg} />;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto flex w-full max-w-4xl flex-col overflow-hidden border border-[#2d5952] bg-abyss text-mist shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#2d5952] bg-[#142e32] px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="display text-lg font-semibold text-white">
              Executive Business Card
            </h2>
            <p className="mt-0.5 text-xs text-mint">3.5 × 2 in · print-ready</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 p-1.5 text-mint transition-colors hover:bg-forest-2 hover:text-white"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-2 bg-[#0d1e22] px-5 py-3 text-xs sm:px-6">
          <div role="group" aria-label="Card style" className="flex border border-[#2d5952] p-0.5">
            {(['dark', 'light'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={edition === option}
                onClick={() => setEdition(option)}
                className={cn(
                  'px-3 py-1.5 font-semibold capitalize transition-colors',
                  edition === option
                    ? option === 'dark'
                      ? 'bg-emerald text-white'
                      : 'bg-mist text-forest'
                    : 'text-mint hover:text-white',
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!showBothSides && (
              <ToolbarButton onClick={() => setIsFlipped((value) => !value)}>
                <RotateCw aria-hidden="true" className="h-3.5 w-3.5" />
                Flip
              </ToolbarButton>
            )}
            <ToolbarButton pressed={showBothSides} onClick={() => setShowBothSides((value) => !value)}>
              Both sides
            </ToolbarButton>
            <ToolbarButton pressed={showEditor} onClick={() => setShowEditor((value) => !value)}>
              <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
              Edit details
            </ToolbarButton>
          </div>
        </div>

        {showEditor && (
          <div className="grid grid-cols-1 gap-4 border-b border-[#2d5952] bg-[#142e32] px-5 py-4 text-xs sm:grid-cols-2 sm:px-6 md:grid-cols-3">
            {DETAIL_FIELDS.map(({ key, label }) => {
              const inputId = `${fieldIdPrefix}-${key}`;
              return (
                <div key={key}>
                  <label htmlFor={inputId} className="mono mb-1 block text-[10px] font-semibold text-mint">
                    {label}
                  </label>
                  <input
                    id={inputId}
                    type="text"
                    value={details[key]}
                    onChange={(event) => setDetails((current) => ({ ...current, [key]: event.target.value }))}
                    className="w-full border border-emerald bg-[#0d1e22] px-2.5 py-1.5 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="relative flex min-h-90 flex-col items-center justify-center overflow-hidden bg-radial from-[#153439] to-[#0a181b] px-4 py-10 sm:min-h-105 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[32px_32px]"
          />

          {showBothSides ? (
            <div className="z-10 flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
              <LabelledFace label="Front">{front}</LabelledFace>
              <LabelledFace label="Back">{back}</LabelledFace>
            </div>
          ) : (
            <div className="z-10 flex flex-col items-center gap-5">
              <button
                type="button"
                className="card-3d-wrapper cursor-pointer text-left"
                onClick={() => setIsFlipped((value) => !value)}
                aria-label={`Flip card to show the ${isFlipped ? 'front' : 'back'}`}
              >
                <div className={cn('card-3d-inner', isFlipped && 'flipped')}>
                  <div className="card-3d-front">
                    <CardScaler>{front}</CardScaler>
                  </div>
                  <div className="card-3d-back">
                    <CardScaler>{back}</CardScaler>
                  </div>
                </div>
              </button>
              <p className="text-xs text-mint/80">Tap the card to see the {isFlipped ? 'front' : 'back'}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#2d5952] bg-[#142e32] px-5 py-4 text-xs sm:px-6">
          <button
            type="button"
            onClick={copyWhatsAppLink}
            className="flex items-center gap-1.5 border border-[#2d5952] px-3 py-2 text-mint transition-colors hover:bg-forest-2 hover:text-white"
          >
            {copyState === 'copied' ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}
            {copyState === 'copied' ? 'Link copied' : copyState === 'failed' ? 'Copy not available' : 'Copy WhatsApp link'}
          </button>
          <button
            type="button"
            onClick={printCards}
            className="flex items-center gap-1.5 bg-gold px-4 py-2 font-bold text-forest transition-colors hover:bg-[#c9a65d]"
          >
            <Printer aria-hidden="true" className="h-3.5 w-3.5" />
            Print cards
          </button>
        </div>
      </div>

      <CardPrintSheet front={front} back={back} />
    </div>
  );
}

function useWhatsAppQr(edition: CardEdition) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(company.whatsappGreetingUrl, {
      type: 'svg',
      margin: 0,
      color: { dark: edition === 'dark' ? '#d9b66d' : '#17343a', light: '#00000000' },
    })
      .then((markup) => !cancelled && setSvg(markup))
      .catch((error: unknown) => console.error('Failed to generate the WhatsApp QR code', error));
    return () => {
      cancelled = true;
    };
  }, [edition]);

  return svg;
}

function ToolbarButton({ pressed, onClick, children }: { pressed?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 border px-3 py-1.5 font-semibold transition-colors',
        pressed ? 'border-gold bg-gold/10 text-gold' : 'border-[#2d5952] text-mint hover:bg-forest-2 hover:text-white',
      )}
    >
      {children}
    </button>
  );
}

/** Shrinks the fixed-size card to 70% below the `sm` breakpoint so it fits phone screens. */
function CardScaler({ children }: { children: ReactNode }) {
  return (
    <div className="h-[184px] w-[322px] sm:h-[263px] sm:w-[460px]">
      <div className="origin-top-left scale-[0.7] sm:scale-100">{children}</div>
    </div>
  );
}

function LabelledFace({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-semibold text-mint">{label}</span>
      <CardScaler>{children}</CardScaler>
    </div>
  );
}
