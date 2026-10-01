import type { CSSProperties } from 'react';

import { company } from '@/content/company';
import { copy } from '@/content/copy';

// Rings map to the markets named in the copy ("KSA / GCC / MENA"); the centre is the real HQ.
const rings = copy.region.markets.split('/').map((label) => label.trim());
const RADII = [46, 86, 126];
const CX = 210;
const CY = 140;

// Unlabelled decorative signal points (not locations).
const blips = [
  { x: 268, y: 168, i: 0 },
  { x: 150, y: 190, i: 1 },
  { x: 305, y: 196, i: 2 },
  { x: 112, y: 86, i: 3 },
];

/** Decorative "operating footprint" radar for the Region section. */
export function RegionRadar() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-hairline-inverse bg-white/4 p-5 sm:p-6">
      <svg viewBox="0 0 420 280" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0%" stopColor="var(--color-brand-300)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-brand-300)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Crosshair + rings */}
        <line x1="0" y1={CY} x2="420" y2={CY} stroke="var(--color-hairline-inverse-strong)" strokeDasharray="2 6" />
        <line x1={CX} y1="0" x2={CX} y2="280" stroke="var(--color-hairline-inverse-strong)" strokeDasharray="2 6" />
        {RADII.map((r, index) => (
          <g key={r}>
            <circle cx={CX} cy={CY} r={r} fill="none" stroke="var(--color-hairline-inverse-strong)" />
            <text
              x={CX + r * 0.71 + 6}
              y={CY - r * 0.71 - 4}
              fill="var(--color-fg-inverse-subtle)"
              fontSize="11"
              fontWeight="600"
              letterSpacing="1.2"
            >
              {rings[index] ?? ''}
            </text>
          </g>
        ))}

        {/* Rotating sweep */}
        <g className="animate-sweep" style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' } as CSSProperties}>
          <path d={`M${CX} ${CY} L${CX} ${CY - 126} A126 126 0 0 1 ${CX + 89} ${CY - 89} Z`} fill="url(#sweep)" />
        </g>

        {/* Signal points */}
        {blips.map(({ x, y, i }) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="4" fill="var(--color-accent-400)" className="animate-radar-ping" style={{ '--i': i } as CSSProperties} />
            <circle cx={x} cy={y} r="2.5" fill="var(--color-accent-300)" />
          </g>
        ))}

        {/* HQ */}
        <circle cx={CX} cy={CY} r="28" fill="url(#core)" />
        <circle cx={CX} cy={CY} r="7" fill="var(--color-brand-300)" className="animate-radar-ping" />
        <circle cx={CX} cy={CY} r="5" fill="var(--color-brand-300)" stroke="var(--color-ink-950)" strokeWidth="2" />
        <text x={CX + 12} y={CY + 22} fill="var(--color-fg-inverse)" fontSize="12" fontWeight="600">
          {company.location} · HQ
        </text>
      </svg>
      <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-hairline-inverse pt-3 text-caption text-fg-inverse-subtle">
        <span>Operating footprint</span>
        <span className="font-semibold text-brand-300">{copy.region.markets}</span>
      </figcaption>
    </figure>
  );
}
