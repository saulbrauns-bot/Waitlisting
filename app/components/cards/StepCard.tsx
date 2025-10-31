import React from "react";
import type { StepItem } from "@/app/constants/landing-content";

interface StepCardProps {
  step: StepItem;
}

/**
 * Card component for displaying a numbered step in the "How it works" section
 * Features visual flow with numbered badge, progress dot, and subtle hover effects
 */
export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Progress dot positioned below badge - visible on desktop */}
      <div className="absolute top-[4.5rem] hidden md:block h-3 w-3 rounded-full bg-bridge-blue shadow-sm" />

      {/* Progress dot positioned to the left of badge - visible on mobile */}
      <div className="absolute left-0 top-8 md:hidden h-3 w-3 rounded-full bg-bridge-blue shadow-sm" />

      {/* Card content */}
      <div className="relative bg-bridge-surface border border-bridge-border rounded-2xl p-8 shadow-bridge hover:shadow-bridge-hover hover:-translate-y-[1px] transition-all duration-300 ease-out group h-full w-full">
        {/* Subtle hover inner glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_0_1px_rgba(60,126,219,0.1)]" />

        {/* Numbered badge */}
        <div className="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-bridge-blue-light via-bridge-blue to-bridge-blue shadow-lg text-3xl font-bold text-white">
          {step.num}
        </div>

        {/* Title aligned with badge baseline */}
        <h3 className="text-xl md:text-2xl font-semibold text-bridge-text mb-3 leading-tight">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-bridge-text-muted leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}
