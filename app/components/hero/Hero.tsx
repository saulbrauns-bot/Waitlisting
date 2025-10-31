"use client";

import React, { useEffect, useState } from "react";
import TestimonialsConveyor from "@/app/components/testimonials/TestimonialsConveyor";
import LinkButton from "@/app/components/ui/LinkButton";

const LINE1_FULL = "Dating for busy";
const LINE2_FULL = "professionals";
const TYPING_INTERVAL_MS = 70;

export default function Hero() {

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const handler = () => setReduced(media.matches);
    media.addEventListener?.("change", handler);

    if (media.matches) {
      // Instant display for reduced motion
      setLine1(LINE1_FULL);
      setLine2(LINE2_FULL);
      return () => media.removeEventListener?.("change", handler);
    }

    // Typing animation - Line 1 first
    let i = 0;
    const line1Interval = setInterval(() => {
      i++;
      setLine1(LINE1_FULL.slice(0, i));
      if (i >= LINE1_FULL.length) {
        clearInterval(line1Interval);

        // Start Line 2 after Line 1 completes
        let j = 0;
        const line2Interval = setInterval(() => {
          j++;
          setLine2(LINE2_FULL.slice(0, j));
          if (j >= LINE2_FULL.length) {
            clearInterval(line2Interval);
          }
        }, TYPING_INTERVAL_MS);
      }
    }, TYPING_INTERVAL_MS);

    return () => {
      clearInterval(line1Interval);
      media.removeEventListener?.("change", handler);
    };
  }, []);

  // Determine which line should show the caret
  const showCaretLine1 = !reduced && line1.length < LINE1_FULL.length;
  const showCaretLine2 = !reduced && line1.length === LINE1_FULL.length && line2.length < LINE2_FULL.length;

  return (
    <section className="bg-bridge-background bg-grain">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        {/* Left column */}
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-bridge-text">
            <span className="inline-flex items-end">
              {line1}
              {showCaretLine1 && (
                <span
                  className="w-[2px] h-[1em] bg-bridge-text ml-1 inline-block align-bottom animate-[caret_1s_steps(1)_infinite]"
                  aria-hidden="true"
                />
              )}
            </span>
            <br />
            <span className="text-bridge-blue inline-flex items-end">
              {line2}
              {showCaretLine2 && (
                <span
                  className="w-[2px] h-[1em] bg-bridge-blue ml-1 inline-block align-bottom animate-[caret_1s_steps(1)_infinite]"
                  aria-hidden="true"
                />
              )}
            </span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-bridge-text-muted max-w-prose">
            One curated match at a time. Designed for people who value their time.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <LinkButton href="#waitlist">Join waitlist</LinkButton>

            <span
              className="inline-flex items-center gap-2 rounded-full bg-bridge-surface border border-bridge-border px-3 py-1.5 text-sm text-bridge-text"
              aria-label="Over five hundred professionals on the list"
            >
              <svg
                className="h-4 w-4 text-bridge-blue"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span>
                <span className="font-medium text-bridge-blue">500+</span>{" "}
                professionals
              </span>
            </span>
          </div>
        </div>

        {/* Right column */}
        <TestimonialsConveyor />
      </div>
    </section>
  );
}
