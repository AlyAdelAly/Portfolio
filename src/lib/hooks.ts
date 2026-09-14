"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Tracks the user's reduced-motion preference, reacting to live changes. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false, // assume motion is fine on the server; corrected on hydration
  );
}

/** Fires once when the element first scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      // Without an observer, show the content rather than hiding it forever.
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Highlights the nav entry for whichever section owns the middle of the
 * viewport. Falls back to the last section once the page is scrolled to the
 * bottom, since a short final section may never cross the midline.
 */
export function useScrollSpy(ids: string[], active: boolean) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (!active) return;

    const onScroll = () => {
      const middle = window.innerHeight / 2;
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= middle && bottom >= middle) {
          current = id;
          break;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      if (current) setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, active]);

  return activeId;
}

/** Counts from 0 to `target` with an ease-out curve once triggered. */
export function useCountUp(target: number, start: boolean, duration = 1100) {
  const [animated, setAnimated] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start || reduced) return;

    let frame = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration, reduced]);

  // Reduced motion skips the ramp and lands on the final number.
  return reduced && start ? target : animated;
}
