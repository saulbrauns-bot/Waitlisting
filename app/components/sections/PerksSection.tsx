"use client";

import { FOUNDING_MEMBER_PERKS } from "@/app/constants/landing-content";
import InlineIcon from "@/app/components/ui/InlineIcon";
import { STAR_ICON_PATH } from "@/app/constants/icons";
import AnimatedFree from "@/app/components/ui/AnimatedFree";

interface PerksSectionProps {
  backgroundColor?: string;
}

/**
 * Founding Member Perks section
 * Premium membership-style layout with spotlight hero and interactive feature cards
 */
export default function PerksSection({ backgroundColor }: PerksSectionProps) {
  return (
    <section
      id="perks"
      className="py-24 md:py-32 relative overflow-hidden"
      style={backgroundColor ? { backgroundColor } : { backgroundColor: "var(--color-bridge-background)" }}
    >
      <BackgroundDecoration />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
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
    <div className="text-center mb-16 md:mb-20">
      <ExclusiveBadge />
      <h2 className="text-4xl md:text-6xl font-bold text-bridge-text mb-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
        <span className="bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue bg-clip-text text-transparent">
          Founding Member
        </span>
        <br />
        <span className="text-bridge-text">Benefits</span>
      </h2>
      <p className="text-bridge-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
        Join the first 2,500 members and enjoy{" "}
        <span className="font-semibold text-bridge-blue">12 months of Bridge at no cost</span>.{" "}
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
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-bridge-blue/20 via-bridge-blue-dark/20 to-bridge-blue/20 border border-bridge-blue/40 mb-6 shadow-xl shadow-bridge-blue/20 backdrop-blur-sm opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
      <InlineIcon path={STAR_ICON_PATH} className="text-bridge-blue animate-pulse" />
      <span className="text-sm font-bold text-bridge-blue tracking-wider">LIMITED-TIME OFFER</span>
      <InlineIcon path={STAR_ICON_PATH} className="text-bridge-blue animate-pulse" />
    </div>
  );
}

/**
 * Large spotlight hero card featuring the main benefit
 */
function SpotlightHeroCard() {
  const heroPerk = FOUNDING_MEMBER_PERKS[0]; // "1 Year Free"

  return (
    <div className="mb-12 md:mb-16 opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white to-bridge-surface border-2 border-bridge-blue/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Icon and value */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-bridge-blue to-bridge-blue-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={heroPerk.icon} />
                </svg>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-bridge-text mb-3">
                  {heroPerk.title}
                </h3>
                <p className="text-bridge-text-muted text-lg md:text-xl">
                  {heroPerk.description}
                </p>
              </div>
            </div>

            {/* Right: Animated FREE */}
            <div className="flex flex-col items-center md:items-end justify-center space-y-6">
              <div className="flex flex-col items-center md:items-end">
                <span className="text-sm text-bridge-text-muted mb-2 font-medium">Founding Member Price</span>
                <AnimatedFree />
              </div>

              <div className="flex items-center gap-3 text-sm text-bridge-text-muted">
                <svg className="w-5 h-5 text-bridge-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
 * Value proposition with enhanced CTA
 */
function ValueProposition() {
  return (
    <div className="text-center max-w-3xl mx-auto opacity-0 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]">
      {/* CTA */}
      <a
        href="#waitlist"
        className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue text-white px-10 py-5 font-bold text-lg shadow-2xl shadow-bridge-blue/30 transition-all duration-300 ease-out hover:shadow-3xl hover:shadow-bridge-blue/50 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-bridge-blue-light/50 focus:ring-offset-2 relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <span className="relative">Secure Your Founding Member Spot</span>
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
