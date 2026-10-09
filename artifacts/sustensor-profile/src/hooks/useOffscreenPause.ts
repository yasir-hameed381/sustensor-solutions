import { useEffect } from 'react';

/**
 * Marks page sections that are well off screen with `.is-offscreen`, which pauses their CSS animations
 * (see index.css). Sections resume a little before they scroll into view, so nothing visibly restarts.
 */
export function useOffscreenPause() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('#top, main section[id], footer');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
      },
      { rootMargin: '300px 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
