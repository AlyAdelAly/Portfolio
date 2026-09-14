"use client";

import type { PointerEvent } from "react";
import { ArrowRightIcon, socialIcons } from "./icons";
import { Reveal } from "./reveal";
import { profile, socials } from "@/content/site";

export function Contact() {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
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
    <footer id="contact" className="scroll-mt-24 border-t border-line py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal direction="scale">
          <div
            onPointerMove={onPointerMove}
            className="group relative overflow-hidden rounded-xl border border-line bg-panel px-6 py-12 text-center transition-colors duration-400 hover:border-accent-deep"
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-450 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(94,234,212,0.14), transparent 65%)",
              }}
            />

            <div className="relative">
              <p className="font-mono text-sm text-accent">05. What&apos;s next?</p>
              <h2 className="mt-3 font-mono text-3xl font-bold text-fg">
                Let&apos;s build something.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
                Open to frontend and full-stack opportunities. My inbox is
                always open — whether it&apos;s a role, a project, or just a
                question, I&apos;ll get back to you.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group/cta relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent-deep px-7 py-3.5 font-mono text-sm font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/8 hover:shadow-[0_12px_30px_-14px_var(--color-accent)]"
              >
                Say hello
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>

              <ul className="mt-10 flex items-center justify-center gap-2 md:hidden">
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
                        className="flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep hover:text-accent"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-9 text-center font-mono text-[11.5px] text-faint">
            Designed &amp; built by {profile.name} · Next.js, TypeScript &amp;
            Tailwind CSS
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
