"use client";

import { useEffect, useState, RefObject } from "react";

interface UseStickyColumnHeightOptions {
  buffer?: number;
  updateDelay?: number;
}

/**
 * Custom hook to calculate dynamic height for sticky columns
 * Used to constrain sticky elements to stop before a target element (e.g., skyline decoration)
 *
 * @param sectionRef - Reference to the parent section container
 * @param targetRef - Reference to the element where sticky should stop
 * @param options - Configuration options for buffer spacing and update delay
 * @returns Calculated height as a CSS string value
 */
export function useStickyColumnHeight(
  sectionRef: RefObject<HTMLElement | HTMLDivElement | null>,
  targetRef: RefObject<HTMLElement | HTMLDivElement | null>,
  options: UseStickyColumnHeightOptions = {}
): string {
  const { buffer = 70, updateDelay = 100 } = options;
  const [height, setHeight] = useState<string>("auto");

  useEffect(() => {
    // Skip calculations on mobile to avoid getBoundingClientRect() performance issues
    const isMobile = () => window.innerWidth < 768;

    const calculateHeight = () => {
      if (isMobile()) {
        setHeight("auto");
        return;
      }

      if (!targetRef.current || !sectionRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Calculate target element's top position relative to section top
      const targetTopFromSectionTop = targetRect.top - sectionRect.top;

      // Set height to stop at target element top minus buffer
      setHeight(`${targetTopFromSectionTop - buffer}px`);
    };

    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    // Add delay to ensure target element is fully rendered
    const timeoutId = setTimeout(calculateHeight, updateDelay);

    return () => {
      window.removeEventListener("resize", calculateHeight);
      clearTimeout(timeoutId);
    };
  }, [targetRef, sectionRef, buffer, updateDelay]);

  return height;
}
