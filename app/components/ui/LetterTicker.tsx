"use client";

import { useEffect, useState } from "react";

interface LetterTickerProps {
  targetLetter: string;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * LetterTicker Component
 * Animates through random letters before settling on the target letter
 * Creates a "slot machine" or "ticker" effect for text
 */
export default function LetterTicker({
  targetLetter,
  delay = 0,
  duration = 1000,
  className = "",
}: LetterTickerProps) {
  const [currentLetter, setCurrentLetter] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    // Start animation after delay
    const startTimeout = setTimeout(() => {
      setIsAnimating(true);
      let iterations = 0;
      const maxIterations = Math.floor(duration / 50); // 50ms per iteration

      intervalId = setInterval(() => {
        if (iterations < maxIterations) {
          // Show random letter
          const randomLetter = letters[Math.floor(Math.random() * letters.length)];
          setCurrentLetter(randomLetter);
          iterations++;
        } else {
          // Settle on target letter
          setCurrentLetter(targetLetter);
          setIsAnimating(false);
          clearInterval(intervalId);
        }
      }, 50);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [targetLetter, delay, duration]);

  return (
    <span className={`inline-block ${className} ${isAnimating ? "animate-pulse" : ""}`}>
      {currentLetter || " "}
    </span>
  );
}
