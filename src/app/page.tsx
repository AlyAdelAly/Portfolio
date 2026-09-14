"use client";

import { AnimatePresence, MotionConfig } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Gate } from "@/components/gate";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { BackToTop, EmailRail, SocialRail } from "@/components/rails";
import { Work } from "@/components/work";

const ENTERED_KEY = "portfolio:entered";

/** useLayoutEffect on the client, useEffect on the server, without the warning. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Home() {
  const [entered, setEntered] = useState(false);

  // Skip the gate for anyone who already passed it this session, or who
  // arrived on a deep link. Runs before paint, so there is no flash.
  useIsomorphicLayoutEffect(() => {
    const returning = sessionStorage.getItem(ENTERED_KEY) === "1";
    if (returning || window.location.hash) setEntered(true);
  }, []);

  // Hold the page still behind the gate.
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const onEnter = useCallback(() => {
    sessionStorage.setItem(ENTERED_KEY, "1");
    setEntered(true);
  }, []);

  return (
    // "user" honours prefers-reduced-motion for every Motion component below:
    // transforms are dropped, opacity fades are kept.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!entered && <Gate key="gate" onEnter={onEnter} />}
      </AnimatePresence>

      {/* Rendered on the server regardless of the gate, so crawlers and
          reduced-JS visitors still get the full page. */}
      <div inert={!entered} aria-hidden={!entered}>
        <Nav entered={entered} />
        <SocialRail />
        <EmailRail />

        <main className="lg:px-20">
          <Hero />
          <About />
          <Experience />
          <Work />
          <Education />
        </main>

        <div className="lg:px-20">
          <Contact />
        </div>

        <BackToTop />
      </div>
    </MotionConfig>
  );
}
