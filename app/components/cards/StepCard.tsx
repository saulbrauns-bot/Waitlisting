import React from "react";
import type { StepItem } from "@/app/constants/landing-content";

interface StepCardProps {
  step: StepItem;
}

/**
 * Card component for displaying a numbered step in the "How it works" section
 */
export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="bg-bridge-surface border border-bridge-border rounded-2xl p-8 shadow-bridge hover:shadow-bridge-hover transition-shadow">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-bridge-blue text-3xl font-bold text-white shadow-lg">
        {step.num}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-bridge-text mb-3">
        {step.title}
      </h3>
      <p className="text-bridge-text-muted leading-relaxed">{step.desc}</p>
    </div>
  );
}
