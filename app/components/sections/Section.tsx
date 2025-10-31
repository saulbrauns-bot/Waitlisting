import React from "react";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
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
}: SectionProps) {
  return (
    <section
      id={id}
      className={`bg-bridge-background py-20 md:py-28 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-5xl font-semibold text-bridge-blue mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-bridge-text-muted max-w-prose mb-12">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
