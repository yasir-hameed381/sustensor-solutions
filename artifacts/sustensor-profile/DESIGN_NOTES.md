# Design notes: Sustensor v2 redesign

Two enterprise procurement brands were studied as references: [Zip](https://zip.com/) and [ORO Labs](https://www.orolabs.ai/).
We took their design language only. No copy, logos, imagery or exact layouts were reused.

## What we took from each

| | Zip | ORO Labs | How it maps to Sustensor |
|---|---|---|---|
| **Type** | One geometric grotesk throughout; 68px H1 with tight tracking (≈ -3%); regular weight at display sizes | Serif display (90px) with a humanist sans for body; large 30px lead paragraphs | One family (Inter Variable) with optical sizing, so display sizes get Inter's tighter display cut. Tracking tightens as size grows (-3.8% display → -1.2% H4). Leads are 17–20px for an editorial rhythm. |
| **Colour** | Deep indigo hero into white product sections; one saturated accent for links and CTAs | Signature yellow blocks alternating with white and near-black bands | The palette is sampled from the logo mark: its dark teal (`#183838`) for dark sections and text, its green (`#288060`) as the single action colour, its mint (`#78c0a0`) on dark backgrounds, and a teal from the logo gradient as the secondary accent. Surfaces are crisp white with a faint mint cast (no cream or gold, unlike the old site). Amber only for warnings. |
| **Hero** | Headline and subline, two CTAs, a real product UI mockup below, then a logo strip | Headline beside a photo with floating UI cards (risk gauge, onboarding steps) | A light hero on a faint grid: headline and two CTAs beside a code-built "operating view" that tilts with the pointer, with floating satellite cards (Scope 3 coverage ring, DoA approval). We have no customer logos, so the strip below shows site-derived counts, then a ticker of frameworks already named in the copy. |
| **Workflows** | Intake panel (left) driving an animated agent/approval graph (right); pastel cards with an approval chain on an orbit | Step lists beside a visual panel | A "Which workflow should we run?" orchestrator: pick a solution and its four real process steps run as connected cards (Queued → Running → Completed), branching into two of its deliverables. Below, two pastel cards: a DoA approval chain on a dotted orbit and ESG data sources flowing into disclosure. Labels come from `content/solutions.ts`. |
| **Navigation** | Solid dark bar, dropdown menus, "Request a demo" button | Floating rounded bar with a pill CTA | A white glass bar that stays readable over every section, with a scroll-progress line and a shadow on scroll. Dropdowns keep the existing information architecture. Full-height drawer below 1280px. |
| **Product presentation** | 2×2 cards, each with a headline, subline and a cropped UI screenshot | Accordion list beside a large visual panel | Solutions become icon tab cards over a detailed panel: a self-drawing 4-step timeline, a deliverables table (stacked cards on mobile) and value-point cards. The architecture section is a 2-column grid of equal-height cards under a diagram with data pulses flowing into one layer. |
| **Rhythm** | Generous white space, section headings with a grey secondary line | Alternating full-bleed colour bands, dark testimonial card | Light → dark → light: Hero, About (light), Reality Check (dark teal), Workflows (canvas), Solutions (white), Sectors (tint), Architecture (canvas), Region (dark teal), Verdict (dark card with green glow), Team (white), Contact (tint), Footer (dark teal). |
| **Micro-interactions** | Subtle hover lifts, arrow nudges on links | Pill buttons, soft card shadows | Cursor-following spotlight glow and gradient border on cards, duotone icon tiles that tilt on hover, count-up figures, a shine sweep on primary buttons, and fast 350ms/10px scroll reveals. All motion is disabled under `prefers-reduced-motion`. |

## Design system

All tokens live in `src/index.css` (`@theme`). Tailwind's default palette is switched off, so only token colours exist.

- **Colour:** `ink-950…600` (logo dark teal), `canvas`, `surface`, `tint`, `fg`, `fg-muted`, `fg-subtle`, `fg-inverse*`, `hairline*`, `accent-50…800` (logo green; 600 is the logo green), `brand-50…800` (logo teal, secondary), `sand-300/500/700` (warning), `danger-50/600`. Every text/background pair used on the site meets WCAG AA (checked with a contrast script). A legacy print palette is kept only for the PDF profile and business card.
- **Type:** `text-display`, `h1`, `h2`, `h3`, `h4`, `lead`, `body`, `small`, `caption`, `eyebrow`, `micro`, plus decorative `watermark` and `wordmark`. Each token bundles size, line height, tracking and weight. `lib/utils.ts` registers them with tailwind-merge.
- **Layout:** `max-w-site` (78rem), `py-section` (fluid 64–112px), `h-header`.
- **Radii:** `xs`–`2xl`. **Shadows:** `xs`, `sm`, `md`, `lg`, `glow`.
- **Motion:** `ease-out-soft`, `ease-in-out-soft`, `--duration-fast/base/reveal/slow`. **Z-index:** `--z-raised/sticky/header/drawer/overlay/toast`.
- **Primitives** (`src/components/ui`): `Container`, `Section` (canvas / surface / tint / ink, which sets tone context), `Eyebrow` (pill), `Heading` / `SectionHeading` (optional `aside`) / `Accent`, `Button` / `ButtonLink` (primary, primary-inverse, secondary, secondary-inverse, ghost, ghost-inverse × sm / md / lg), `Card` (spotlight when interactive), `Badge`, `IconTile` (duotone, accent / brand), `Stat`, `CountUp`, `GlanceCard`, `TabList` / `TabPanel` (roving tabindex), `DataTable` (a table from `md`, cards below).
