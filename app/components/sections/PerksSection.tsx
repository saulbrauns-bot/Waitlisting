import React from "react";
import { FOUNDING_MEMBER_PERKS } from "@/app/constants/landing-content";
import Icon from "@/app/components/ui/Icon";

interface PerksSectionProps {
  backgroundColor?: string;
}

/**
 * Founding Member Perks section
 * Highlights exclusive benefits for early waitlist signups
 */
export default function PerksSection({ backgroundColor }: PerksSectionProps) {
  return (
    <section
      id="perks"
      className="py-24 md:py-32 relative overflow-hidden"
      style={backgroundColor ? { backgroundColor } : { backgroundColor: "var(--color-bridge-background)" }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-bridge-radial-accent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bridge-blue/10 border border-bridge-blue/20 mb-4">
            <svg className="h-4 w-4 text-bridge-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-bridge-blue">Limited Time Offer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-bridge-text mb-4">
            Founding Member Benefits
          </h2>
          <p className="text-bridge-text-muted text-lg max-w-2xl mx-auto">
            Join the waitlist now and unlock exclusive perks reserved for our earliest supporters
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {FOUNDING_MEMBER_PERKS.map((perk, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-bridge-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bridge-blue/10 flex items-center justify-center">
                  <Icon path={perk.icon} className="text-bridge-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-bridge-text mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-bridge-text-muted leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-bridge-text-muted mb-4">
            <span className="font-semibold text-bridge-text">Total Value: $278+</span> • Yours free as a founding member
          </p>
          <a
            href="#waitlist"
            className="inline-block rounded-xl bg-bridge-blue text-white px-8 py-4 font-semibold shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:shadow-bridge-blue/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2"
          >
            Claim Your Founding Member Spot →
          </a>
        </div>
      </div>
    </section>
  );
}
