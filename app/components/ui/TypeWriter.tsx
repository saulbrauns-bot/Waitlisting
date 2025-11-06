"use client";

import React, { useEffect, useState } from "react";

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  className?: string;
}

/**
 * TypeWriter component - Types out words character by character
 * Blue box extends and retracts with word length
 * Customized for Bridge brand
 */
export default function TypeWriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 100,
  pauseAfterTyping = 1500,
  pauseAfterDeleting = 300,
  className = "",
}: TypeWriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Word complete - pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseAfterTyping);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Deletion complete - pause before next word
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, pauseAfterDeleting);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isPaused,
    words,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
  ]);

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 bg-bridge-primary text-white rounded-md transition-all duration-200 font-body ${className}`}
    >
      <span className="inline-block whitespace-nowrap">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
}
