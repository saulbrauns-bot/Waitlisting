import React from "react";
import Icon from "@/app/components/ui/Icon";
import { getIconContainerClasses } from "@/app/lib/styles";
import type { FeatureItem } from "@/app/constants/landing-content";

export type BentoCardVariant = "wide" | "standard" | "tall";
export type BentoCardShadowDirection = "top" | "topRight" | "right" | "bottomLeft";
export type BentoCardGradientDirection = "bottom" | "topRight" | "left";

interface BentoCardProps {
  feature: FeatureItem;
  variant?: BentoCardVariant;
  shadowDirection?: BentoCardShadowDirection;
  gradientDirection?: BentoCardGradientDirection;
  animationDelay?: number;
  children?: React.ReactNode;
  backgroundImage?: string;
  backgroundPosition?: string;
}

/**
 * Reusable Bento grid card component with configurable layouts and effects
 * Used in the WhyBridgeSection for displaying features in a modern grid
 */
export default function BentoCard({
  feature,
  variant = "standard",
  shadowDirection = "topRight",
  gradientDirection = "topRight",
  animationDelay = 0.3,
  children,
  backgroundImage,
  backgroundPosition = "center bottom",
}: BentoCardProps) {
  const shadowClasses = getShadowClasses(shadowDirection);
  const gradientClasses = getGradientClasses(gradientDirection);
  const { paddingClasses, iconSize, iconSpacing, textAlignment } = getVariantStyles(variant);

  return (
    <div
      style={{
        animation: `fadeIn 0.6s ease-out ${animationDelay}s forwards`,
        opacity: 0,
      }}
    >
      <div
        className={`relative overflow-hidden rounded-[2rem] ${paddingClasses} backdrop-blur-xl bg-white/40 border border-white/50 ${shadowClasses} hover:shadow-[0_-8px_24px_rgba(0,0,0,0.08),0_-2px_8px_rgba(74,144,226,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 group h-full`}
      >
        {backgroundImage && (
          <>
            {/* Bridge background image - manually adjustable position */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '100% auto',
                backgroundPosition: backgroundPosition,
                backgroundRepeat: 'no-repeat',
                maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.85) 45%, black 50%, rgba(0,0,0,0.8) 56%, rgba(0,0,0,0.6) 63%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.12) 88%, transparent 96%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.85) 45%, black 50%, rgba(0,0,0,0.8) 56%, rgba(0,0,0,0.6) 63%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.12) 88%, transparent 96%, transparent 100%)',
              }}
            />
          </>
        )}
        <div className={`absolute inset-0 ${gradientClasses} pointer-events-none`} />
        <div className={`relative z-10 flex flex-col h-full ${variant === "tall" ? "justify-between" : ""}`}>
          <div>
            <div
              className={`${textAlignment === "center" ? "mx-auto" : ""} ${iconSpacing} ${getIconContainerClasses(
                iconSize
              )} group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-bridge-blue/30`}
            >
              <Icon path={feature.icon} size={iconSize} className="text-white" />
            </div>
            <h3
              className={`text-xl md:text-2xl font-semibold text-bridge-text mb-2 md:mb-3 whitespace-pre-line ${
                textAlignment === "center" ? "text-center" : ""
              } ${variant === "wide" ? "text-2xl md:text-3xl mb-1 md:mb-2" : ""}`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-bridge-text-muted ${
                variant === "wide" ? "leading-snug" : "leading-relaxed"
              } text-sm md:text-base ${textAlignment === "center" ? "text-center" : ""}`}
            >
              {feature.desc}
            </p>
          </div>
          {children && <div className="mt-auto">{children}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Get shadow classes based on direction
 */
function getShadowClasses(direction: BentoCardShadowDirection): string {
  const shadows = {
    top: "shadow-[0_-4px_16px_rgba(0,0,0,0.06),0_-1px_4px_rgba(74,144,226,0.08)]",
    topRight: "shadow-[-4px_4px_16px_rgba(0,0,0,0.06),-1px_1px_4px_rgba(74,144,226,0.08)]",
    right: "shadow-[-4px_4px_16px_rgba(0,0,0,0.06),-1px_1px_4px_rgba(74,144,226,0.08)]",
    bottomLeft: "shadow-[-4px_-4px_16px_rgba(0,0,0,0.06),-1px_-1px_4px_rgba(74,144,226,0.08)]",
  };
  return shadows[direction];
}

/**
 * Get gradient classes based on direction
 */
function getGradientClasses(direction: BentoCardGradientDirection): string {
  const gradients = {
    bottom: "bg-gradient-to-b from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
    topRight: "bg-gradient-to-tr from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
    left: "bg-gradient-to-l from-bridge-blue/10 via-transparent to-bridge-blue-dark/5",
  };
  return gradients[direction];
}

/**
 * Get variant-specific styling configuration
 */
function getVariantStyles(variant: BentoCardVariant) {
  const styles = {
    wide: {
      paddingClasses: "px-4 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4",
      iconSize: "lg" as const,
      iconSpacing: "mb-2 md:mb-3",
      textAlignment: "center" as const,
    },
    standard: {
      paddingClasses: "p-6 md:p-8",
      iconSize: "md" as const,
      iconSpacing: "mb-4 md:mb-6",
      textAlignment: "left" as const,
    },
    tall: {
      paddingClasses: "p-6 md:p-8",
      iconSize: "md" as const,
      iconSpacing: "mb-4 md:mb-6",
      textAlignment: "left" as const,
    },
  };
  return styles[variant];
}
