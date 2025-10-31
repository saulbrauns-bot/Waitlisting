/**
 * Typing animation utility for text effects
 */

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

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
