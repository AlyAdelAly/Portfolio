"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal } from "./reveal";
import { nav } from "@/content/site";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  /** Widen the container for grid-heavy sections. */
  wide?: boolean;
};

const order = Object.fromEntries(nav.map((item, i) => [item.id, i + 1]));

export function Section({ id, title, children, wide = false }: SectionProps) {
  const index = order[id];

  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20">
      <div
        className={`mx-auto px-6 ${wide ? "max-w-6xl" : "max-w-5xl"}`}
      >
        <Reveal className="mb-12 flex items-baseline gap-4">
          {index ? (
            <span className="font-mono text-sm text-accent">
              {String(index).padStart(2, "0")}.
            </span>
          ) : null}
          <h2 className="font-mono text-2xl font-bold text-fg">{title}</h2>
          <motion.span
            className="h-px flex-1 origin-left bg-linear-to-r from-line to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/**
 * Renders **bold** spans from the content layer. The content is authored in
 * this repo, so the markup is ours rather than user input.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
