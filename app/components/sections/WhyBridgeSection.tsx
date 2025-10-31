"use client";

import React, { useState, useEffect } from "react";
import TypeWriter from "@/app/components/ui/TypeWriter";
import Icon from "@/app/components/ui/Icon";
import { WHY_BRIDGE_FEATURES, SECTIONS } from "@/app/constants/landing-content";
import { cardClasses, getIconContainerClasses } from "@/app/lib/styles";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * Why Bridge section with Bumble-inspired two-column layout
 * Left: Title with rotating words + subheading
 * Right: Carousel with navigation arrows
 */
export default function WhyBridgeSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initial check
    updateScrollButtons();

    // Listen for scroll events
    api.on("select", updateScrollButtons);
    api.on("reInit", updateScrollButtons);

    return () => {
      api.off("select", updateScrollButtons);
      api.off("reInit", updateScrollButtons);
    };
  }, [api]);

  return (
    <section
      id={SECTIONS.WHY.id}
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bridge-gradient-2)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Two-column grid layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Column: Title + Subheading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-bridge-text leading-tight opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
              What makes Bridge
              <br />
              <TypeWriter
                words={["for you", "different", "intentional", "effortless"]}
                typingSpeed={75}
                deletingSpeed={75}
              />
            </h2>
            <p className="text-lg md:text-xl text-bridge-text-muted leading-relaxed opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
              The dating experience designed for people with purpose.
            </p>
          </div>

          {/* Right Column: Carousel with Arrows */}
          <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
            <Carousel setApi={setApi} className="w-full max-w-md mx-auto">
              <CarouselContent>
                {WHY_BRIDGE_FEATURES.map((feature, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-2">
                      <div className={cardClasses}>
                        <div className={`mx-auto mb-6 ${getIconContainerClasses("lg")}`}>
                          <Icon
                            path={feature.icon}
                            size="lg"
                            className="text-white"
                          />
                        </div>
                        <h3 className="text-2xl font-semibold text-bridge-text mb-3 text-center">
                          {feature.title}
                        </h3>
                        <p className="text-bridge-text-muted leading-relaxed text-center">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {canScrollPrev && <CarouselPrevious />}
              {canScrollNext && <CarouselNext />}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
