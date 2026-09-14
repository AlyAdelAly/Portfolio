"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Geometric "AA" mark. The two apexes are drawn as strokes so they can trace
 * themselves in on mount, then settle into a gradient fill.
 */
const STROKES = [
  "M 12 96 L 38 20 L 64 96", // first A
  "M 22 70 L 54 70", // its crossbar
  "M 66 96 L 92 20 L 118 96", // second A
  "M 76 70 L 108 70", // its crossbar
];

type MonogramProps = {
  size?: "hero" | "medium" | "compact";
  className?: string;
  animate?: boolean;
};

const sizes = {
  hero: "w-[clamp(180px,calc(170px+8vw),320px)]",
  medium: "w-[clamp(128px,calc(112px+4vw),168px)]",
  compact: "w-[clamp(44px,calc(40px+1vw),56px)]",
};

export function Monogram({
  size = "hero",
  className = "",
  animate = true,
}: MonogramProps) {
  const gradientId = useId();
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      viewBox="0 0 130 116"
      role="img"
      aria-label="Ali Adel monogram"
      className={`${sizes[size]} h-auto ${className}`}
    >
      <title>Geometric AA monogram with a teal gradient</title>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-soft)" />
          <stop offset="55%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-deep)" />
        </linearGradient>
      </defs>

      {STROKES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            pathLength: {
              duration: 1.1,
              delay: 0.15 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: { duration: 0.25, delay: 0.15 + i * 0.12 },
          }}
        />
      ))}
    </svg>
  );
}
