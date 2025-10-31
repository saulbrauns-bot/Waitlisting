import React from "react";
import type { FeatureItem } from "@/app/constants/landing-content";
import { cardClasses, getIconContainerClasses } from "@/app/lib/styles";
import Icon from "@/app/components/ui/Icon";

interface FeatureCardProps {
  feature: FeatureItem;
}

/**
 * Card component for displaying a feature with an icon in the "Why Bridge" section
 */
export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className={`${cardClasses} text-center`}>
      <div className={`mx-auto mb-6 ${getIconContainerClasses("lg")}`}>
        <Icon path={feature.icon} size="lg" className="text-white" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-bridge-text mb-3">
        {feature.title}
      </h3>
      <p className="text-bridge-text-muted leading-relaxed">{feature.desc}</p>
    </div>
  );
}
