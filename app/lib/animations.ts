/**
 * Animation utilities and configuration
 * Centralized animation delays, durations, and utility functions
 */

// ============================================================================
// Animation Constants
// ============================================================================

export const ANIMATION_DELAYS = {
  INSTANT: 0,
  FAST: 0.1,
  QUICK: 0.2,
  NORMAL: 0.3,
  MEDIUM: 0.4,
  SLOW: 0.5,
  SLOWER: 0.6,
  SLOWEST: 0.8,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: "0.3s",
  NORMAL: "0.6s",
  SLOW: "0.8s",
  VERY_SLOW: "1s",
} as const;

export const ANIMATION_EASINGS = {
  OUT: "ease-out",
  IN_OUT: "ease-in-out",
  OUT_CUBIC: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

// ============================================================================
// Animation Utility Functions
// ============================================================================

/**
 * Creates fade-in animation style object
 */
export function createFadeInAnimation(
  delay: number = ANIMATION_DELAYS.NORMAL,
  duration: string = ANIMATION_DURATIONS.NORMAL
) {
  return {
    animation: `fadeIn ${duration} ${ANIMATION_EASINGS.OUT} ${delay}s forwards`,
    opacity: 0,
  };
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ============================================================================
// Typing Animation
// ============================================================================

export interface TypingAnimationOptions {
  text: string;
  intervalMs?: number;
  onComplete?: () => void;
}

export interface TypingAnimationState {
  displayText: string;
  isComplete: boolean;
}

/**
 * Creates a typing animation effect for text
 * Returns cleanup function to clear intervals
 */
export function createTypingAnimation(
  setText: (text: string) => void,
  options: TypingAnimationOptions
): () => void {
  const { text, intervalMs = 70, onComplete } = options;
  let currentIndex = 0;

  const interval = setInterval(() => {
    currentIndex++;
    setText(text.slice(0, currentIndex));

    if (currentIndex >= text.length) {
      clearInterval(interval);
      onComplete?.();
    }
  }, intervalMs);

  return () => clearInterval(interval);
}
