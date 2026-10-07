import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Milliseconds. */
  duration?: number;
}

/**
 * Counts from 0 to `value` once, when first scrolled into view.
 * Screen readers get the final value only; reduced-motion users see it immediately.
 */
export function CountUp({ value, suffix = '', duration = 1200 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  // Keep the value's own decimal places while counting (97.5 stays 97.5, not 98).
  const decimals = (String(value).split('.')[1] ?? '').length;

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setDisplay(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Number((value * eased).toFixed(decimals)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, decimals]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
