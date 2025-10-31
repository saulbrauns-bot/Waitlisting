"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

/**
 * FlipWords component - Animates through an array of words with a 3D flip effect
 * Inspired by Aceternity UI, customized for Bridge brand
 */
export default function FlipWords({
  words,
  duration = 3000,
  className = "",
}: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startAnimation = useCallback(() => {
    const nextIndex = (currentIndex + 1) % words.length;
    const word = words[nextIndex];
    setCurrentWord(word);
    setCurrentIndex(nextIndex);
  }, [currentIndex, words]);

  useEffect(() => {
    const interval = setInterval(startAnimation, duration);
    return () => clearInterval(interval);
  }, [startAnimation, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        initial={{
          opacity: 0,
          y: 10,
          rotateX: 90,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -10,
          rotateX: -90,
          filter: "blur(8px)",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className={`inline-block relative ${className}`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <span className="inline-block px-2 py-1 bg-bridge-primary text-white rounded-md">
          {currentWord}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
