"use client";

import React, { useRef } from "react";
import TypeWriter from "@/app/components/ui/TypeWriter";
import BentoCard from "@/app/components/cards/BentoCard";
import { WHY_BRIDGE_FEATURES, SECTIONS } from "@/app/constants/landing-content";
import InlineIcon from "@/app/components/ui/InlineIcon";
import { USERS_ICON_PATH } from "@/app/constants/icons";
import NYCSkylineDecoration from "@/app/components/ui/NYCSkylineDecoration";
import { useStickyColumnHeight } from "@/app/hooks/useStickyColumnHeight";
import { ANIMATION_DELAYS } from "@/app/lib/animations";
import { IMAGE_PATHS } from "@/app/constants/image-paths";

/**
 * Why Bridge section with modern Bento grid layout
 * Left: Title with rotating words + subheading
 * Right: Asymmetric Bento grid showing all features
 */
export default function WhyBridgeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLDivElement>(null);

  // Calculate sticky column height to stop before skyline
  const leftColumnHeight = useStickyColumnHeight(sectionRef, skylineRef, {
    buffer: 70,
    updateDelay: 100,
  });

  return (
    <>
      <section
        ref={sectionRef}
        id={SECTIONS.WHY.id}
        className="relative py-16 md:py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-bridge-gradient-2)" }}
      >
        {/* NYC Skyline Decoration with Parallax */}
        <NYCSkylineDecoration ref={skylineRef} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Two-column grid layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Column: Title + Subheading - constrained height wrapper */}
            <div style={{ height: leftColumnHeight }}>
              <SectionHeader />
            </div>

            {/* Right Column: Bento Grid */}
            <div className="grid grid-cols-2 md:grid-rows-[auto,minmax(0,1fr),minmax(0,1fr)] gap-2 sm:gap-3 md:gap-4 mt-0">
              {/* Built For Busy People - Full width top (Row 1) */}
              <div className="col-span-2 self-start">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[0]}
                  variant="wide"
                  shadowDirection="top"
                  gradientDirection="bottom"
                  animationDelay={ANIMATION_DELAYS.NORMAL}
                />
              </div>

              {/* Curated, Not Crowded - Left column (Row 2) */}
              <div className="col-start-1 row-start-2 flex h-full">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[1]}
                  variant="standard"
                  shadowDirection="topRight"
                  gradientDirection="topRight"
                  animationDelay={ANIMATION_DELAYS.MEDIUM}
                />
              </div>

              {/* Five Minutes A Day - Left column (Row 3) */}
              <div className="col-start-1 row-start-3 flex h-full">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[2]}
                  variant="standard"
                  shadowDirection="bottomLeft"
                  gradientDirection="topRight"
                  animationDelay={ANIMATION_DELAYS.SLOWER}
                />
              </div>

              {/* We Match Better Together - Right column (Rows 2–3) */}
              <div className="col-start-2 row-start-2 row-span-2 flex h-full">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[3]}
                  variant="tall"
                  shadowDirection="right"
                  gradientDirection="left"
                  animationDelay={ANIMATION_DELAYS.SLOW}
                  backgroundImage={IMAGE_PATHS.BRIDGE_BG}
                  backgroundPosition="center 70%"
                >
                  <CommunityMatchContent />
                </BentoCard>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GradientTransition />
    </>
  );
}

/**
 * Section header with animated title and typewriter effect
 * Sticky positioning stops when container runs out of height (at skyline top)
 */
function SectionHeader() {
  return (
    <div className="space-y-4 md:space-y-6 md:sticky md:top-24 flex flex-col justify-center">
      <h2 className="font-body text-3xl sm:text-4xl md:text-5xl font-semibold text-bridge-text leading-tight opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
        What makes Bridge
        <br />
        <TypeWriter
          words={["for you", "different", "intentional", "effortless"]}
          typingSpeed={75}
          deletingSpeed={75}
        />
      </h2>
      <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
        <p className="text-bridge-text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
          The dating experience designed for people with purpose.
        </p>
        <p className="text-bridge-text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mt-2">
          Launching in <span className="text-bridge-blue">New York City</span> in 2026.
        </p>
      </div>
    </div>
  );
}

/**
 * Community match content with social proof badge
 */
function CommunityMatchContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bridge-blue/10 border border-bridge-blue/20">
        <InlineIcon path={USERS_ICON_PATH} className="text-bridge-blue flex-shrink-0" />
        <span className="text-xs font-medium text-bridge-blue whitespace-nowrap">
          Community matches made daily
        </span>
      </div>
    </div>
  );
}

/**
 * Gradient transition between sections
 */
function GradientTransition() {
  return (
    <div
      className="h-32"
      style={{
        background:
          "linear-gradient(to bottom, var(--color-bridge-gradient-2), var(--color-bridge-gradient-3))",
      }}
    />
  );
}
