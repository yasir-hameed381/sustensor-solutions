import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, CheckCircle2, CircleDashed, CornerDownRight, FileCheck2, Pause, Play, PlugZap, type LucideIcon } from 'lucide-react';

import { solutions } from '@/content/solutions';
import type { Solution } from '@/content/types';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

/*
 * Orchestration demo modelled on zip.com/products/intake-to-procure:
 *  - the greeting starts centred, then slides up while the options stagger in;
 *  - a single white highlight slides to the selected workflow;
 *  - the canvas cross-fades in (header card, ERP chips, a branching graph);
 *  - a warm glow travels node to node, pills flip "Ready to start" → "Completed";
 *  - the wide graph pans slowly sideways; at the end the canvas dims and the next workflow loads.
 * Every label comes from content/solutions.ts.
 */

// ERP connectors named in the P2P deliverables copy.
const ERP_CHIPS = ['SAP S/4HANA', 'Oracle Cloud ERP', 'Microsoft Dynamics 365'];

const INTRO_MS = 1300; // greeting centred before it slides up
const ENTER_MS = 700; // canvas fade-in before the first node runs
const STAGE_MS = 200; // time per stage: the line draws in, the card appears, then it runs
const LINE_MS = 250; // a card appears this long after its incoming line starts drawing
const HOLD_MS = 2600; // pause on the finished graph
const LEAVE_MS = 450; // dim before switching workflow

// Stages per workflow: each process step, then the deliverables together (the fan-out).
const stageCount = (solution: Solution) => solution.process.length + 1;
// Stage value meaning "every stage complete", whatever the workflow's length (used for reduced motion).
const ALL_DONE = Number.MAX_SAFE_INTEGER;

type Phase = 'intro' | 'enter' | 'run' | 'hold' | 'leave';

/** A request from outside (e.g. the header's Solutions menu) to show a workflow; `nonce` repeats the same id. */
export interface WorkflowRequest {
  id: string;
  nonce: number;
}

export function Orchestrator({ request }: { request?: WorkflowRequest }) {
  const reduced = useRef(false);
  const [phase, setPhase] = useState<Phase>('intro');
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState(-1); // -1: nothing running yet; ≥ stages: all complete
  // autoplay: advance to the next workflow after each one finishes.
  // paused: freeze everything mid-run (set by "Pause tour").
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>('-15% 0px');
  const solution = solutions[activeIndex];
  const stages = stageCount(solution);

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    if (reduced.current) {
      setAnimated(false);
      setPhase('hold');
      setStage(ALL_DONE);
      setAutoplay(false);
    }
  }, []);

  // The timeline. Only advances while the demo is on screen.
  useEffect(() => {
    if (!inView || paused || reduced.current) return;
    let delay: number | undefined;
    let next: () => void = () => {};

    if (phase === 'intro') {
      delay = INTRO_MS;
      next = () => setPhase('enter');
    } else if (phase === 'enter') {
      delay = ENTER_MS;
      next = () => {
        setStage(0);
        setPhase('run');
      };
    } else if (phase === 'run') {
      delay = STAGE_MS;
      next = () => {
        if (stage + 1 >= stages) {
          setStage(stages);
          setPhase('hold');
        } else setStage(stage + 1);
      };
    } else if (phase === 'hold' && autoplay) {
      delay = HOLD_MS;
      next = () => setPhase('leave');
    } else if (phase === 'leave') {
      delay = LEAVE_MS;
      next = () => {
        setActiveIndex((index) => (index + 1) % solutions.length);
        setStage(-1);
        setPhase('enter');
      };
    }
    if (delay === undefined) return;
    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [inView, paused, phase, stage, stages, autoplay]);

  // "Playing" means something is moving: the tour, or a picked workflow still running to its end.
  const playing = !paused && (autoplay || phase !== 'hold');
  const togglePlaying = () => {
    if (playing) {
      setPaused(true);
    } else {
      // Resume where it stopped, then carry on through the other workflows.
      setPaused(false);
      setAutoplay(true);
    }
  };

  // Picking a workflow runs that one to the end, then stays on it.
  const choose = (index: number) => {
    setPaused(false);
    setAutoplay(false);
    setActiveIndex(index);
    if (reduced.current) return;
    setStage(-1);
    setPhase('enter');
  };

  // Header menu: open the requested workflow (each click carries a new nonce, so repeats still apply).
  useEffect(() => {
    if (!request) return;
    const index = solutions.findIndex((item) => item.id === request.id);
    if (index >= 0) choose(index);
  }, [request]);

  const introDone = phase !== 'intro';

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-2xl border border-hairline bg-ink-900 shadow-lg lg:grid lg:grid-cols-12',
        // Freeze CSS animations (spinners, glows) along with the timeline.
        paused && '[&_*]:[animation-play-state:paused]',
      )}
    >
      <IntakePanel
        activeIndex={activeIndex}
        introDone={introDone}
        playing={playing}
        showTourControl={animated}
        onChoose={choose}
        onTogglePlaying={togglePlaying}
      />
      <Canvas
        solution={solution}
        stages={stages}
        stage={stage}
        visible={introDone && phase !== 'leave'}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- Intake panel (left) */

interface IntakePanelProps {
  activeIndex: number;
  introDone: boolean;
  playing: boolean;
  /** Hidden for reduced motion, where nothing animates. */
  showTourControl: boolean;
  onChoose: (index: number) => void;
  onTogglePlaying: () => void;
}

function IntakePanel({ activeIndex, introDone, playing, showTourControl, onChoose, onTogglePlaying }: IntakePanelProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [highlight, setHighlight] = useState({ top: 0, height: 0 });

  // Position the sliding white highlight behind the selected option.
  useLayoutEffect(() => {
    const update = () => {
      // children[0] is the highlight itself, so options start at index 1.
      const item = listRef.current?.children[activeIndex + 1] as HTMLElement | undefined;
      if (item) setHighlight({ top: item.offsetTop, height: item.offsetHeight });
    };
    update();
    const observer = new ResizeObserver(update);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <div className="relative flex min-h-96 flex-col p-6 text-fg-inverse sm:p-8 lg:col-span-4 lg:min-h-128">
      {/* Greeting: centred during the intro, then slides to the top. */}
      <div className={cn('transition-transform duration-700 ease-out-soft', introDone ? 'translate-y-0' : 'translate-y-36')}>
        <p className="text-h4 text-fg-inverse">Hi, which workflow should we run?</p>
        <p className="mt-1 text-caption text-fg-inverse-subtle">Pick a solution to watch it run end to end.</p>
      </div>

      <ul ref={listRef} className="relative mt-6 space-y-2" aria-label="Workflows">
        {/* Sliding highlight */}
        <li
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 top-0 m-0! rounded-md bg-surface shadow-md transition-[transform,height,opacity] duration-500 ease-out-soft',
            introDone ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transform: `translateY(${highlight.top}px)`, height: highlight.height }}
        />
        {solutions.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li
              key={item.id}
              className={cn('relative transition-[opacity,transform] duration-500 ease-out-soft', introDone ? 'opacity-100' : 'translate-y-2 opacity-0')}
              style={{ transitionDelay: introDone ? `${150 + index * 70}ms` : '0ms' }}
            >
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChoose(index)}
                className={cn(
                  'flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left text-small transition-colors duration-500',
                  isActive
                    ? 'border-transparent font-semibold text-fg'
                    : 'border-hairline-inverse text-fg-inverse-muted hover:border-hairline-inverse-strong hover:text-fg-inverse',
                )}
              >
                {item.menuLabel}
                <ArrowRight
                  aria-hidden="true"
                  className={cn('size-4 shrink-0 transition-[opacity,transform] duration-500', isActive ? 'text-accent-600 opacity-100' : '-translate-x-1 opacity-0')}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {showTourControl && (
        <button
          type="button"
          onClick={onTogglePlaying}
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-full px-3 pt-4 text-caption font-semibold text-accent-300 hover:text-fg-inverse"
        >
          {playing ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
          {playing ? 'Pause' : 'Play tour'}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Canvas (right) */

type NodeState = 'ready' | 'active' | 'done';
const nodeState = (nodeStage: number, stage: number): NodeState => (stage < nodeStage ? 'ready' : stage === nodeStage ? 'active' : 'done');

interface CanvasProps {
  solution: Solution;
  /** Process steps plus the deliverables fan-out. */
  stages: number;
  stage: number;
  visible: boolean;
}

/**
 * Build-up reveal (idea from compliverse.ai's workflow panel): a card stays hidden until the line drawing into it
 * arrives, then fades and scales in. Hidden cards keep their space, so nothing shifts as the diagram builds.
 */
function reveal(shown: boolean, delay = LINE_MS) {
  return {
    className: cn(
      'transition-[opacity,transform] duration-300 ease-out-soft motion-reduce:transition-none',
      shown ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0',
    ),
    style: { transitionDelay: shown ? `${delay}ms` : '0ms' } as CSSProperties,
  };
}

/** Node card width (md:w-48) and the arrow between cards (w-10), in px. */
const NODE_W = 192;
const ARROW_W = 40;
const CELL_W = NODE_W + ARROW_W;

function Canvas({ solution, stages, stage, visible }: CanvasProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  // How many steps fit side by side in the frame (from md). Steps wrap onto further rows instead of panning.
  const [cols, setCols] = useState(3);

  useLayoutEffect(() => {
    const measure = () => {
      const width = graphRef.current?.clientWidth ?? 0;
      if (width) setCols(Math.max(2, Math.min(4, Math.floor((width + ARROW_W) / CELL_W))));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (graphRef.current) observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, []);

  const completed = stage < 0 ? 0 : Math.min(stages, stage);
  const deliverables = solution.deliverables.slice(0, 3);
  const lastStep = solution.process.length - 1;

  // Snake layout: row 1 runs left to right, row 2 right to left, and so on, joined by a short drop at the row end,
  // so the whole workflow fits the frame and runs in one go. Deliverables sit in a row underneath.
  const rows: { step: Solution['process'][number]; index: number }[][] = [];
  solution.process.forEach((step, index) => {
    if (index % cols === 0) rows.push([]);
    rows[rows.length - 1].push({ step, index });
  });

  return (
    <div className="relative isolate overflow-hidden bg-linear-to-br from-accent-600 via-brand-600 to-ink-700 p-4 sm:p-6 lg:col-span-8 lg:p-8">
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-accent-300/30 blur-3xl" />

      {/* Cross-fade wrapper: dims out on leave, re-enters for each workflow. */}
      <div key={solution.id} className={cn('flex h-full flex-col gap-4 transition-opacity duration-500', visible ? 'canvas-enter opacity-100' : 'opacity-0')}>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/15 px-5 py-3.5 backdrop-blur-sm">
          <p className="text-h4 text-white">{solution.title}</p>
          <p className="text-caption text-white">
            <span className="font-semibold tabular-nums">{completed}</span>/{stages} stages complete
          </p>
        </div>

        <div className="relative isolate flex-1 overflow-hidden rounded-xl bg-white/10 p-4 backdrop-blur-sm sm:p-5">
          {/* Grid canvas behind the diagram. */}
          <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-60" />
          {/* ERP connector chips */}
          <ul className="flex flex-wrap gap-2" aria-label="Connected systems">
            {ERP_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 shadow-xs">
                <PlugZap aria-hidden="true" className="size-3 text-accent-600" />
                <span className="text-micro font-semibold text-fg">{chip}</span>
                <span className="text-micro text-fg-subtle">· Synced</span>
              </li>
            ))}
          </ul>

          {/* Phones: a vertical list. */}
          <div className="mt-5 md:hidden">
            {solution.process.map((step, index) => (
              <div
                key={step.title}
                style={reveal(index === 0 || stage >= index, index === 0 ? 0 : LINE_MS).style}
                className={cn('flex flex-col items-center', reveal(index === 0 || stage >= index).className)}
              >
                <div className="w-full">
                  <FlowNode icon={step.icon} title={step.title} meta={step.detail} state={nodeState(index, stage)} />
                  {step.branches && <SubSteps items={step.branches} lit={stage >= index} />}
                </div>
                <Arrow lit={stage > index} flowing={stage === index + 1} />
              </div>
            ))}
            <Deliverables deliverables={deliverables} state={nodeState(stages - 1, stage)} lit={stage >= stages - 1} columns={1} />
          </div>

          {/* From md: the snake layout, sized to fit the frame. */}
          <div ref={graphRef} className="mt-8 hidden md:block">
            <div className="mx-auto" style={{ width: cols * CELL_W - ARROW_W }}>
              {rows.map((row, rowIndex) => {
                const reverse = rowIndex % 2 === 1;
                return (
                  <div key={rowIndex} className={cn('flex items-stretch pb-6', reverse && 'flex-row-reverse')}>
                    {row.map(({ step, index }, position) => {
                      const rowEnd = position === row.length - 1;
                      return (
                        <div
                          key={step.title}
                          style={reveal(index === 0 || stage >= index, index === 0 ? 0 : LINE_MS).style}
                          className={cn('flex items-stretch', reverse && 'flex-row-reverse', reveal(index === 0 || stage >= index).className)}
                        >
                          <div className="flex w-48 shrink-0 flex-col">
                            <FlowNode icon={step.icon} title={step.title} meta={step.detail} state={nodeState(index, stage)} />
                            {step.branches && <SubSteps items={step.branches} lit={stage >= index} />}
                            {/* Row end: drop to the next row, or to the deliverables after the last step. */}
                            {rowEnd && <DropLine lit={stage > index || (index === lastStep && stage >= stages - 1)} flowing={stage === index + 1} />}
                          </div>
                          {!rowEnd && <SideArrow lit={stage > index} reverse={reverse} flowing={stage === index + 1} />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <Deliverables deliverables={deliverables} state={nodeState(stages - 1, stage)} lit={stage >= stages - 1} columns={Math.min(3, cols)} />
            </div>
          </div>
          <BuiltIn items={BUILT_IN[solution.id] ?? []} done={stage >= stages} />
        </div>
      </div>
    </div>
  );
}

/** Features built into each workflow, shown as chips once it completes. Drawn from the solutions copy. */
const BUILT_IN: Record<string, string[]> = {
  'vendor-management': ['KYC checks', 'Risk scoring', 'LCGPA tracking', 'Full audit trail'],
  'procure-to-pay': ['DoA routing', '3-way match', 'ERP sync', 'Full audit trail'],
  'contract-sustainability': ['ESG clauses', 'Live dashboards', 'Early warnings', 'Full audit trail'],
  'annual-procurement-planning': ['Budget aligned', 'Risk assessed', 'DoA sign-off', 'Full audit trail'],
};

/** Chips with checks that cascade in when the workflow completes; space is reserved so nothing jumps. */
function BuiltIn({ items, done }: { items: string[]; done: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-4">
      <span className="mr-1 text-micro font-semibold uppercase tracking-wide text-white/75">Built in</span>
      {items.map((item, index) => (
        <span
          key={item}
          style={{ animationDelay: `${index * 90}ms` }}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-micro font-semibold text-white transition-opacity duration-300',
            done ? 'pill-pop' : 'opacity-0',
          )}
        >
          <CheckCircle2 aria-hidden="true" className={cn('size-3 transition-colors duration-300', done ? 'text-sand-300' : 'text-white/60')} />
          {item}
        </span>
      ))}
    </div>
  );
}

/** The workflow's outputs, grouped in one panel (on phones a rail branches into each). */
function Deliverables({
  deliverables,
  state,
  lit,
  columns,
}: {
  deliverables: Solution['deliverables'];
  state: NodeState;
  lit: boolean;
  columns: number;
}) {
  // `lit`: the last step is done and the line into the panel is drawing, so the panel and its cards build in.
  const panel = reveal(lit);
  return (
    <div style={panel.style} className={cn('w-full rounded-xl border border-white/25 bg-white/8 p-3', panel.className)}>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <p className="text-micro font-semibold uppercase tracking-wide text-white/85">{deliverables.length} deliverables</p>
        {/* Pops in once every deliverable is complete. */}
        {state === 'done' && (
          <span className="pill-pop inline-flex items-center gap-1 rounded-full bg-sand-300 px-2 py-0.5 text-micro font-semibold text-ink-950">
            <CheckCircle2 aria-hidden="true" className="size-3" />
            All ready
          </span>
        )}
      </div>
      <ul className={cn('grid gap-3', columns === 1 && 'pl-5')} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {deliverables.map((row, index) => {
          const line = cn('absolute bg-white transition-opacity duration-500', lit ? 'opacity-90' : 'opacity-40');
          const last = index === deliverables.length - 1;
          return (
            <li key={row.area} style={reveal(lit, LINE_MS + 100 + index * 100).style} className={cn('relative h-full', reveal(lit).className)}>
              {columns === 1 && (
                <>
                  {/* Rail piece (bridges the gap above, stops at the middle of the last card) and branch into the card. */}
                  <span aria-hidden="true" className={cn(line, '-left-3.5 w-px', index === 0 ? 'top-0' : '-top-3', last ? 'bottom-1/2' : 'bottom-0')} />
                  <span aria-hidden="true" className={cn(line, '-left-3.5 top-1/2 h-px w-3.5')} />
                </>
              )}
              <FlowNode icon={FileCheck2} title={row.area} meta="Deliverable" state={state} variant="deliverable" fill />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const PILL: Record<NodeState, { label: string; icon: LucideIcon; className: string }> = {
  ready: { label: 'Ready to start', icon: CircleDashed, className: 'bg-tint text-fg-subtle' },
  active: { label: 'In progress', icon: CircleDashed, className: 'bg-sand-300/40 text-sand-700' },
  done: { label: 'Completed', icon: CheckCircle2, className: 'bg-accent-50 text-accent-700' },
};

function FlowNode({
  icon: Icon,
  title,
  meta,
  state,
  variant = 'step',
  fill = false,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  state: NodeState;
  variant?: 'step' | 'deliverable';
  /** Fill the container (deliverables grid) instead of the fixed md:w-48 step width. */
  fill?: boolean;
}) {
  const pill = PILL[state];
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border bg-surface p-3 transition-[box-shadow,border-color,background-color] duration-500 ease-out-soft',
        // Deliverables fill their grid cell and match the tallest card in the row; the status line sits at the bottom.
        // From md, step cards share one height (room for a three-line title) so cards in a row line up.
        fill ? 'flex h-full flex-col' : 'md:flex md:min-h-[6.75rem] md:w-48 md:flex-col',
        state === 'active' ? 'node-glow border-sand-300 bg-linear-to-br from-surface to-sand-300/20' : 'border-transparent shadow-sm',
      )}
    >
      {/* Light sweeping across the step in progress. */}
      {state === 'active' && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <span className="node-shimmer absolute inset-0" />
        </span>
      )}
      <div className="relative flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-full',
            variant === 'deliverable' ? 'bg-ink-900 text-accent-300' : 'bg-accent-50 text-accent-700',
          )}
        >
          <Icon className="size-3.5" strokeWidth={1.75} />
        </span>
        <p className="min-w-0 text-caption font-semibold leading-snug text-fg">{title}</p>
      </div>
      <div className={cn('relative mt-2.5 flex items-center justify-between gap-2', 'md:mt-auto md:pt-2.5', fill && 'mt-auto pt-2.5')}>
        <span className="min-w-0 text-micro text-fg-subtle md:truncate">{meta}</span>
        {/* Keyed by state, so the pill pops each time it changes (Ready → In progress → Completed). */}
        <span key={state} className={cn('pill-pop inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-micro font-semibold', pill.className)}>
          <pill.icon aria-hidden="true" className={cn('size-2.5', state === 'active' && 'animate-spin')} />
          {pill.label}
        </span>
      </div>
    </div>
  );
}

/** Parallel sub-steps under a node, linked by a short dashed drop. Brighten once the flow reaches the node. */
function SubSteps({ items, lit }: { items: string[]; lit: boolean }) {
  return (
    // Indented under the card, hanging off a dashed rail from the card's bottom edge (like a tree), so they read as
    // part of the step above rather than as steps of their own.
    <div className="mt-1 flex flex-col">
      <ul className="flex w-full flex-col gap-1.5 pl-8 pt-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={item}
              className={cn(
                'relative flex items-center gap-1.5 rounded-md bg-surface/90 px-2.5 py-1.5 text-micro font-semibold text-fg shadow-xs transition-opacity duration-500',
                lit ? 'opacity-100' : 'opacity-60',
              )}
            >
              {/* Rail piece (from the card's bottom edge for the first item) and branch into the chip. */}
              <span
                aria-hidden="true"
                className={cn('absolute -left-4 border-l border-dashed border-white/70', index === 0 ? '-top-2.5' : '-top-1.5', last ? 'bottom-1/2' : 'bottom-0')}
              />
              <span aria-hidden="true" className="absolute -left-4 top-1/2 w-4 border-t border-dashed border-white/70" />
              <CornerDownRight aria-hidden="true" className="size-3 shrink-0 text-accent-600" />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Phones: a short downward arrow between stacked steps. */
function Arrow({ lit, flowing = false }: { lit: boolean; flowing?: boolean }) {
  const opacity = lit ? 0.95 : 0;
  return (
    <span aria-hidden="true" className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      {flowing && <span className="packet-run-y" />}
      <svg viewBox="0 0 40 12" className="size-6 rotate-90">
        <line x1="0" y1="6" x2="34" y2="6" stroke="white" strokeOpacity={opacity} strokeWidth="1.5" className="transition-[stroke-opacity] duration-500" />
        <path d="M33 2 L39 6 L33 10 Z" fill="white" fillOpacity={opacity} className="transition-[fill-opacity] duration-500" />
      </svg>
    </span>
  );
}

/** From md: arrow between steps in a row, level with the card's middle; points left on reversed rows. */
function SideArrow({ lit, reverse, flowing = false }: { lit: boolean; reverse: boolean; flowing?: boolean }) {
  return (
    // Mirrored on reversed rows, so the line always draws from the step it leaves.
    <span aria-hidden="true" className={cn('relative flex h-[6.75rem] w-10 shrink-0 items-center', reverse && '-scale-x-100')}>
      {/* The line draws in when the step completes; the next card appears once it arrives. */}
      <span
        className={cn(
          'absolute left-0 right-1.5 h-0.5 origin-left rounded-full bg-white transition-transform duration-250 ease-out-soft',
          lit ? 'scale-x-100' : 'scale-x-0',
        )}
      />
      <svg viewBox="0 0 6 8" className={cn('absolute right-0 h-2.5 w-2 transition-opacity duration-300', lit ? 'opacity-100 delay-200' : 'opacity-0')}>
        <path d="M0 0 L6 4 L0 8 Z" fill="white" />
      </svg>
      {flowing && <span className="packet-run-x" />}
    </span>
  );
}

/** From md: a line from the bottom of a row's last card down into the next row (or the deliverables). */
function DropLine({ lit, flowing = false }: { lit: boolean; flowing?: boolean }) {
  return (
    // Column flex, so the line grows downwards (not sideways) to fill the space under the card.
    <span aria-hidden="true" className="relative -mb-6 mt-2 flex min-h-8 flex-1 flex-col items-center">
      {/* The line draws downwards when the step completes; the next card appears once it arrives. */}
      <span
        className={cn(
          'absolute bottom-2 top-0 w-0.5 origin-top rounded-full bg-white transition-transform duration-250 ease-out-soft',
          lit ? 'scale-y-100' : 'scale-y-0',
        )}
      />
      {flowing && <span className="packet-run-y" />}
      <svg viewBox="0 0 10 6" className={cn('absolute bottom-0 h-2 w-2.5 transition-opacity duration-300', lit ? 'opacity-100 delay-200' : 'opacity-0')}>
        <path d="M0 0 H10 L5 6 Z" fill="white" />
      </svg>
    </span>
  );
}
