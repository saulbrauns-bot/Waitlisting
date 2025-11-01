import React from "react";
import { buttonPrimaryClasses, buttonSecondaryClasses } from "@/app/lib/styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable button component with consistent styling
 * Supports primary (Sky Blue CTA) and secondary (neutral border) variants per CLAUDE.md and UI_GUIDELINES.md
 */
export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = variant === "primary" ? buttonPrimaryClasses : buttonSecondaryClasses;
  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${widthClass} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
