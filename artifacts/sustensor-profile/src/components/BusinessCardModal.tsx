import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  RotateCw,
  Printer,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  QrCode,
  Sliders,
  Check,
  Copy,
} from 'lucide-react';

interface BusinessCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CardEdition = 'dark' | 'light';

export function BusinessCardModal({ isOpen, onClose }: BusinessCardModalProps) {
  const [edition, setEdition] = useState<CardEdition>('dark');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSideBySide, setShowSideBySide] = useState(false);
  const [showPersonalizer, setShowPersonalizer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editable Card Data
  const [name, setName] = useState('Executive Leadership');
  const [title, setTitle] = useState('Founder & Managing Director');
  const [phone, setPhone] = useState('+966 57 078 6381');
  const [email, setEmail] = useState('sustensor.solutions@gmail.com');
  const [location, setLocation] = useState('Riyadh, KSA');
  const [tagline, setTagline] = useState('Enterprise Governance • CIPS Procurement • Carbon Accounting');

  // Vector QR SVG string
  const [qrSvg, setQrSvg] = useState<string>('');

  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrData = `https://wa.me/966570786381?text=${encodeURIComponent(
      `Hello Sustensor Solutions, connecting regarding Corporate Advisory & Sustainability Services.`
    )}`;

    const darkColor = edition === 'dark' ? '#d9b66d' : '#17343a';
    const bgColor = edition === 'dark' ? '#0d1e2200' : '#ffffff00';

    QRCode.toString(
      qrData,
      {
        type: 'svg',
        margin: 0,
        color: {
          dark: darkColor,
          light: bgColor,
        },
      },
      (err, svg) => {
        if (!err && svg) {
          setQrSvg(svg);
        }
      }
    );
  }, [edition]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://wa.me/966570786381');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f2428] border border-[#2d5952] shadow-2xl overflow-hidden my-auto flex flex-col text-[#e6eee8]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2d5952] px-6 py-4 bg-[#142e32]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#278362]/20 border border-[#278362] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#d9b66d]" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white uppercase flex items-center gap-2">
                Sustensor Solutions • Executive Business Card
              </h2>
              <p className="mono text-[11px] text-[#a9d1b5] tracking-wide">
                Commercial Specification: 3.5&quot; × 2.0&quot; (88.9mm × 50.8mm) • Vector Print Ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#278362] hover:bg-[#1f6b50] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Print Business Cards"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Specimen</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#a9d1b5] hover:text-white hover:bg-[#204449] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#0d1e22] border-b border-[#204449] text-xs">
          {/* Edition Toggle */}
          <div className="flex items-center gap-1.5 bg-[#17343a] p-1 border border-[#278362]/40">
            <span className="mono text-[10px] text-[#a9d1b5] uppercase px-2 font-semibold">Edition:</span>
            <button
              onClick={() => setEdition('dark')}
              className={`px-3 py-1 font-semibold transition-all ${edition === 'dark'
                  ? 'bg-[#278362] text-white shadow'
                  : 'text-[#a9d1b5] hover:text-white'
                }`}
            >
              Dark Obsidian &amp; Gold
            </button>
            <button
              onClick={() => setEdition('light')}
              className={`px-3 py-1 font-semibold transition-all ${edition === 'light'
                  ? 'bg-[#e6eee8] text-[#17343a] shadow'
                  : 'text-[#a9d1b5] hover:text-white'
                }`}
            >
              Alabaster Sand &amp; Forest
            </button>
          </div>

          {/* View Mode & Flip */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSideBySide(!showSideBySide)}
              className={`px-3 py-1.5 border font-semibold flex items-center gap-1.5 transition-colors ${showSideBySide
                  ? 'border-[#d9b66d] text-[#d9b66d] bg-[#d9b66d]/10'
                  : 'border-[#2d5952] text-[#a9d1b5] hover:text-white hover:bg-[#1a383d]'
                }`}
            >
              <span>{showSideBySide ? 'Single Interactive View' : 'Side-by-Side View'}</span>
            </button>

            {!showSideBySide && (
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-3 py-1.5 bg-[#1a383d] hover:bg-[#22484e] border border-[#2d5952] text-white font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#d9b66d]" />
                <span>Flip to {isFlipped ? 'Front' : 'Back'}</span>
              </button>
            )}

            <button
              onClick={() => setShowPersonalizer(!showPersonalizer)}
              className={`px-3 py-1.5 border font-semibold flex items-center gap-1.5 transition-colors ${showPersonalizer
                  ? 'border-[#278362] bg-[#278362]/20 text-white'
                  : 'border-[#2d5952] text-[#a9d1b5] hover:text-white hover:bg-[#1a383d]'
                }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Personalize Details</span>
            </button>
          </div>
        </div>

        {/* Live Personalizer Drawer */}
        {showPersonalizer && (
          <div className="bg-[#142e32] border-b border-[#2d5952] px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200">
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Executive Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="e.g. M. Al-Qahtani"
              />
            </div>
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Designation / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="e.g. Managing Director"
              />
            </div>
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Phone &amp; WhatsApp Direct
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="+966 57 078 6381"
              />
            </div>
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Corporate Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="sustensor.solutions@gmail.com"
              />
            </div>
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Regional Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="Riyadh, KSA"
              />
            </div>
            <div>
              <label className="block mono text-[10px] uppercase text-[#a9d1b5] mb-1 font-semibold">
                Core Pillar Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#0d1e22] border border-[#278362] px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d9b66d]"
                placeholder="Enterprise Governance..."
              />
            </div>
          </div>
        )}

        {/* Card Stage / Display Area */}
        <div
          ref={cardContainerRef}
          className="p-8 sm:p-12 flex flex-col items-center justify-center bg-radial from-[#153439] to-[#0a181b] min-h-[440px] relative overflow-hidden"
        >
          {/* Subtle architectural background guides */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {showSideBySide ? (
            /* SIDE BY SIDE VIEW */
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center z-10 w-full">
              <div className="flex flex-col items-center gap-2">
                <span className="mono text-[11px] font-bold text-[#d9b66d] tracking-widest uppercase">
                  Front Face (Brand Identity)
                </span>
                <CardFront edition={edition} tagline={tagline} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="mono text-[11px] font-bold text-[#d9b66d] tracking-widest uppercase">
                  Back Face (Executive Details &amp; QR)
                </span>
                <CardBack
                  edition={edition}
                  name={name}
                  title={title}
                  phone={phone}
                  email={email}
                  location={location}
                  qrSvg={qrSvg}
                />
              </div>
            </div>
          ) : (
            /* 3D INTERACTIVE FLIP VIEW */
            <div className="flex flex-col items-center gap-4 z-10">
              <div
                className="card-3d-wrapper cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
                title="Click to Flip Card"
              >
                <div className={`card-3d-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* FRONT */}
                  <div className="card-3d-front">
                    <CardFront edition={edition} tagline={tagline} />
                  </div>
                  {/* BACK */}
                  <div className="card-3d-back">
                    <CardBack
                      edition={edition}
                      name={name}
                      title={title}
                      phone={phone}
                      email={email}
                      location={location}
                      qrSvg={qrSvg}
                    />
                  </div>
                </div>
              </div>
              <p className="mono text-[11px] text-[#a9d1b5]/80 tracking-wider uppercase flex items-center gap-1.5 mt-2">
                <RotateCw className="w-3 h-3 text-[#d9b66d] animate-spin-slow" />
                <span>Click card to flip • Showing {isFlipped ? 'Back' : 'Front'} Face</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer info & Specs */}
        <div className="border-t border-[#2d5952] px-6 py-4 bg-[#142e32] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-[#a9d1b5]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#278362]" />
              <span className="font-semibold text-white">Full Bleed Ratio:</span> 3.5&quot; × 2.0&quot;
            </div>
            <span>•</span>
            <div>
              <span className="font-semibold text-white">Palette:</span> Deep Forest (#17343a) • Emerald (#278362) • Warm Gold (#d9b66d)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#17343a] hover:bg-[#204449] border border-[#2d5952] text-[#a9d1b5] hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#278362]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Desk Link' : 'Copy Direct Link'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#d9b66d] hover:bg-[#c9a65d] text-[#17343a] font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Cards</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CARD FRONT COMPONENT
// -------------------------------------------------------------
function CardFront({ edition, tagline }: { edition: CardEdition; tagline: string }) {
  const isDark = edition === 'dark';

  return (
    <div
      className={`relative w-[400px] h-[228px] sm:w-[460px] sm:h-[263px] p-6 flex flex-col justify-between select-none shadow-2xl transition-all duration-300 ${isDark
          ? 'bg-gradient-to-br from-[#0c1c20] via-[#17343a] to-[#0f2428] text-white border border-[#2a5b50]'
          : 'bg-gradient-to-br from-[#ffffff] via-[#f7f4ec] to-[#eae5d8] text-[#17343a] border border-[#c5d8cc]'
        }`}
      style={{
        boxShadow: isDark
          ? '0 20px 40px -15px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(217,182,109,0.2)'
          : '0 20px 40px -15px rgba(23,52,58,0.25), inset 0 0 0 1px rgba(39,131,98,0.2)',
      }}
    >
      {/* Corner Metallic Accent Ticks */}
      <div
        className={`absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 ${isDark ? 'border-[#d9b66d]/80' : 'border-[#278362]/80'
          }`}
      />
      <div
        className={`absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 ${isDark ? 'border-[#d9b66d]/80' : 'border-[#278362]/80'
          }`}
      />
      <div
        className={`absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 ${isDark ? 'border-[#d9b66d]/80' : 'border-[#278362]/80'
          }`}
      />
      <div
        className={`absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 ${isDark ? 'border-[#d9b66d]/80' : 'border-[#278362]/80'
          }`}
      />

      {/* Subtle background luxury watermark */}
      <div className="absolute right-4 bottom-2 opacity-5 pointer-events-none select-none">
        <span className="display text-7xl font-bold uppercase tracking-tighter">SUSTENSOR</span>
      </div>

      {/* Top row */}
      <div className="flex items-center justify-between z-10">
        <span
          className={`mono text-[9px] uppercase tracking-[0.25em] font-semibold ${isDark ? 'text-[#d9b66d]' : 'text-[#278362]'
            }`}
        >
          Executive Advisory
        </span>
        <span
          className={`mono text-[9px] uppercase tracking-[0.2em] font-bold px-1.5 py-0.5 border ${isDark
              ? 'border-[#2a5b50] text-[#a9d1b5] bg-[#0c1c20]/60'
              : 'border-[#b5cebf] text-[#17343a] bg-white/70'
            }`}
        >
          KSA • GCC
        </span>
      </div>

      {/* Center Logo & Wordmark */}
      <div className="flex flex-col items-center justify-center my-auto z-10">
        <div className="relative mb-2">
          <img
            src={isDark ? '/sustensor-logo.png' : '/sustensor-logo-on-light.png'}
            alt="Sustensor Solutions"
            className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-[1px] w-8 ${isDark ? 'bg-[#d9b66d]/60' : 'bg-[#278362]/60'}`} />
          <span
            className={`mono text-[9.5px] font-bold tracking-[0.22em] uppercase ${isDark ? 'text-white' : 'text-[#17343a]'
              }`}
          >
            Sustensor Solutions
          </span>
          <div className={`h-[1px] w-8 ${isDark ? 'bg-[#d9b66d]/60' : 'bg-[#278362]/60'}`} />
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="text-center z-10 border-t pt-2.5 border-dashed border-opacity-30 border-current">
        <p
          className={`mono text-[8.5px] sm:text-[9px] uppercase tracking-wider font-semibold ${isDark ? 'text-[#a9d1b5]' : 'text-[#278362]'
            }`}
        >
          {tagline}
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CARD BACK COMPONENT
// -------------------------------------------------------------
function CardBack({
  edition,
  name,
  title,
  phone,
  email,
  location,
  qrSvg,
}: {
  edition: CardEdition;
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  qrSvg: string;
}) {
  const isDark = edition === 'dark';

  return (
    <div
      className={`relative w-[400px] h-[228px] sm:w-[460px] sm:h-[263px] p-5 sm:p-6 flex flex-col justify-between select-none shadow-2xl transition-all duration-300 ${isDark
          ? 'bg-gradient-to-br from-[#0c1c20] via-[#142d32] to-[#0f2428] text-white border border-[#2a5b50]'
          : 'bg-gradient-to-br from-[#ffffff] via-[#f7f4ec] to-[#eae5d8] text-[#17343a] border border-[#c5d8cc]'
        }`}
      style={{
        boxShadow: isDark
          ? '0 20px 40px -15px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(217,182,109,0.2)'
          : '0 20px 40px -15px rgba(23,52,58,0.25), inset 0 0 0 1px rgba(39,131,98,0.2)',
      }}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b pb-2 border-opacity-20 border-current">
        <div className="flex items-center gap-2">
          <img
            src={isDark ? '/sustensor-logo.png' : '/sustensor-logo-on-light.png'}
            alt="Sustensor"
            className="h-5 w-auto object-contain"
          />
          <span
            className={`display text-xs font-bold tracking-tight uppercase ${isDark ? 'text-white' : 'text-[#17343a]'
              }`}
          >
            Sustensor Solutions
          </span>
        </div>
        <span
          className={`mono text-[8.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 border ${isDark
              ? 'border-[#2a5b50] text-[#d9b66d] bg-[#0c1c20]'
              : 'border-[#b5cebf] text-[#278362] bg-white'
            }`}
        >
          {location}
        </span>
      </div>

      {/* Main Body: Details on Left, QR on Right */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 my-auto">
        {/* Left: Executive Identity & Contact */}
        <div className="flex flex-col gap-2">
          <div>
            <h3
              className={`display text-sm sm:text-base font-bold tracking-tight uppercase leading-tight ${isDark ? 'text-white' : 'text-[#17343a]'
                }`}
            >
              {name}
            </h3>
            <p
              className={`mono text-[9px] sm:text-[9.5px] font-semibold tracking-wide ${isDark ? 'text-[#d9b66d]' : 'text-[#278362]'
                }`}
            >
              {title}
            </p>
          </div>

          <div
            className={`h-[1px] w-full ${isDark ? 'bg-gradient-to-r from-[#d9b66d]/60 to-transparent' : 'bg-gradient-to-r from-[#278362]/60 to-transparent'
              }`}
          />

          {/* Contact Details List */}
          <div className="flex flex-col gap-1 text-[9.5px] sm:text-[10px]">
            <div className="flex items-center gap-2">
              <Phone
                className={`w-3 h-3 shrink-0 ${isDark ? 'text-[#a9d1b5]' : 'text-[#278362]'
                  }`}
              />
              <span className="font-semibold tracking-wide">{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail
                className={`w-3 h-3 shrink-0 ${isDark ? 'text-[#a9d1b5]' : 'text-[#278362]'
                  }`}
              />
              <span className="mono tracking-tight text-[9px] opacity-90">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin
                className={`w-3 h-3 shrink-0 ${isDark ? 'text-[#a9d1b5]' : 'text-[#278362]'
                  }`}
              />
              <span className="opacity-80">Riyadh, Kingdom of Saudi Arabia</span>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Vector QR Code */}
        <div className="flex flex-col items-center justify-center pl-2 border-l border-opacity-20 border-current">
          <div
            className={`p-1.5 rounded-sm border ${isDark
                ? 'bg-[#0a181b] border-[#278362]/50'
                : 'bg-white border-[#aac6b7]'
              } shadow-inner`}
          >
            {qrSvg ? (
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <QrCode className="w-16 h-16 text-[#d9b66d]" />
            )}
          </div>
          <span
            className={`mono text-[7px] uppercase font-bold tracking-widest mt-1 ${isDark ? 'text-[#d9b66d]' : 'text-[#278362]'
              }`}
          >
            Direct WhatsApp
          </span>
        </div>
      </div>

      {/* Bottom Footer Tags */}
      <div
        className={`pt-2 border-t flex items-center justify-between border-opacity-20 border-current mono text-[7.5px] uppercase tracking-wider font-semibold ${isDark ? 'text-[#a9d1b5]' : 'text-[#278362]'
          }`}
      >
        <span>Scope 3 GHG • CIPS Procurement</span>
        <span>Corporate Advisory Desk</span>
      </div>
    </div>
  );
}
