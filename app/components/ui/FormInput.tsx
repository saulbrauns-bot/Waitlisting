import React from "react";
import { inputClasses } from "@/app/lib/styles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Reusable form input component with consistent styling
 */
export default function FormInput({ label, className = "", ...props }: FormInputProps) {
  const combinedClasses = `${inputClasses} ${className}`;

  if (label) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-bridge-text">
          {label}
        </label>
        <input className={combinedClasses} {...props} />
      </div>
    );
  }

  return <input className={combinedClasses} {...props} />;
}
