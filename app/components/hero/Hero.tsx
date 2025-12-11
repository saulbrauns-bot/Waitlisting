"use client";

import React, { useCallback, useEffect, useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import TypingText from "@/app/components/hero/TypingText";
import { prefersReducedMotion } from "@/app/lib/animations";
import { scrollToSection } from "@/app/lib/scroll-utils";

const HERO_LINE_1 = "The community finds the fit.";
const HERO_LINE_2 = "We Bridge the gap.";

export default function Hero() {
  // Initialize state based on reduced motion preference
  const [startLine2, setStartLine2] = useState(() => prefersReducedMotion());
  const [showContent, setShowContent] = useState(() => prefersReducedMotion());

  const handleLine1Complete = useCallback(() => {
    // Start typing line 2 immediately after line 1 completes
    setStartLine2(true);
  }, []);

  const handleLine2Complete = useCallback(() => {
    // Show rest of content after line 2 completes
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-dvh flex flex-col">
      {/* Wavy Background Effect - Simplified for mobile */}
      <WavyBackground
        containerClassName="absolute inset-0"
        colors={["#027BCE", "#B3D4FF", "#025a96"]}
        waveWidth={70}
        backgroundFill="#FEFEFE"
        blur={10}
        speed="slow"
        waveOpacity={0.15}
        className="absolute inset-0 hidden md:block"
      />
      {/* Static gradient background for mobile (better performance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-bridge-primary-light/5 to-white md:hidden" />

      <div className="max-w-4xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-16 md:py-24 lg:py-32 flex-1 flex flex-col items-center justify-center text-center relative z-20">
        {/* Centered hero content */}
        <div className="w-full flex flex-col items-center">
          <h1
            className="font-heading text-[1.75rem] leading-[1.2] sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl font-bold text-bridge-text mb-3 sm:mb-6 md:mb-8 flex flex-col items-center justify-center text-center w-full"
            style={{
              textShadow: '0 0 20px rgba(26, 26, 26, 0.15), 0 2px 8px rgba(26, 26, 26, 0.12), 0 4px 12px rgba(26, 26, 26, 0.08)'
            }}
          >
            <div className="whitespace-nowrap">
              <TypingText
                text={HERO_LINE_1}
                onComplete={handleLine1Complete}
                delay={300}
                shouldStart={true}
              />
            </div>
            <div className="whitespace-nowrap">
              <TypingText
                text={HERO_LINE_2}
                onComplete={handleLine2Complete}
                delay={0}
                shouldStart={startLine2}
              />
            </div>
          </h1>

          {/* Content that appears after typing */}
          <div
            className={`transition-all duration-700 w-full flex flex-col items-center ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p
              className="font-body text-sm leading-[1.4] sm:text-lg md:text-xl lg:text-2xl sm:leading-normal text-bridge-text-secondary max-w-2xl mx-auto mb-3 sm:mb-8 md:mb-10 px-2 sm:px-2 text-center"
              style={{
                textShadow: '0 1px 3px rgba(74, 85, 104, 0.08), 0 2px 6px rgba(74, 85, 104, 0.05)'
              }}
            >
              Curated matches shaped by real community insight.
            </p>

            {/* Join Waitlist Button - Wider to match box with animated gradient swoop */}
            <div className="mb-0 sm:mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto w-full px-2 sm:px-2 md:px-4">
              <a
                href="#waitlist"
                onClick={scrollToSection('waitlist')}
                className="font-body group relative flex items-center justify-center rounded-xl bg-bridge-blue text-white w-full py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-bridge-blue focus:ring-offset-2"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease-out, box-shadow 0.3s ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 0 0 1px rgba(74, 144, 226, 0.5),
                    0 0 20px rgba(74, 144, 226, 0.4),
                    0 0 40px rgba(74, 144, 226, 0.3),
                    0 20px 40px -10px rgba(30, 107, 214, 0.4)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                }}
              >
                {/* Swooping gradient overlay that moves left to right */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  }}
                ></span>

                {/* Button text */}
                <span className="relative z-10">Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue indicator - hidden on mobile to save space */}
      {showContent && (
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-0 animate-[fadeIn_0.6s_ease-out_0.5s_forwards]">
          <a
            href="#testimonials"
            className="flex flex-col items-center gap-1 text-bridge-text-muted hover:text-bridge-blue transition-colors"
            aria-label="Scroll to learn more"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}
