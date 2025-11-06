import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Bridge text logo using Satoshi font
 * This is an alternative to the image-based logo
 * Uses font-heading (Satoshi) per typography system
 */
export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  return (
    <span
      className={`font-heading font-bold bg-gradient-to-r from-bridge-blue via-bridge-blue-dark to-bridge-blue bg-clip-text text-transparent ${sizeClasses[size]} ${className}`}
      style={{
        letterSpacing: '-0.02em', // Tight letter spacing for modern look
      }}
    >
      Bridge
    </span>
  );
}
