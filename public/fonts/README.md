# Bridge Typography Fonts

This directory contains the local font files for the Bridge landing page.

## Font System Overview

Bridge uses a **two-tier typography system**:
- **Satoshi**: All headings and brand elements
- **Inter**: All body text and UI elements

## Satoshi (Headings & Brand)

**Status**: ✅ Installed
- **Source**: [Fontshare - Satoshi](https://www.fontshare.com/fonts/satoshi)
- **License**: Free for personal and commercial use
- **Directory**: `./satoshi/Satoshi_Complete/Fonts/WEB/fonts/`
- **Installed Files**:
  - `Satoshi-Light.woff2` (weight: 300)
  - `Satoshi-Regular.woff2` (weight: 400)
  - `Satoshi-Medium.woff2` (weight: 500)
  - `Satoshi-Bold.woff2` (weight: 700)
  - `Satoshi-Black.woff2` (weight: 900)

**Usage**:
- All H1, H2, H3 headings
- "Bridge" wordmark/logo
- Section titles
- Card titles
- Feature titles

## Inter (Body Text & UI)

**Status**: ✅ Configured
- **Source**: Google Fonts (loaded via `next/font/google`)
- **License**: Open Font License
- **No local files needed** - Inter is loaded automatically from Google Fonts
- **Weights Used**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Usage**:
- All body copy and paragraphs
- Form labels and inputs
- Button text
- Navigation links
- UI elements

## Font Format

All custom fonts are in **WOFF2** format for optimal performance and browser support.

## Implementation

The fonts are configured in `app/fonts.ts` and applied via:
- CSS Variables: `--font-heading` (Satoshi), `--font-body` (Inter)
- Utility Classes: `.font-heading`, `.font-body`

## Verification

To verify fonts are loading correctly:
1. Run `pnpm dev`
2. Open browser DevTools → Network tab
3. Filter by "Font" to see Satoshi WOFF2 files loading
4. Check for any 404 errors
5. Inspect heading elements to confirm Satoshi is applied
6. Inspect body text to confirm Inter is applied

## Troubleshooting

**Satoshi not loading:**
- Verify files exist in `./satoshi/Satoshi_Complete/Fonts/WEB/fonts/`
- Check file names match exactly (case-sensitive)
- Clear browser cache and restart dev server

**Build errors:**
- If you see "Font file not found", check paths in `app/fonts.ts`
- System will fallback to Inter if Satoshi fonts are missing
