"use client";

import React, { useEffect, useState } from "react";
import { createTypingAnimation, prefersReducedMotion } from "@/app/lib/animations";

interface TypingTextProps {
  text: string;
  onComplete?: () => void;
  className?: string;
  delay?: number; // Delay before starting animation (ms)
  shouldStart?: boolean; // Control when animation should start
}

/**
 * Animated typing text component
 * Respects user's reduced motion preferences
 */
export default function TypingText({
  text,
  onComplete,
  className = "",
  delay = 0,
  shouldStart = true
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Don't start if we shouldn't start yet
    if (!shouldStart || hasStarted) return;

    setHasStarted(true);
    setIsAnimating(true);

    // Show full text immediately if reduced motion is preferred
    if (prefersReducedMotion()) {
      setDisplayText(text);
      setIsAnimating(false);
      onComplete?.();
      return;
    }

    let cleanup: (() => void) | undefined;

    // Start animation with optional delay
    const startTimeout = setTimeout(() => {
      cleanup = createTypingAnimation(setDisplayText, {
        text,
        intervalMs: 70,
        onComplete: () => {
          setIsAnimating(false);
          onComplete?.();
        },
      });
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, shouldStart, delay]);

  const showCaret = isAnimating && displayText.length < text.length;

  return (
    <span className={`inline-flex items-end justify-center ${className}`}>
      {displayText}
      {showCaret && (
        <span
          className="w-[2px] h-[1em] bg-bridge-text ml-1 inline-block align-bottom animate-[caret_1s_steps(1)_infinite]"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
