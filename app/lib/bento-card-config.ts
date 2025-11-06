/**
 * Bento card styling configuration
 * Centralized configuration for shadow directions, gradients, and variant styles
 */

export type BentoCardVariant = "wide" | "standard" | "tall";
export type BentoCardShadowDirection = "top" | "topRight" | "right" | "bottomLeft";
export type BentoCardGradientDirection = "bottom" | "topRight" | "left";

interface BentoCardStyleConfig {
  paddingClasses: string;
  iconSize: "sm" | "md" | "lg";
  iconSpacing: string;
  textAlignment: "left" | "center";
}

/**
 * Shadow configuration for different directions
 */
export const SHADOW_CONFIGS: Record<BentoCardShadowDirection, string> = {
  top: "shadow-[0_-4px_16px_rgba(0,0,0,0.06),0_-1px_4px_rgba(74,144,226,0.08)]",
  topRight:
    "shadow-[-4px_4px_16px_rgba(0,0,0,0.06),-1px_1px_4px_rgba(74,144,226,0.08)]",
  right:
    "shadow-[-4px_4px_16px_rgba(0,0,0,0.06),-1px_1px_4px_rgba(74,144,226,0.08)]",
  bottomLeft:
    "shadow-[-4px_-4px_16px_rgba(0,0,0,0.06),-1px_-1px_4px_rgba(74,144,226,0.08)]",
};

/**
 * Gradient configuration for different directions
 */
export const GRADIENT_CONFIGS: Record<BentoCardGradientDirection, string> = {
  bottom: "bg-gradient-to-b from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
  topRight: "bg-gradient-to-tr from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
  left: "bg-gradient-to-l from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
};

/**
 * Variant-specific styling configuration
 */
export const VARIANT_CONFIGS: Record<BentoCardVariant, BentoCardStyleConfig> = {
  wide: {
    paddingClasses: "px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5 pb-2 sm:pb-3 md:pb-4",
    iconSize: "lg",
    iconSpacing: "mb-2 sm:mb-2.5 md:mb-3",
    textAlignment: "center",
  },
  standard: {
    paddingClasses: "p-3 sm:p-4 md:p-5 lg:p-6",
    iconSize: "md",
    iconSpacing: "mb-2.5 sm:mb-3 md:mb-4 lg:mb-5",
    textAlignment: "left",
  },
  tall: {
    paddingClasses: "p-3 sm:p-4 md:p-5 lg:p-6",
    iconSize: "md",
    iconSpacing: "mb-2.5 sm:mb-3 md:mb-4 lg:mb-5",
    textAlignment: "left",
  },
};

/**
 * Background image mask configuration for smooth fade effects
 * Balanced bottom fade for seamless white background integration
 */
export const BACKGROUND_IMAGE_MASK =
  "linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.85) 45%, black 50%, rgba(0,0,0,0.78) 56%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.2) 74%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0.04) 86%, transparent 92%, transparent 100%)";
