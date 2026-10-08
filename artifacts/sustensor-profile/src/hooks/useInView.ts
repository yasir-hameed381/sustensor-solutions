import { useEffect, useRef, useState } from 'react';

/** True while the referenced element intersects the viewport. */
export function useInView<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

/** True from the first time the element scrolls into view (for play-once entrance animations). */
export function useSeenOnce<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const [ref, inView] = useInView<T>(rootMargin);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);
  return [ref, seen] as const;
}

/**
 * A step counter 0..count-1 that advances every `interval` ms while `active` (e.g. on screen and not hovered),
 * then wraps. Reduced motion: stays on `finalStep`, so the finished state is shown without looping.
 */
export function useStepLoop(count: number, active: boolean, interval: number, finalStep = count - 1) {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(prefersReducedMotion()), []);
  useEffect(() => {
    if (reduced || !active) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [count, active, interval, reduced]);
  return reduced ? finalStep : step;
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
