"use client";

import React, { useState, useEffect } from "react";
import TypeWriter from "@/app/components/ui/TypeWriter";
import Icon from "@/app/components/ui/Icon";
import { WHY_BRIDGE_FEATURES, SECTIONS } from "@/app/constants/landing-content";
import { cardClasses, getIconContainerClasses } from "@/app/lib/styles";

/**
 * Why Bridge section with Bumble-inspired two-column layout
 * Left: Title with rotating words + subheading
 * Right: Auto-rotating carousel of feature cards
 */
export default function WhyBridgeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WHY_BRIDGE_FEATURES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id={SECTIONS.WHY.id}
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bridge-gradient-2)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Two-column grid layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Title + Subheading */}
          <div className="space-y-6 md:pr-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-bridge-text leading-tight opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
              What makes Bridge{" "}
              <TypeWriter
                words={["for you", "different", "intentional", "effortless"]}
                typingSpeed={75}
                deletingSpeed={75}
              />
            </h2>
            <p className="text-lg md:text-xl text-bridge-text-muted leading-relaxed opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
              The dating experience designed for people with purpose.
            </p>
          </div>

          {/* Right Column: Stacked Cards Carousel */}
          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
            {WHY_BRIDGE_FEATURES.map((feature, idx) => {
              const isActive = idx === currentIndex;
              const isPrev = idx === (currentIndex - 1 + WHY_BRIDGE_FEATURES.length) % WHY_BRIDGE_FEATURES.length;
              const isNext = idx === (currentIndex + 1) % WHY_BRIDGE_FEATURES.length;

              return (
                <div
                  key={idx}
                  className={`${cardClasses} absolute w-full max-w-[400px] transition-all duration-700 ease-in-out`}
                  style={{
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    transform: isActive
                      ? "translateX(0) scale(1) rotate(0deg)"
                      : isPrev
                      ? "translateX(-80%) scale(0.85) rotate(-3deg)"
                      : isNext
                      ? "translateX(80%) scale(0.85) rotate(3deg)"
                      : "translateX(0) scale(0.8)",
                    zIndex: isActive ? 30 : isPrev || isNext ? 20 : 10,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className={`mx-auto mb-6 ${getIconContainerClasses("lg")}`}>
                    <Icon
                      path={feature.icon}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-bridge-text mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-bridge-text-muted leading-relaxed text-center">
                    {feature.desc}
                  </p>
                </div>
              );
            })}

            {/* Carousel Indicators */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {WHY_BRIDGE_FEATURES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-bridge-blue"
                      : "w-2 bg-bridge-border hover:bg-bridge-blue/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
