/**
 * Scroll utility functions for smooth navigation
 */

/**
 * Scroll to a section by ID with smooth behavior
 * @param sectionId - ID of the section to scroll to (without # prefix)
 * @returns Event handler function
 */
export function scrollToSection(sectionId: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
}

/**
 * Scroll to a section by ID (immediate execution)
 * @param sectionId - ID of the section to scroll to (without # prefix)
 */
export function scrollTo(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
}
