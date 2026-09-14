"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

type Direction = "up" | "left" | "right" | "scale" | "none";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  left: { x: -26 },
  right: { x: 26 },
  scale: { scale: 0.965 },
  none: {},
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  /** Wrapper element — use a semantic tag where the content calls for one. */
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
};

/** Fades content in the first time it enters the viewport. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.75,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}

/** Staggers direct children of a Reveal-like container. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
