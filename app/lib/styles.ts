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
 */
export const buttonPrimaryClasses =
  "rounded-xl bg-bridge-blue text-white px-6 py-3 font-medium shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:shadow-bridge-blue/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2";

/**
 * Card container classes with hover effects
 */
export const cardClasses =
  "bg-bridge-surface border border-bridge-border rounded-2xl p-8 shadow-bridge hover:shadow-bridge-hover hover:-translate-y-[1px] transition-all duration-300 ease-out";

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
