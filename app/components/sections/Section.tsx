import React from "react";

interface SectionProps {
  id: string;
  title: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alternate";
  backgroundColor?: string;
}

/**
 * Reusable section wrapper with consistent styling
 * Includes title, optional description, and content area
 */
export default function Section({
  id,
  title,
  description,
  children,
  className = "",
  variant = "default",
  backgroundColor,
}: SectionProps) {
  const bgClass = backgroundColor
    ? ""
    : variant === "alternate"
      ? "bg-bridge-background-alt"
      : "bg-bridge-background";

  return (
    <section
      id={id}
      className={`${bgClass} py-24 md:py-32 ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="font-heading text-3xl md:text-5xl font-medium text-bridge-blue mb-4 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
          {title}
        </h2>
        {description && (
          <p className="text-bridge-text-muted max-w-prose mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
            {description}
          </p>
        )}
        <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
          {children}
        </div>
      </div>
    </section>
  );
}
