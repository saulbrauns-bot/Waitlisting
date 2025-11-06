"use client";

import React from "react";

interface Testimonial {
  quote: string;
  name: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "Met someone in week 2. Loved the pace.", name: "Sarah K." },
  { quote: "No swiping. Way less draining.", name: "Michael R." },
  { quote: "Felt curated and respectful of time.", name: "Jessica L." },
  { quote: "Matches felt aligned with my schedule.", name: "David M." },
  { quote: "I finally stopped doom-scrolling dating apps.", name: "Emily T." },
  { quote: "Thoughtful intros, not random chats.", name: "Alex P." },
];

/**
 * Horizontal scrolling testimonials conveyor
 * Displays authentic user quotes in an infinite scroll
 */
export default function TestimonialsConveyor() {
  // Duplicate list to enable seamless infinite scroll
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="bg-bridge-background border-y border-bridge-border py-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6">
        <h3 className="font-heading text-xl font-medium text-bridge-text text-center">
          What people are saying
        </h3>
      </div>

      {/* Infinite scrolling testimonials */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex gap-4 motion-safe:animate-[scroll_50s_linear_infinite]"
          style={{ willChange: "transform" }}
        >
          {items.map((testimonial, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white/80 backdrop-blur-sm border border-bridge-border rounded-xl px-6 py-4 min-w-[320px] max-w-[320px]"
            >
              <p className="text-bridge-text text-base leading-relaxed mb-3">
                "{testimonial.quote}"
              </p>
              <p className="text-bridge-text-muted text-sm font-medium">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
