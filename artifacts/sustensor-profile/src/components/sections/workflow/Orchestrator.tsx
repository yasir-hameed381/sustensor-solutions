import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
const STAGE_MS = 1000; // time per stage of the graph
const HOLD_MS = 2200; // pause on the finished graph
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
        panning={phase === 'run' || phase === 'hold'}
        paused={paused}
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
  panning: boolean;
  paused: boolean;
}

function Canvas({ solution, stages, stage, visible, panning, paused }: CanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState(0);
  // Pan offset captured at the moment of pausing (null while running).
  const [frozenX, setFrozenX] = useState<number | null>(null);
  const [resumeFraction, setResumeFraction] = useState(1);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (paused) {
      setFrozenX(new DOMMatrixReadOnly(getComputedStyle(track).transform).m41);
    } else if (frozenX !== null) {
      // Resume over the remaining share of the pan instead of restarting it.
      if (pan > 0) setResumeFraction(Math.max(0.1, 1 - Math.abs(frozenX) / pan));
      setFrozenX(null);
    }
  }, [paused, pan, frozenX]);

  // A fresh workflow pans over the full duration again.
  useEffect(() => setResumeFraction(1), [solution.id]);

  // How far the graph must slide for its right end to come into view (0 when it fits or on phones).
  useLayoutEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      const track = trackRef.current;
      if (frame && track) setPan(Math.max(0, track.scrollWidth - (frame.clientWidth - 40)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [solution.id]);

  const completed = stage < 0 ? 0 : Math.min(stages, stage);
  const deliverables = solution.deliverables.slice(0, 3);
  const panDuration = (stages * STAGE_MS + HOLD_MS) / 1000;

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

        <div ref={frameRef} className="relative flex-1 overflow-hidden rounded-xl bg-white/10 p-4 backdrop-blur-sm sm:p-5">
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

          {/* Graph. Phones: vertical list. From md: a horizontal branching graph that pans. */}
          <div className="mt-5 md:mt-8">
            <div
              ref={trackRef}
              className="md:flex md:w-max md:items-center"
              style={
                frozenX !== null
                  ? { transform: `translateX(${frozenX}px)`, transition: 'none' }
                  : {
                      transform: panning && pan > 0 ? `translateX(-${pan}px)` : 'translateX(0)',
                      transition: panning
                        ? `transform ${panDuration * resumeFraction}s cubic-bezier(0.45, 0, 0.55, 1)`
                        : 'transform 0.4s ease',
                    }
              }
            >
              {solution.process.map((step, index) => (
                <div key={step.title} className="flex flex-col items-center md:flex-row">
                  {/* Sub-steps hang below their node; absolute from md so the row of nodes stays aligned. */}
                  <div className="relative w-full md:w-auto">
                    <FlowNode icon={step.icon} title={step.title} meta={step.detail} state={nodeState(index, stage)} />
                    {step.branches && <SubSteps items={step.branches} lit={stage >= index} />}
                  </div>
                  <Arrow lit={stage > index} />
                </div>
              ))}
              {/* Fan-out to deliverables */}
              <div className="flex flex-col items-center md:flex-row md:self-stretch">
                <BranchLines lit={stage >= stages - 1} />
                {/*
                  Phones: one grouped panel; a rail down the left branches into each deliverable, so the three read
                  as outputs of the same step. From md the panel styling drops away and the curves above do the job.
                */}
                <div className="w-full rounded-xl border border-white/25 bg-white/8 p-3 md:w-auto md:rounded-none md:border-0 md:bg-transparent md:p-0">
                  <p className="mb-2.5 text-micro font-semibold uppercase tracking-wide text-white/85 md:hidden">
                    {deliverables.length} deliverables
                  </p>
                  <ul className="flex flex-col gap-3 max-md:pl-5">
                    {deliverables.map((row, index) => {
                      const line = cn('absolute bg-white transition-opacity duration-500 md:hidden', stage >= stages - 1 ? 'opacity-90' : 'opacity-40');
                      const last = index === deliverables.length - 1;
                      return (
                        <li key={row.area} className="relative">
                          {/* Rail piece: bridges the gap above (except the first card) and stops at the middle of the last card. */}
                          <span aria-hidden="true" className={cn(line, '-left-3.5 w-px', index === 0 ? 'top-0' : '-top-3', last ? 'bottom-1/2' : 'bottom-0')} />
                          {/* Branch from the rail into the card, at its vertical middle. */}
                          <span aria-hidden="true" className={cn(line, '-left-3.5 top-1/2 h-px w-3.5')} />
                          <FlowNode icon={FileCheck2} title={row.area} meta="Deliverable" state={nodeState(stages - 1, stage)} variant="deliverable" />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  state: NodeState;
  variant?: 'step' | 'deliverable';
}) {
  const pill = PILL[state];
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border bg-surface p-3 transition-[box-shadow,border-color,background-color] duration-500 ease-out-soft md:w-48',
        state === 'active' ? 'node-glow border-sand-300 bg-linear-to-br from-surface to-sand-300/20' : 'border-transparent shadow-sm',
      )}
    >
      <div className="flex items-center gap-2">
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
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="min-w-0 text-micro text-fg-subtle md:truncate">{meta}</span>
        <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-micro font-semibold', pill.className)}>
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
    // Phones: indented under the card, hanging off a dashed rail from the card's bottom edge (like a tree), so they
    // read as part of the step above rather than as steps of their own. From md: a short centred drop below the node.
    <div className="mt-1 flex flex-col md:absolute md:inset-x-0 md:top-full md:mt-2 md:items-center">
      <span aria-hidden="true" className="hidden h-3 border-l border-dashed border-white/60 md:block" />
      <ul className="flex w-full flex-col gap-1.5 max-md:pl-8 max-md:pt-1.5">
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
                className={cn('absolute -left-4 border-l border-dashed border-white/70 md:hidden', index === 0 ? '-top-2.5' : '-top-1.5', last ? 'bottom-1/2' : 'bottom-0')}
              />
              <span aria-hidden="true" className="absolute -left-4 top-1/2 w-4 border-t border-dashed border-white/70 md:hidden" />
              <CornerDownRight aria-hidden="true" className="size-3 shrink-0 text-accent-600" />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Thin connector with an arrowhead: vertical on phones, horizontal from md. */
function Arrow({ lit }: { lit: boolean }) {
  const opacity = lit ? 0.95 : 0.4;
  return (
    <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center md:h-auto md:w-10">
      <svg viewBox="0 0 40 12" className="size-6 rotate-90 md:h-3 md:w-10 md:rotate-0">
        <line x1="0" y1="6" x2="34" y2="6" stroke="white" strokeOpacity={opacity} strokeWidth="1.5" className="transition-[stroke-opacity] duration-500" />
        <path d="M33 2 L39 6 L33 10 Z" fill="white" fillOpacity={opacity} className="transition-[fill-opacity] duration-500" />
      </svg>
    </span>
  );
}

/** Phones: an arrow into the deliverables panel (its rail does the branching). From md: one line in, three curves out. */
function BranchLines({ lit }: { lit: boolean }) {
  const opacity = lit ? 0.95 : 0.4;
  return (
    <>
      <span className="md:hidden">
        <Arrow lit={lit} />
      </span>
      <svg aria-hidden="true" viewBox="0 0 48 300" preserveAspectRatio="none" className="hidden w-12 shrink-0 self-stretch md:block">
        {[50, 150, 250].map((y) => (
          <path
            key={y}
            d={`M0 150 C 24 150, 24 ${y}, 48 ${y}`}
            fill="none"
            stroke="white"
            strokeOpacity={opacity}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke-opacity] duration-500"
          />
        ))}
      </svg>
    </>
  );
}
