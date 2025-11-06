import React from "react";
import { inputClasses } from "@/app/lib/styles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Reusable form input component with consistent styling
 */
export default function FormInput({ label, error, className = "", ...props }: FormInputProps) {
  const errorBorder = error ? "border-bridge-error focus:ring-bridge-error" : "";
  const combinedClasses = `${inputClasses} ${errorBorder} ${className}`;

  if (label) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-bridge-text">
          {label}
        </label>
        <input className={combinedClasses} {...props} />
        {error && (
          <p className="text-sm sm:text-xs text-bridge-error mt-1">{error}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <input className={combinedClasses} {...props} />
      {error && <p className="text-sm sm:text-xs text-bridge-error mt-1">{error}</p>}
    </>
  );
}
