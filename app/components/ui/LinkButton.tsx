import React from "react";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Reusable button-styled link component with Bridge design system styling
 */
export default function LinkButton({
  href,
  children,
  className = "",
  ariaLabel,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block rounded-xl bg-bridge-blue text-white px-6 py-3 font-medium shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:shadow-bridge-blue/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
