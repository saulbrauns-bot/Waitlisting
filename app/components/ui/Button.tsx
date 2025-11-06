import React from "react";
import { buttonPrimaryClasses, buttonSecondaryClasses } from "@/app/lib/styles";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button component with consistent styling
 * Can render as either a button or anchor element
 * Supports primary (Sky Blue CTA) and secondary (neutral border) variants per CLAUDE.md and UI_GUIDELINES.md
 *
 * @example
 * // As a button
 * <Button onClick={handleClick}>Click me</Button>
 *
 * @example
 * // As a link
 * <Button as="a" href="/path">Go somewhere</Button>
 */
export default function Button({
  as = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = variant === "primary" ? buttonPrimaryClasses : buttonSecondaryClasses;
  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${widthClass} ${className}`.trim();

  if (as === "a") {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <a href={href} className={combinedClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
