"use client";

import React, { useCallback, useEffect, useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import TypingText from "@/app/components/hero/TypingText";
import { prefersReducedMotion } from "@/app/lib/animations";

const HERO_LINE_1 = "Busy People";
const HERO_LINE_2 = "for Busy People";

export default function Hero() {
  const [startLine2, setStartLine2] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // For users with reduced motion, show everything immediately
    if (prefersReducedMotion()) {
      setStartLine2(true);
      setShowContent(true);
    }
  }, []);

  const handleLine1Complete = useCallback(() => {
    // Start typing line 2 immediately after line 1 completes
    setStartLine2(true);
  }, []);

  const handleLine2Complete = useCallback(() => {
    // Show rest of content after line 2 completes
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Wavy Background Effect */}
      <WavyBackground
        containerClassName="absolute inset-0"
        colors={["#4A90E2", "#B3D4FF", "#1E6BD6"]}
        waveWidth={70}
        backgroundFill="#FEFEFE"
        blur={10}
        speed="slow"
        waveOpacity={0.15}
        className="absolute inset-0"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-32 flex-1 flex flex-col items-center justify-center text-center relative z-20">
        {/* Centered hero content */}
        <div className="w-full">
          <h1
            className="text-5xl md:text-7xl font-semibold leading-tight text-bridge-text mb-8"
            style={{
              textShadow: '0 0 20px rgba(26, 26, 26, 0.15), 0 2px 8px rgba(26, 26, 26, 0.12), 0 4px 12px rgba(26, 26, 26, 0.08)'
            }}
          >
            <TypingText
              text={HERO_LINE_1}
              onComplete={handleLine1Complete}
              delay={300}
              shouldStart={true}
            />
            <br />
            <TypingText
              text={HERO_LINE_2}
              onComplete={handleLine2Complete}
              delay={0}
              shouldStart={startLine2}
            />
          </h1>

          {/* Content that appears after typing */}
          <div
            className={`transition-all duration-700 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p
              className="text-xl md:text-2xl text-bridge-text-secondary max-w-2xl mx-auto mb-10 font-medium"
              style={{
                textShadow: '0 1px 3px rgba(74, 85, 104, 0.08), 0 2px 6px rgba(74, 85, 104, 0.05)'
              }}
            >
              One curated match. Real connection.<br />
              Thoughtful dating that takes just minutes a day.
            </p>

            {/* Join Waitlist Button - Wider to match box with animated gradient swoop */}
            <div className="mb-10 max-w-3xl mx-auto w-full px-4">
              <a
                href="#waitlist"
                className="group relative flex items-center justify-center rounded-xl bg-bridge-blue text-white w-full py-3.5 text-base font-semibold overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-bridge-blue focus:ring-offset-2"
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
                <span className="relative z-10">Join Waitlist</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue indicator */}
      {showContent && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-0 animate-[fadeIn_0.6s_ease-out_0.5s_forwards]">
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
