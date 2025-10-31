import React from "react";

interface IconProps {
  path: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable SVG icon component
 * Accepts an SVG path string and renders it with consistent styling
 */
export default function Icon({ path, className = "", size = "md" }: IconProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={path}
      />
    </svg>
  );
}
