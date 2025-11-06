import React from "react";
import Icon from "@/app/components/ui/Icon";
import { getIconContainerClasses } from "@/app/lib/styles";
import { createFadeInAnimation } from "@/app/lib/animations";
import {
  SHADOW_CONFIGS,
  GRADIENT_CONFIGS,
  VARIANT_CONFIGS,
  BACKGROUND_IMAGE_MASK,
  type BentoCardVariant,
  type BentoCardShadowDirection,
  type BentoCardGradientDirection,
} from "@/app/lib/bento-card-config";
import type { FeatureItem } from "@/app/constants/landing-content";

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
  const shadowClasses = SHADOW_CONFIGS[shadowDirection];
  const gradientClasses = GRADIENT_CONFIGS[gradientDirection];
  const { paddingClasses, iconSize, iconSpacing, textAlignment } =
    VARIANT_CONFIGS[variant];

  return (
    <div style={createFadeInAnimation(animationDelay)}>
      <div
        className={`relative overflow-hidden rounded-[2rem] ${paddingClasses} backdrop-blur-xl bg-white/40 border border-white/50 ${shadowClasses} hover:shadow-[0_-8px_24px_rgba(0,0,0,0.08),0_-2px_8px_rgba(74,144,226,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 group h-full`}
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "100% auto",
              backgroundPosition: backgroundPosition,
              backgroundRepeat: "no-repeat",
              maskImage: BACKGROUND_IMAGE_MASK,
              WebkitMaskImage: BACKGROUND_IMAGE_MASK,
            }}
          />
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
              className={`font-heading text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-bridge-text mb-1 sm:mb-2 md:mb-3 whitespace-pre-line ${
                textAlignment === "center" ? "text-center" : ""
              } ${variant === "wide" ? "text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2" : ""}`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-bridge-text-muted ${
                variant === "wide" ? "leading-snug" : "leading-relaxed"
              } text-xs sm:text-sm md:text-base ${textAlignment === "center" ? "text-center" : ""}`}
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

