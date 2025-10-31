"use client";

import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bridge-background/80 backdrop-blur-md border-b border-bridge-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4">
        <div className="text-2xl font-bold text-bridge-blue">Bridge</div>
      </div>
    </header>
  );
}
