import { useEffect } from 'react';

/**
 * Adds `is-visible` to each `[data-reveal]` element once, as it enters the viewport.
 *
 * Content is only ever hidden while JS runs (see `.js` in index.html and index.css), so it stays
 * visible without JS and in print. When an in-page anchor is followed, everything inside the
 * target's section is revealed instantly so the landing view is never half-faded.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    function show(element: HTMLElement, instant = false) {
      if (instant) element.classList.add('reveal-instant');
      element.classList.add('is-visible');
      observer.unobserve(element);
    }

    function revealAnchorTarget(hash: string) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      const scope = target.closest('section') ?? target;
      if (scope.matches('[data-reveal]')) show(scope as HTMLElement, true);
      scope.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((element) => show(element, true));
    }

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element));

    // Reveal before the browser starts scrolling to the anchor.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (link) revealAnchorTarget(link.getAttribute('href') ?? '');
    };
    const onHashChange = () => revealAnchorTarget(window.location.hash);

    revealAnchorTarget(window.location.hash);
    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
}
