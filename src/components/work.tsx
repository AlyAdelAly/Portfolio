"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type PointerEvent } from "react";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";
import {
  profile,
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
} from "@/content/site";
import { useReducedMotion } from "@/lib/hooks";

type FilterId = "all" | ProjectCategory;

const matches = (project: Project, filter: FilterId) =>
  filter === "all" || project.categories.includes(filter);

function ProjectCard({ project }: { project: Project }) {
  /** Feeds the pointer position into the card's radial highlight. */
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  return (
    <article
      onPointerMove={onPointerMove}
      className="group/card relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition-all duration-350 hover:-translate-y-1.5 hover:border-accent-deep hover:shadow-[0_26px_50px_-28px_rgba(0,0,0,0.95)]"
    >
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-400 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx,50%) var(--my,0%), rgba(94,234,212,0.14), transparent 62%)",
        }}
      />

      {project.image && project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="relative block aspect-16/10 overflow-hidden border-b border-line bg-raised"
        >
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
            className="object-cover object-top saturate-[0.92] transition-all duration-700 group-hover/card:scale-105 group-hover/card:saturate-105"
          />
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-panel/65 to-transparent to-45%" />
          <span className="absolute top-3 right-3 z-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10.5px] font-semibold text-ink shadow-[0_4px_14px_-4px_rgba(94,234,212,0.7)]">
            <span className="size-1.5 animate-pulse rounded-full bg-ink" />
            Live
          </span>
        </a>
      ) : (
        <div className="relative grid aspect-16/10 place-items-center overflow-hidden border-b border-line bg-raised">
          <div className="absolute inset-0 bg-grid opacity-55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, rgba(94,234,212,0.07), transparent 55%)",
            }}
          />
          <span className="relative font-mono text-3xl font-extrabold tracking-widest text-accent-deep transition-all duration-450 group-hover/card:scale-105 group-hover/card:text-accent">
            {project.monogram}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-semibold text-fg transition-colors duration-250 group-hover/card:text-accent">
            {project.title}
          </h3>
          <span className="shrink-0 rounded border border-line px-2 py-0.5 font-mono text-[10.5px] whitespace-nowrap text-faint transition-colors duration-250 group-hover/card:border-accent-deep group-hover/card:text-accent-deep">
            {project.tag}
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mb-2.5 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
          Key features
        </div>
        <ul className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="relative pl-4 text-xs leading-snug text-muted transition-colors hover:text-fg"
            >
              <span className="absolute top-1.5 left-0 h-px w-2.5 rounded bg-accent-deep transition-colors duration-250 group-hover/card:bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted transition-all duration-250 hover:-translate-y-0.5 hover:border-accent-deep hover:text-accent"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-3 border-t border-line-soft pt-4 font-mono text-xs">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-semibold text-accent transition-all duration-250 hover:gap-2.5"
            >
              Live preview
              <ArrowUpRightIcon className="size-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-faint">{project.note}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<FilterId>("all");
  const reduced = useReducedMotion();

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectFilters.map((f) => [
          f.id,
          projects.filter((p) => matches(p, f.id)).length,
        ]),
      ) as Record<FilterId, number>,
    [],
  );

  const visible = useMemo(
    () => projects.filter((p) => matches(p, filter)),
    [filter],
  );

  return (
    <Section id="work" title="Things I've Built" wide>
      <Reveal>
        <p className="-mt-6 mb-6 max-w-xl text-pretty text-muted">
          Recent work across AI products, dashboards, and internal platforms.
          Find more on my{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent-deep underline-offset-4 transition-colors hover:decoration-accent"
          >
            GitHub
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mb-7 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-md border px-3.5 py-2 font-mono text-xs transition-all duration-250 hover:-translate-y-0.5 ${
                filter === f.id
                  ? "border-accent bg-accent font-semibold text-ink"
                  : "border-line bg-panel text-muted hover:border-accent-deep hover:text-accent"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-[11px] opacity-60">
                {counts[f.id]}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        layout={!reduced}
        className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.title}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
