// components/EarthenHomes/hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Triggers a boolean when the element enters the viewport.
 * Disconnects after first trigger to prevent re-animation on scroll.
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef<<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}