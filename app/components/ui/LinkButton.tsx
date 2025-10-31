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
      className={`rounded-xl bg-bridge-blue text-white px-5 py-3 shadow-bridge transition-[opacity,box-shadow,transform] duration-300 ease-out hover:shadow-bridge-hover hover:opacity-95 hover:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
