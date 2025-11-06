# Bridge Typography System Migration

## Overview

Bridge's typography system has been updated from a single-font system (Barlow Condensed) to a clean two-tier system that enhances visual hierarchy and readability while maintaining simplicity.

## New Typography System

### Font Families

1. **Satoshi** - Headings & Brand
   - **Usage**: All headings (H1, H2, H3), Bridge wordmark, section titles, card titles
   - **CSS Variable**: `--font-heading`
   - **Utility Class**: `.font-heading`
   - **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black)
   - **Source**: Local files in `public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/`
   - **Rationale**: Modern geometric sans-serif that brings contemporary elegance to all headings

2. **Inter** - Body Text & UI
   - **Usage**: Body copy, paragraphs, labels, buttons, form inputs, navigation, all UI elements
   - **CSS Variable**: `--font-body`
   - **Utility Class**: `.font-body`
   - **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
   - **Source**: Google Fonts (loaded via `next/font/google`)
   - **Rationale**: Highly readable, optimized for screens, excellent for UI and body text

## Implementation Details

### Files Created/Modified

#### Created Files:
- `app/fonts.ts` - Font configuration and exports with Satoshi font paths
- `app/components/ui/Logo.tsx` - Text-based Bridge logo component using Satoshi

#### Modified Files:
- `app/layout.tsx` - Updated to import and apply `satoshi` and `inter` font variables
- `app/globals.css` - Added font-family definitions and utility classes (removed Neue Montreal)
- `app/components/hero/Hero.tsx` - H1 uses `.font-heading`, body text uses `.font-body`
- `app/components/sections/*.tsx` - All section headings use `.font-heading`
- `app/components/cards/*.tsx` - Card titles use `.font-heading`
- `app/components/forms/WaitlistForm.tsx` - Success heading uses `.font-heading`
- `app/lib/styles.ts` - Button and input classes use `.font-body`
- `CLAUDE.md` - Updated typography documentation

### Component Updates

#### Hero Section (`Hero.tsx`):
- H1 headline: `font-heading font-bold` (Satoshi)
- Subheadline/description: `font-body` (Inter)
- CTA button: `font-body font-semibold` (Inter)

#### Section Headings:
- `WhyBridgeSection`: `font-heading font-medium` (Satoshi)
- `PerksSection` H2: `font-heading font-bold` (Satoshi)
- `PerksSection` H3: `font-heading font-semibold` (Satoshi)
- `WaitlistSection` H2: `font-heading font-bold` (Satoshi)
- `FAQSection` H2: `font-heading font-medium` (Satoshi)
- `Section.tsx` H2: `font-heading font-medium` (Satoshi)

#### Cards & Components:
- `BentoCard` titles: `font-heading font-semibold` (Satoshi)
- `StepCard` titles: `font-heading font-semibold` (Satoshi)
- `FeatureCard` titles: `font-heading font-semibold` (Satoshi)
- `WaitlistForm` success heading: `font-heading font-medium` (Satoshi)
- `TestimonialsConveyor` heading: `font-heading font-medium` (Satoshi)
- `LiveSocialProof` "Live Activity": `font-body font-medium` (Inter)
- `AnimatedFree` heading: `font-heading font-semibold` (Satoshi)

#### UI Elements:
- All buttons: `font-body font-semibold` (Inter)
- All inputs: `font-body` (Inter)
- Body text: `font-body` (Inter) - applied globally via `<body>` element

### Tailwind Configuration

In `globals.css` within the `@theme inline` block:

```css
--font-heading: var(--font-satoshi), 'Inter', 'system-ui', 'sans-serif';
--font-body: var(--font-inter), 'system-ui', 'sans-serif';
--font-sans: var(--font-inter), 'system-ui', 'sans-serif';
```

Utility classes in `@layer base`:

```css
.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}
```

## Font Configuration

The `app/fonts.ts` file contains the complete Satoshi configuration:

```typescript
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

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

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});
```

## Verification

After implementation, verify that:
1. Dev server runs without font loading errors
2. Open DevTools → Network → Font to verify Satoshi WOFF2 files load
3. Check for any 404 errors
4. Verify typography hierarchy looks correct
5. All headings use Satoshi font
6. All body text and UI elements use Inter font

## Usage Guidelines

### When to Use Each Font:

**Satoshi (`.font-heading`):**
- Hero H1 headlines
- All section headings (H2, H3)
- "Bridge" wordmark/logo
- Card titles
- Feature titles
- Any text that establishes hierarchy and structure

**Inter (`.font-body`):**
- All body copy and paragraphs
- Form labels and inputs
- Button text
- Navigation links
- Captions and helper text
- Stats and numbers
- Any UI text

### Font Weight Guidelines:

**Satoshi:**
- `font-light` (300) for subtle, refined headings
- `font-normal` (400) for standard headings
- `font-medium` (500) for most section headings
- `font-bold` (700) for major headlines and emphasis
- `font-black` (900) for maximum impact (use sparingly)

**Inter:**
- `font-normal` (400) for body text
- `font-medium` (500) for labels and emphasized text
- `font-semibold` (600) for buttons and strong emphasis
- `font-bold` (700) for special UI elements

## Documentation

Updated documentation can be found in:
- `CLAUDE.md` - Typography section and Visual Identity section
- This file - Complete migration guide

## Troubleshooting

**Fonts not loading:**
- Verify Satoshi files are in `public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/`
- Check file names match exactly (case-sensitive)
- Ensure WOFF2 format files are present
- Clear browser cache
- Restart dev server

**Build errors:**
- If you see "Font file not found" errors, verify the path to Satoshi fonts
- System will use Inter as fallback until Satoshi fonts load correctly
- Check that the Satoshi_Complete folder is properly uploaded

**Wrong font showing:**
- Check that utility classes are applied (`.font-heading` for all headings, `.font-body` for all UI/body)
- Verify CSS custom properties are defined in globals.css
- Inspect element to see computed font-family
- Ensure no legacy classes like `.font-display` remain (should all be `.font-heading` now)

## Benefits of New System

1. **Simplified Architecture**: Two fonts instead of three reduces complexity
2. **Clear Hierarchy**: Satoshi for structure, Inter for content
3. **Modern Aesthetics**: Satoshi brings contemporary geometric elegance to headings
4. **Superior Readability**: Inter excels for body text and UI elements
5. **Cost Effective**: Avoids paid fonts while maintaining premium appearance
6. **Performance**: WOFF2 format ensures optimal loading
7. **Consistency**: Easy to remember - headings use Satoshi, everything else uses Inter

## Migration Checklist

- [x] Create font directory structure
- [x] Upload Satoshi font family to `public/fonts/satoshi/`
- [x] Create `app/fonts.ts` with Satoshi and Inter configurations
- [x] Update Tailwind CSS variables (removed Neue Montreal)
- [x] Add utility classes (removed `.font-display`)
- [x] Update `app/layout.tsx` (removed neueMontreal)
- [x] Update Hero component
- [x] Update all section headings (globally replaced `font-display` → `font-heading`)
- [x] Update all card components
- [x] Update form components
- [x] Update button and input styles
- [x] Create Logo component
- [x] Update CLAUDE.md documentation
- [ ] Test and verify fonts render correctly
- [ ] Check for any remaining `font-display` references
- [ ] Verify dev server runs without errors

---

**Last Updated**: 2025-11-05
**Status**: Implementation complete, fonts uploaded, awaiting verification
