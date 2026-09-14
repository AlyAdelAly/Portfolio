"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Monogram } from "./monogram";
import { nav, profile } from "@/content/site";
import { useScrollSpy } from "@/lib/hooks";

const navIds = nav.map((item) => item.id);

export function Nav({ entered }: { entered: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(navIds, entered);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape so keyboard users aren't trapped behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-accent-deep to-accent shadow-[0_0_12px_rgba(94,234,212,0.5)]"
        style={{ scaleX: progress }}
      />

      <nav
        className={`border-b transition-all duration-300 backdrop-blur-lg ${
          scrolled
            ? "border-line bg-ink/92 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.9)]"
            : "border-transparent bg-ink/70"
        }`}
        aria-label="Primary"
      >
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-[height] duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label={`${profile.name} — back to top`}
          >
            <Monogram size="compact" animate={false} />
          </a>

          <ul className="hidden items-center gap-8 font-mono text-[13px] md:flex">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group relative py-1 transition-colors duration-200 ${
                    activeId === item.id
                      ? "text-accent"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  <span
                    className={`mr-1.5 transition-colors ${
                      activeId === item.id ? "text-accent-deep" : "text-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left rounded bg-accent transition-transform duration-350 ease-out-expo ${
                      activeId === item.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="relative size-10 rounded-lg border border-line transition-colors hover:border-accent-deep md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`absolute left-2.5 right-2.5 h-px rounded transition-all duration-350 ease-out-expo ${
                  menuOpen ? "bg-accent" : "bg-muted"
                }`}
                style={{
                  top: `${13.5 + i * 5.5}px`,
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(5.5px) rotate(45deg)"
                      : i === 1
                        ? "scaleX(0.4)"
                        : "translateY(-5.5px) rotate(-45deg)"
                    : undefined,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-b border-line bg-ink/97 backdrop-blur-lg md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="mx-auto max-w-5xl px-6 py-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 border-b border-line-soft py-3.5 font-mono text-sm transition-colors last:border-b-0 ${
                      activeId === item.id ? "text-accent" : "text-muted"
                    }`}
                  >
                    <span className="text-faint">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
