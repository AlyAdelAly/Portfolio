"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, MailIcon, PinIcon } from "./icons";
import { heroPhrases, jobs, profile } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks";

/** Cycles the status line one character at a time, pausing on each phrase. */
function useTypewriter(phrases: string[], enabled: boolean) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (!enabled) return;

    let phrase = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[phrase];
      chars += deleting ? -1 : 1;
      setText(full.slice(0, chars));

      let delay = deleting ? 26 : 48;
      if (!deleting && chars === full.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && chars === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 320;
      }
      timer = setTimeout(tick, delay);
    };

    // Clear inside the callback so the server-rendered phrase stays put until
    // the animation actually takes over.
    timer = setTimeout(() => {
      setText("");
      timer = setTimeout(tick, 220);
    }, 500);
    return () => clearTimeout(timer);
  }, [phrases, enabled]);

  return text;
}

const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

/** Most recent role — jobs are ordered newest first. */
const currentRole = jobs[0];

export function Hero() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(heroPhrases, !reduced);

  const step = (i: number) => ({
    duration: 0.85,
    delay: reduced ? 0 : i * 0.1,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  const terminalLine = (i: number) => ({
    duration: 0.55,
    delay: reduced ? 0 : 0.7 + i * 0.12,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <header id="top" className="relative overflow-hidden pt-24 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
      <div
        className="animate-drift pointer-events-none absolute top-[-30vh] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 blur-3xl"

      />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.p
          className="flex items-center gap-2 font-mono text-sm text-accent"
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={step(0)}
        >
          <span className="text-faint">$</span> whoami
          <span className="animate-blink inline-block h-4 w-2 bg-accent align-[-2px]" />
        </motion.p>

        <motion.h1
          className="mt-7 font-mono text-[clamp(2.25rem,6vw,3.6rem)] leading-[1.08] font-extrabold tracking-tight text-fg"
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={step(1)}
        >
          {profile.name}.
          <br />
          <span className="text-gradient">{profile.title}.</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={step(2)}
        >
          Building scalable, accessible interfaces with{" "}
          <strong className="font-semibold text-fg">React</strong>,{" "}
          <strong className="font-semibold text-fg">Next.js</strong>, and{" "}
          <strong className="font-semibold text-fg">Vue</strong> — with
          full-stack range across{" "}
          <strong className="font-semibold text-fg">Python</strong> and{" "}
          <strong className="font-semibold text-fg">Django</strong>.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3 font-mono text-[13px]"
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={step(3)}
        >
          <span className="flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-muted">
            <PinIcon className="size-4" />
            {profile.location}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-muted transition-all duration-250 hover:-translate-y-0.5 hover:border-accent-deep hover:bg-accent/5 hover:text-accent"
          >
            <MailIcon className="size-4" />
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-muted transition-all duration-250 hover:-translate-y-0.5 hover:border-accent-deep hover:bg-accent/5 hover:text-accent"
          >
            github/AlyAdelAly
            <ArrowUpRightIcon className="size-3" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-muted transition-all duration-250 hover:-translate-y-0.5 hover:border-accent-deep hover:bg-accent/5 hover:text-accent"
          >
            in/aly-adel
            <ArrowUpRightIcon className="size-3" />
          </a>
        </motion.div>

        {/* Terminal card — the signature of the previous portfolio, kept. */}
        <motion.div
          className="mt-14 overflow-hidden rounded-xl border border-line bg-panel shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-colors duration-350 hover:border-[#26313f]"
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={step(4)}
        >
          <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
            {["#5f6573", "#7a7f8c", "#9aa0ab"].map((color) => (
              <span
                key={color}
                className="size-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="ml-2.5 font-mono text-xs text-faint">stack.sh</span>
          </div>

          <div className="space-y-1 p-6 font-mono text-[13.5px] leading-[1.85] text-muted">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(0)}
            >
              <span className="text-accent">❯</span> cat{" "}
              <span className="text-[#f0b86e]">current_role.txt</span>
            </motion.p>
            <motion.p
              className="text-fg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(1)}
            >
              {currentRole.role} @ {currentRole.company}{" "}
              <span className="text-faint">{`// ${currentRole.range}`}</span>
            </motion.p>

            <motion.p
              className="pt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(2)}
            >
              <span className="text-accent">❯</span> ls{" "}
              <span className="text-[#f0b86e]">./core-stack</span>
            </motion.p>
            <motion.p
              className="flex flex-wrap gap-x-3 text-[#a3a9ff]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(3)}
            >
              {["react", "next.js", "vue", "typescript", "tailwind", "django"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="inline-block transition-all duration-250 hover:-translate-y-0.5 hover:text-[#c6cbff]"
                  >
                    {tech}
                  </span>
                ),
              )}
            </motion.p>

            <motion.p
              className="pt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(4)}
            >
              <span className="text-accent">❯</span> echo{" "}
              <span className="text-[#f0b86e]">$STATUS</span>
            </motion.p>
            <motion.p
              className="text-fg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={terminalLine(5)}
            >
              {typed}
              <span className="animate-blink ml-0.5 inline-block h-4 w-2 bg-accent align-[-2px]" />
            </motion.p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
