"use client";

import LetterTicker from "./LetterTicker";

interface AnimatedFreeProps {
  className?: string;
}

/**
 * AnimatedFree Component
 * Displays "FREE" with letter ticker animation
 * Each letter animates in sequence with a staggered delay
 */
export default function AnimatedFree({ className = "" }: AnimatedFreeProps) {
  const word = "FREE";

  return (
    <div
      className={`inline-flex ${className}`}
      style={{ textShadow: '0 0 20px rgba(74, 144, 226, 0.6), 0 0 40px rgba(74, 144, 226, 0.4)' }}
    >
      {word.split("").map((letter, index) => (
        <LetterTicker
          key={index}
          targetLetter={letter}
          delay={index * 200} // Stagger each letter by 200ms
          duration={800}
          className="text-4xl md:text-6xl font-bold text-bridge-blue"
        />
      ))}
    </div>
  );
}
