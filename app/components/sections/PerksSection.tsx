"use client";

import { EARLY_MEMBER_PERKS } from "@/app/constants/landing-content";
import InlineIcon from "@/app/components/ui/InlineIcon";
import { STAR_ICON_PATH } from "@/app/constants/icons";
import { ANIMATION_DELAYS } from "@/app/lib/animations";
import { scrollToSection } from "@/app/lib/scroll-utils";

interface PerksSectionProps {
  backgroundColor?: string;
}

/**
 * Early Member Perks section
 * Premium membership-style layout with spotlight hero and interactive feature cards
 */
export default function PerksSection({ backgroundColor }: PerksSectionProps) {
  return (
    <section
      id="perks"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      style={backgroundColor ? { backgroundColor } : { backgroundColor: "var(--color-bridge-background)" }}
    >
      <BackgroundDecoration />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <SectionHeader />
        <SpotlightHeroCard />
        <ValueProposition />
      </div>
    </section>
  );
}

/**
 * Premium background with animated gradients
 */
function BackgroundDecoration() {
  return (
    <>
      <div className="absolute inset-0 bg-bridge-radial-accent pointer-events-none opacity-40" />
      {/* Premium floating orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-bridge-blue/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-bridge-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
    </>
  );
}

/**
 * Section header with premium badge
 */
function SectionHeader() {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-18">
      <ExclusiveBadge />
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bridge-text mb-3 sm:mb-4 md:mb-5 px-2">
        <span className="text-bridge-text">Early Member </span>
        <span className="bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue bg-clip-text text-transparent">
          Reward
        </span>
      </h2>
      <p className="text-bridge-text-muted text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-3 sm:px-4">
        <span className="md:whitespace-nowrap">Join the first 2,500 members and enjoy{" "}
        <span className="font-medium text-bridge-blue">12 months of Bridge at no cost</span>.</span>
        <br className="hidden md:block" />{" "}
        Spots are limited.
      </p>
    </div>
  );
}

/**
 * Exclusive membership badge
 */
function ExclusiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-bridge-blue/20 via-bridge-blue-dark/20 to-bridge-blue/20 border border-bridge-blue/40 mb-6 shadow-xl shadow-bridge-blue/20 backdrop-blur-sm">
      <InlineIcon path={STAR_ICON_PATH} className="text-bridge-blue animate-pulse" />
      <span className="text-sm font-medium text-bridge-blue tracking-wider">LIMITED-TIME OFFER</span>
      <InlineIcon path={STAR_ICON_PATH} className="text-bridge-blue animate-pulse" />
    </div>
  );
}

/**
 * Large spotlight hero card featuring the main benefit
 */
function SpotlightHeroCard() {
  const heroPerk = EARLY_MEMBER_PERKS[0]; // "1 Year Free"

  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-14">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white to-bridge-surface border-2 border-bridge-blue/30 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="relative grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            {/* Left: Icon and value */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4 md:space-y-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-bridge-blue to-bridge-blue-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={heroPerk.icon} />
                </svg>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-bridge-text mb-1.5 sm:mb-2 md:mb-3">
                  {heroPerk.title}
                </h3>
                <p className="text-bridge-text-muted text-sm sm:text-base md:text-lg lg:text-xl">
                  {heroPerk.description}
                </p>
              </div>
            </div>

            {/* Right: Static pricing */}
            <div className="flex flex-col items-center md:items-end justify-center space-y-4 md:space-y-6">
              <div className="flex flex-col items-center md:items-end">
                <span className="text-xs sm:text-sm text-bridge-text-muted mb-2 font-medium">Early Member Price</span>
                <div
                  className="text-5xl sm:text-6xl md:text-7xl font-medium text-transparent bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue bg-clip-text"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(74, 144, 226, 0.4))' }}
                >
                  FREE
                </div>
                <span className="text-xs sm:text-sm text-bridge-text-muted mt-1">for 12 months</span>
              </div>

              <div className="flex items-center gap-2 md:gap-3 text-xs sm:text-sm text-bridge-text-muted">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-bridge-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Cancel anytime with no penalty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of additional perks (cards 2-4)
 */
function AdditionalPerksGrid() {
  const additionalPerks = EARLY_MEMBER_PERKS.slice(1); // Get perks 2-4

  return (
    <div className={`grid md:grid-cols-3 gap-6 mb-12 md:mb-16 opacity-0 animate-[fadeIn_0.8s_ease-out_${ANIMATION_DELAYS.SLOW}s_forwards]`}>
      {additionalPerks.map((perk) => (
        <div
          key={perk.title}
          className="group relative"
        >
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-bridge-blue/30 to-bridge-blue-dark/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Card */}
          <div className="relative bg-white border border-bridge-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bridge-blue/10 to-bridge-blue-dark/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-bridge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={perk.icon} />
              </svg>
            </div>

            {/* Content */}
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-bridge-text mb-3">
              {perk.title}
            </h3>
            <p className="text-bridge-text-muted leading-relaxed">
              {perk.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Value proposition with enhanced CTA
 */
function ValueProposition() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* CTA */}
      <a
        href="#waitlist"
        onClick={scrollToSection('waitlist')}
        className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue text-white px-8 py-4 font-medium text-lg shadow-2xl shadow-bridge-blue/30 transition-all duration-300 ease-out hover:shadow-3xl hover:shadow-bridge-blue/50 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-bridge-blue-light/50 focus:ring-offset-2 relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <span className="relative">Secure Your Spot</span>
        <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>

      <div className="mt-6 flex items-center justify-center gap-4 text-sm text-bridge-text-muted">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-bridge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Limited to first 2,500 members</span>
        </div>
        <span className="text-bridge-border">•</span>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-bridge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>No credit card required</span>
        </div>
      </div>
    </div>
  );
}
