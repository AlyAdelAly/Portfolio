"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./reveal";
import { RichText, Section } from "./section";
import { jobs } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks";

export function Experience() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs[active];

  /** Roving focus so the tablist is navigable by arrow keys. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = jobs.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <Section id="experience" title="Where I've Worked">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-10">
          <div
            role="tablist"
            aria-label="Companies"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex overflow-x-auto md:relative md:flex-col md:overflow-visible"
          >
            {/* Sliding indicator that follows the selected tab */}
            <motion.span
              className="pointer-events-none absolute bottom-0 left-0 hidden h-px w-full bg-accent md:block md:h-[42px] md:w-0.5"
              animate={{ y: active * 42 }}
              initial={false}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 32 }
              }
              style={{ top: 0, bottom: "auto" }}
            />
            <span className="absolute top-0 left-0 hidden h-full w-0.5 bg-line md:block" />

            {jobs.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${item.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative h-[42px] shrink-0 border-b border-line px-4 text-left font-mono text-[13px] whitespace-nowrap transition-colors duration-250 md:border-b-0 md:px-5 ${
                  active === i
                    ? "bg-accent/6 text-accent"
                    : "text-muted hover:bg-raised hover:text-accent"
                }`}
              >
                {item.company}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={job.id}
              id={`panel-${job.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${job.id}`}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-lg font-semibold text-fg">
                {job.role}{" "}
                <span className="text-accent">
                  ·{" "}
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4"
                    >
                      {job.company}
                      <ArrowUpRightIcon className="size-3" />
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              </h3>

              <p className="mt-1.5 font-mono text-xs text-faint">
                {job.range} · {job.location}
              </p>

              <p className="mt-4 text-pretty leading-relaxed text-muted">
                {job.summary}
              </p>

              {job.projects.map((project) => (
                <div
                  key={project.name}
                  className="mt-5 rounded-lg border border-line bg-panel p-5 transition-all duration-300 hover:translate-x-0.5 hover:border-[#28323f] hover:bg-raised"
                >
                  <div className="font-semibold text-fg">{project.name}</div>
                  <div className="mt-1 mb-3 font-mono text-[11.5px] text-accent-deep">
                    {project.stack.join(" · ")}
                  </div>
                  <ul className="space-y-2">
                    {project.points.map((point, i) => (
                      <li
                        key={i}
                        className="group relative pl-5 text-sm leading-relaxed text-muted transition-colors hover:text-fg"
                      >
                        <span className="absolute top-0 left-0 text-accent-deep transition-all duration-250 group-hover:translate-x-0.5 group-hover:text-accent">
                          ▸
                        </span>
                        <RichText text={point} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
