import React from "react";
import type { FeatureItem } from "@/app/constants/landing-content";

interface FeatureCardProps {
  feature: FeatureItem;
}

/**
 * Card component for displaying a feature with an icon in the "Why Bridge" section
 */
export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-bridge-surface border border-bridge-border rounded-2xl p-8 shadow-bridge hover:shadow-bridge-hover transition-shadow text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bridge-blue shadow-lg">
        <svg
          className="h-10 w-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={feature.icon}
          />
        </svg>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-bridge-text mb-3">
        {feature.title}
      </h3>
      <p className="text-bridge-text-muted leading-relaxed">{feature.desc}</p>
    </div>
  );
}
