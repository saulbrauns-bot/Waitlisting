"use client";

import { useEffect } from "react";

/**
 * Ensures page loads at the top on mount
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Force scroll to top immediately and after a short delay
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Also scroll after render completes
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
