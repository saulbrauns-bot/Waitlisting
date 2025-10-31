"use client";

import React from "react";

const QUOTES: string[] = [
  "Met someone in week 2. Loved the pace.",
  "No swiping. Way less draining.",
  "Felt curated and respectful of time.",
  "Matches felt aligned with my schedule.",
  "I finally stopped doom-scrolling dating apps.",
  "Thoughtful intros, not random chats.",
];

export default function TestimonialsConveyor() {
  // Duplicate list to enable seamless loop across 0% -> 100%
  const items = [...QUOTES, ...QUOTES];

  return (
    <aside className="rounded-2xl border border-bridge-border bg-bridge-surface shadow-bridge p-4 md:p-6 overflow-hidden">
      <div className="relative h-64 md:h-80 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <ul
          className="space-y-4 motion-safe:animate-[scrollY_30s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
          aria-label="What people are saying"
        >
          {items.map((q, i) => (
            <li
              key={i}
              className="text-bridge-text text-sm md:text-base leading-relaxed"
            >
              "{q}"
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
