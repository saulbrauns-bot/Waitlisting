"use client";

import React from "react";
import TypeWriter from "@/app/components/ui/TypeWriter";
import BentoCard from "@/app/components/cards/BentoCard";
import { WHY_BRIDGE_FEATURES, SECTIONS } from "@/app/constants/landing-content";
import InlineIcon from "@/app/components/ui/InlineIcon";
import { USERS_ICON_PATH } from "@/app/constants/icons";
import { ANIMATION_DELAYS } from "@/app/lib/animations";
import { IMAGE_PATHS } from "@/app/constants/image-paths";

/**
 * Why Bridge section with modern Bento grid layout
 * Left: Title with rotating words + subheading
 * Right: Asymmetric Bento grid showing all features
 */
export default function WhyBridgeSection() {
  return (
    <>
      {/* Top gradient fade from Hero section */}
      <div
        className="h-16 md:h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 20%, var(--color-bridge-gradient-2) 100%)",
        }}
      />

      <section
        id={SECTIONS.WHY.id}
        className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
        style={{ backgroundColor: "var(--color-bridge-gradient-2)" }}
      >
        {/* Subtle side gradient fades for seamless integration - desktop only */}
        <div
          className="hidden md:block absolute inset-y-0 left-0 w-24 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to right, var(--color-bridge-gradient-2), transparent)",
          }}
        />
        <div
          className="hidden md:block absolute inset-y-0 right-0 w-24 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to left, var(--color-bridge-gradient-2), transparent)",
          }}
        />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Two-column grid layout */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Left Column: Title + Subheading */}
            <div className="mb-0">
              <SectionHeader />
            </div>

            {/* Right Column: Bento Grid */}
            <div className="grid grid-cols-2 md:grid-rows-[minmax(0,1fr),minmax(0,1fr)] gap-2 sm:gap-3 md:gap-4 max-w-full">
              {/* Curated, Not Crowded - Left column (Row 1) */}
              <div className="col-span-1 flex h-full">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[0]}
                  variant="standard"
                  shadowDirection="topRight"
                  gradientDirection="topRight"
                  animationDelay={ANIMATION_DELAYS.MEDIUM}
                />
              </div>

              {/* We Match Better Together - Right column (Rows 1–2) */}
              <div className="col-span-1 row-span-2 flex h-full min-w-0">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[2]}
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

              {/* Five Minutes A Day - Left column (Row 2) */}
              <div className="col-span-1 flex h-full">
                <BentoCard
                  feature={WHY_BRIDGE_FEATURES[1]}
                  variant="standard"
                  shadowDirection="bottomLeft"
                  gradientDirection="topRight"
                  animationDelay={ANIMATION_DELAYS.SLOWER}
                />
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
 * Sticky positioning handled by parent wrapper on desktop only
 */
function SectionHeader() {
  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
      <h2 className="font-body text-3xl sm:text-4xl md:text-5xl font-semibold text-bridge-text leading-tight md:opacity-0 md:animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
        What makes Bridge
        <br />
        <TypeWriter
          words={["for you", "different", "intentional", "effortless"]}
          typingSpeed={75}
          deletingSpeed={75}
        />
      </h2>
      <div className="md:opacity-0 md:animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
        <p className="text-bridge-text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
          Beta launching at <span className="text-bridge-blue font-medium">Rice</span> February 28th.
        </p>
      </div>
    </div>
  );
}

/**
 * Community match content with social proof badge
 * Hidden on mobile to reduce visual clutter
 */
function CommunityMatchContent() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full">
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
      className="h-16 md:h-24"
      style={{
        background:
          "linear-gradient(to bottom, var(--color-bridge-gradient-2) 0%, var(--color-bridge-gradient-2) 20%, var(--color-bridge-gradient-3) 100%)",
      }}
    />
  );
}
