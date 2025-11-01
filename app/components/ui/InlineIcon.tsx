import React from "react";

interface InlineIconProps {
  path: string;
  className?: string;
  size?: string;
}

/**
 * Inline SVG icon component for filled icons
 * Used for small inline icons in badges and labels
 */
export default function InlineIcon({ path, className = "", size = "h-4 w-4" }: InlineIconProps) {
  return (
    <svg className={`${size} ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path d={path} />
    </svg>
  );
}
