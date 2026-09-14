"use client";

import { Reveal } from "./reveal";
import { RichText, Section } from "./section";
import { about, skills } from "@/content/site";
import { useCountUp, useInView } from "@/lib/hooks";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  const count = useCountUp(value, inView);

  return (
    <div
      ref={ref}
      className="rounded-lg border border-line bg-panel px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep hover:bg-raised"
    >
      <div className="flex items-baseline gap-px font-mono text-2xl font-extrabold text-accent">
        {count}
        {suffix ? (
          <span className="text-lg text-accent-deep">{suffix}</span>
        ) : null}
      </div>
      <div className="mt-1.5 font-mono text-[11px] tracking-[0.07em] text-faint uppercase">
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          {about.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="mb-4 text-pretty leading-relaxed text-muted last:mb-0">
                <RichText text={paragraph} />
              </p>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 70} direction="right">
              <div className="rounded-lg border border-line bg-panel px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-deep hover:bg-raised">
                <div className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-faint uppercase">
                  {group.label}
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line bg-raised px-2.5 py-1 font-mono text-xs text-muted transition-all duration-250 hover:-translate-y-0.5 hover:border-accent-deep hover:bg-accent/6 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
