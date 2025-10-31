import React from "react";

interface SocialProofBadgeProps {
  count: string;
  label: string;
  className?: string;
}

/**
 * Enhanced social proof badge with prominent styling
 * Shows number of professionals joined with increased visual hierarchy
 */
export default function SocialProofBadge({
  count,
  label,
  className = "",
}: SocialProofBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full bg-white border border-bridge-border px-4 py-2 text-base shadow-md hover:shadow-lg transition-shadow ${className}`}
      aria-label={`${count} ${label}`}
    >
      <svg
        className="h-5 w-5 text-bridge-blue"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
      </svg>
      <span>
        <span className="font-semibold text-bridge-blue">{count}</span>{" "}
        <span className="text-bridge-text">{label}</span>
      </span>
    </span>
  );
}
