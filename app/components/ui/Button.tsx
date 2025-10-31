import React from "react";
import { buttonPrimaryClasses } from "@/app/lib/styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable button component with consistent styling
 */
export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = variant === "primary" ? buttonPrimaryClasses : "";
  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${widthClass} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
