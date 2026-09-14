"use client";

import { Reveal } from "./reveal";
import { RichText, Section } from "./section";
import { education } from "@/content/site";

export function Education() {
  return (
    <Section id="education" title="Education">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line-soft pb-4">
          <div>
            <div className="font-semibold text-fg">{education.degree}</div>
            <div className="mt-0.5 text-accent">{education.school}</div>
          </div>
          <div className="font-mono text-xs text-faint">
            {education.range} · {education.gpa}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-4 leading-relaxed text-muted">
          <RichText text={education.project} />
        </p>
      </Reveal>

      <Reveal delay={170}>
        <p className="mt-4 font-mono text-xs text-faint">
          {education.military}
        </p>
      </Reveal>
    </Section>
  );
}
