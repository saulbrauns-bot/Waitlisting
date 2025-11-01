/**
 * Shared style utilities and CSS class generators
 */

/**
 * Standard input field classes used across forms
 */
export const inputClasses =
  "rounded-xl border border-bridge-border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-bridge-blue-light transition-shadow";

/**
 * Primary button classes with hover effects
 * Uses Sky Blue (#4A90E2) per CLAUDE.md for all CTAs and interactive elements
 */
export const buttonPrimaryClasses =
  "rounded-xl bg-bridge-blue text-white px-6 py-3 font-medium shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:shadow-bridge-blue/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2";

/**
 * Secondary button classes with neutral styling
 * Per UI_GUIDELINES.md: neutral background with border
 */
export const buttonSecondaryClasses =
  "rounded-xl border border-bridge-border bg-white text-bridge-text px-6 py-3 font-medium shadow-sm transition-all duration-300 ease-out hover:bg-bridge-surface hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-bridge-border focus:ring-offset-2";

/**
 * Card container classes with hover effects
 * Uses rounded-xl (12px) per CLAUDE.md spec: "Medium roundness (8-12px)"
 */
export const cardClasses =
  "bg-bridge-surface border border-bridge-border rounded-xl p-8 shadow-bridge hover:shadow-bridge-hover hover:-translate-y-[1px] transition-all duration-300 ease-out";

/**
 * Icon container classes (circular background)
 */
export function getIconContainerClasses(size: "sm" | "md" | "lg" = "md"): string {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  return `flex items-center justify-center rounded-full bg-bridge-blue shadow-lg ${sizeClasses[size]}`;
}
