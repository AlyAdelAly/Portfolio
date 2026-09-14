"use client";

import { motion } from "motion/react";
import { Monogram } from "./monogram";
import { ArrowRightIcon, socialIcons } from "./icons";
import { profile, socials } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks";

type GateProps = {
  onEnter: () => void;
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Full-screen intro. Mirrors the reference site: monogram, tagline, a single
 * CTA with an orbiting dot, and direct social links for anyone who only came
 * to find one.
 */
export function Gate({ onEnter }: GateProps) {
  const reduced = useReducedMotion();
  const step = (i: number) => ({
    duration: 0.7,
    delay: reduced ? 0 : 0.5 + i * 0.12,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-y-auto bg-ink px-6 py-16"
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div
        className="animate-drift pointer-events-none absolute top-[-25vh] left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(94,234,212,0.13), transparent 70%) 40% 45%/60% 90% no-repeat",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <Monogram size="hero" />

        <motion.p
          className="mt-10 font-mono text-sm text-accent"
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={step(0)}
        >
          Hi, I&apos;m {profile.name}
        </motion.p>

        <motion.h1
          className="mt-4 text-balance font-mono text-4xl font-extrabold tracking-tight text-fg sm:text-5xl"
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={step(1)}
        >
          I develop things for the{" "}
          <span className="text-gradient">web.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted"
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={step(2)}
        >
          {profile.intro} Currently at{" "}
          <a
            href={profile.currentCompanyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent-deep underline-offset-4 transition-colors hover:decoration-accent"
          >
            {profile.currentCompany}
          </a>
          .
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={step(3)}
        >
          <button
            type="button"
            onClick={onEnter}
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent-deep px-7 py-3.5 font-mono text-sm font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/8 hover:shadow-[0_12px_30px_-14px_var(--color-accent)]"
          >
            <span className="cta-orbit" aria-hidden />
            Explore Workspace
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        <motion.ul
          className="mt-12 flex items-center gap-2"
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={step(4)}
        >
          {socials.map((social) => {
            const Icon = socialIcons[social.icon];
            const external = social.href.startsWith("http");
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  title={social.label}
                  className="flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep hover:text-accent"
                >
                  <Icon className="size-4.5" />
                </a>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
}
