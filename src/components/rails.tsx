"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpIcon, socialIcons } from "./icons";
import { profile, socials } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks";

const railEnter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/** Fixed social column on the left edge — hidden below the lg breakpoint. */
export function SocialRail() {
  return (
    <motion.div
      className="fixed bottom-0 left-8 z-40 hidden lg:block"
      {...railEnter(1.1)}
    >
      <ul className="flex flex-col items-center gap-4 after:mt-4 after:block after:h-24 after:w-px after:bg-line">
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
                className="block p-1.5 text-muted transition-all duration-250 hover:-translate-y-1 hover:text-accent"
              >
                <Icon className="size-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/** Fixed vertical email on the right edge. */
export function EmailRail() {
  return (
    <motion.div
      className="fixed right-8 bottom-0 z-40 hidden lg:block"
      {...railEnter(1.2)}
    >
      <div className="flex flex-col items-center gap-6 after:block after:h-24 after:w-px after:bg-line">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-xs tracking-[0.1em] text-muted transition-all duration-250 hover:-translate-y-1 hover:text-accent"
          style={{ writingMode: "vertical-rl" }}
        >
          {profile.email}
        </a>
      </div>
    </motion.div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }
      className={`fixed right-6 bottom-6 z-60 grid size-11 place-items-center rounded-xl border border-line bg-panel/90 text-muted backdrop-blur transition-all duration-350 hover:border-accent-deep hover:text-accent ${
        show
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100 hover:-translate-y-1"
          : "pointer-events-none translate-y-3 scale-90 opacity-0"
      }`}
    >
      <ArrowUpIcon className="size-4" />
    </button>
  );
}
