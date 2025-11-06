import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

/**
 * Bridge Typography System
 *
 * Headings & Brand: Satoshi (Modern, clean geometric sans-serif)
 * Body Text & UI: Inter (Highly readable, optimized for screens)
 *
 * Two-tier system for optimal readability and brand consistency:
 * - Satoshi provides distinctive personality for headings and the Bridge wordmark
 * - Inter ensures excellent readability for all body text and UI elements
 */

// Satoshi - Headings, subheadings, and Bridge wordmark
// Modern geometric sans-serif with clean lines and excellent legibility
export const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
});

// Inter - Body text and UI elements
// Google Font with excellent readability and comprehensive character support
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

/**
 * Font class names for easy application
 * Use these in your components:
 * - className={fontHeading} for all headings
 * - className={fontBody} for body text and UI elements
 */
export const fontHeading = satoshi.variable;
export const fontBody = inter.variable;
