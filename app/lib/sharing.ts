/**
 * Sharing utility functions for Bridge landing page
 */

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Copy URL to clipboard
 * @param url - URL to copy (defaults to current origin)
 * @returns Promise that resolves when copy succeeds
 */
export async function copyToClipboard(url: string = window.location.origin): Promise<void> {
  await navigator.clipboard.writeText(url);
}

/**
 * Share using native share API with fallback to clipboard
 * @param options - Share options (title, text, url)
 * @returns Promise that resolves when share/copy succeeds
 */
export async function shareOrCopy(options: ShareOptions = {}): Promise<{ method: 'native' | 'clipboard' }> {
  const {
    title = 'Bridge - Dating for Busy People',
    text = 'Check out Bridge - thoughtful dating that takes just minutes a day',
    url = window.location.origin,
  } = options;

  // Try native share first
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { method: 'native' };
    } catch (error) {
      // User cancelled or error occurred, fall back to clipboard
      if (error instanceof Error && error.name === 'AbortError') {
        throw error; // Re-throw if user cancelled
      }
    }
  }

  // Fallback to clipboard
  await copyToClipboard(url);
  return { method: 'clipboard' };
}
