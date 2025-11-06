/**
 * Utility for combining class names
 * Similar to clsx/classnames but lightweight and type-safe
 */

type ClassValue = string | undefined | null | false;

/**
 * Combine multiple class names into a single string
 * Filters out falsy values for conditional classes
 *
 * @param classes - Class names or conditional expressions
 * @returns Combined class string
 *
 * @example
 * cn('base-class', isActive && 'active', 'another-class')
 * // Returns: "base-class active another-class" (if isActive is true)
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ').trim();
}
