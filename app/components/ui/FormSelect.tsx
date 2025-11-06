import React from "react";
import { inputClasses } from "@/app/lib/styles";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

/**
 * Reusable form select component with consistent styling
 * Includes chevron icon for visual clarity
 */
export default function FormSelect({
  label,
  error,
  className = "",
  options,
  ...props
}: FormSelectProps) {
  const errorBorder = error ? "border-bridge-error focus:ring-bridge-error" : "";
  const combinedClasses = `${inputClasses} pr-10 appearance-none ${errorBorder} ${className}`;

  const selectElement = (
    <div className="relative">
      <select className={combinedClasses} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Chevron icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="h-5 w-5 text-bridge-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  if (label) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-bridge-text">
          {label}
        </label>
        {selectElement}
        {error && (
          <p className="text-xs text-bridge-error mt-1">{error}</p>
        )}
      </div>
    );
  }

  return (
    <>
      {selectElement}
      {error && <p className="text-xs text-bridge-error mt-1">{error}</p>}
    </>
  );
}
