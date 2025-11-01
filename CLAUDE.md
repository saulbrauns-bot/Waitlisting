# CLAUDE.md

## Core Development Stack
You are an expert in TypeScript, Node.js, Next.js App Router, React, Supabase, Shadcn UI, Radix UI, and Tailwind CSS.

## Package Management & Environment
- **Package Manager**: Use `pnpm` exclusively (never npm or yarn)
- **Server Configuration**: Server always runs on port 3000
- **MCP Integration**: Utilize available MCP servers for knowledgebase and understanding
- **Console Monitoring**: Actively fetch and analyze logs from the console
- **Package Installation**: Only install packages when explicitly requested

## Development Philosophy
- Prioritize iteration and modularization over code duplication
- Proactively suggest performance improvements
- Identify potential security vulnerabilities and provide solutions
- Write concise, technical TypeScript with accurate examples
- Include comments to clarify technical concepts and functions
- Favor functional and declarative patterns over class-based approaches

## Project Structure

### Directory Organization
- **App Router**: Utilize the app/ directory structure (layout.tsx, page.tsx, loading.tsx, error.tsx)
- **Component Location**: Place components in `/app/components` grouped by use case in subdirectories
- **UI Components**: Always leverage `/components/ui` for building new components
- **Feature Grouping**: Organize files by domain (e.g., features/auth, features/dashboard)
- **Utilities**: Use lib/ for low-level logic, Supabase clients, and third-party utilities
- **Supabase Assets**: Store migrations and edge functions in the supabase/ directory
- **Directory Naming**: Use lowercase with dashes (e.g., components/auth-wizard)

### Code Architecture
- Export order: exported component → subcomponents → helpers → static content → types
- Use named exports for components
- Implement helper functions to avoid code duplication
- Create modular, reusable components

## TypeScript Standards

### Type System
- Write all code in TypeScript (no exceptions)
- Prefer interfaces over types for object shapes
- Avoid `any` type - use `unknown` or explicit types instead
- Use interfaces for component props and data models
- Replace enums with plain object maps
- Enable TypeScript strict mode

### Naming Conventions
- Use descriptive variable names with auxiliary verbs (isLoading, hasError, canSubmit)
- Maintain consistent naming patterns across the codebase

## Supabase Implementation

### Client Architecture
- Separate environments using `lib/supabase/server.ts` and `lib/supabase/client.ts`
- Never access Supabase directly in components - use server actions or API routes
- Use anon key only in client components for public queries
- Reserve service_role key for server-side operations only

### Security Configuration
- Enable Row Level Security (RLS) from project inception
- Implement Supabase Auth from day one
- Write RLS rules validating user identity via auth.uid() or request.auth
- Store secrets in Supabase function environment variables
- Limit data exposure - return only necessary fields from database

### Environment Management
- Store all keys in environment variables
- Use `.env.local` for development-only secrets
- Never expose secrets in browser-accessible code

## UI/UX Development

### Typography
- **Primary Font**: Barlow Condensed (Google Font)
  - Use for all text across the application
  - Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - CSS Variable: `--font-barlow-condensed`
  - Rationale: Modern, slim, professional sans-serif with slightly rounded letterforms that balance sophistication with approachability
  - Perfect for busy professionals - space-efficient while maintaining excellent readability

### Component Libraries
- Primary: Shadcn UI + Radix UI for component architecture
- Styling: Tailwind CSS for layout, spacing, and utilities
- Use accessible Radix primitives and Shadcn components

### Responsive Design
- Implement mobile-first approach by default
- Ensure all layouts are responsive using Tailwind
- Include dark mode support with `dark:` variants where applicable
- Maintain consistent spacing and typography

### Accessibility
- Ensure proper aria-* attributes
- Implement comprehensive focus handling
- Support full keyboard navigation

## Performance Optimization

### React Patterns
- Minimize usage of 'use client', useEffect, and setState
- Prioritize React Server Components and Server Actions
- Wrap client components in `<Suspense>` with appropriate fallbacks
- Implement lazy loading for non-critical components
- Avoid 'use client' unless required for Web APIs

### Image Optimization
- Use WebP format when possible
- Always include width and height attributes
- Implement lazy loading for images
- Optimize for Core Web Vitals: LCP, CLS, FID

### State Management
- Utilize useFormState and useFormStatus with server actions
- Implement useOptimistic for lightweight interactive state
- Avoid global state libraries unless absolutely necessary

## Security Best Practices

### Authentication & Authorization
- Implement server-side validation for all sensitive logic
- Never rely solely on client-side security checks
- Use Supabase Auth session checks on protected routes
- Clear stale sessions on logout
- Validate session/user IDs before data access or modification

### Input Validation & API Security
- Validate all inputs using zod or similar libraries
- Implement proper error handling for all API routes
- Use server actions with comprehensive validation
- Enable Vercel Web Application Firewall (WAF) to block automated threats

### Data Protection
- Never expose sensitive environment variables to the client
- Implement proper CORS policies
- Use HTTPS for all communications
- Follow the principle of least privilege for data access

## Code Quality & Developer Experience

### Linting & Formatting
- Configure ESLint, Prettier, and TypeScript strict mode
- Ensure `pnpm dev` starts cleanly with no TypeScript errors
- Maintain consistent code formatting across the project

### Documentation
- Document key architectural decisions in README.md or docs/
- Include inline documentation for complex logic
- Maintain up-to-date API documentation

### Development Workflow
- Follow official Next.js documentation for routing, rendering, and data fetching
- Test all features across different browsers and devices
- Implement proper error boundaries and loading states

## Best Practices Summary
1. Always validate inputs with zod
2. Use server-side logic for sensitive operations
3. Implement comprehensive error handling
4. Maintain clean, modular code structure
5. Prioritize performance and security equally
6. Follow React and Next.js best practices
7. Ensure accessibility compliance
8. Document important decisions and complex logic

---

# PROJECT: Bridge Landing Page & Waitlist

## What We're Building

This repository contains the **landing page and waitlist signup** for Bridge. We are NOT building the full Bridge application (see PRODUCT_SPEC.md for full product details) — only a marketing/conversion page to collect early interest from busy professionals.

## Landing Page Structure

### 1. Hero Section
- **Headline**: "Busy People for Busy People"
- **Subheadline**: "One curated match. Real connection.
Thoughtful dating that takes just minutes a day."
- **Visual**: Clean, minimal design with subtle abstract shapes (no stock couples)
- **Primary CTA**: Join the waitlist (button)

### 2. How It Works (3 Simple Steps)
- Keep algorithm details light and high-level
- Focus on calm, time-respecting design
- Present the process as simple and effortless

### 3. Why Bridge (3 Core Benefits)
- Address pain points:
  - Time sink of endless swiping
  - Low-intent matches on other apps
  - Hard to actually schedule dates
- Emphasize quality over quantity

### 4. Social Proof Strip
- Simple stat like "Join X professionals on the early list"
- Placeholder for partner/company logos later (if applicable)

### 5. Final CTA
- Repeat waitlist signup opportunity
- Same form as hero section

### 6. Footer
- Minimal footer with basic links

## Waitlist Form Specifications

### Form Fields

**Required Fields:**
- Email (text input, validated)
- First Name (text input)
- Last Name (text input)
- Phone Number (text input with format validation)

**Optional Fields:**
- City (dropdown, default "New York City")
- Industry (dropdown: Finance, Law, Medicine, Tech, Consulting, Other)

### Form Behavior
- Single-step form (all fields visible at once)
- Inline validation on blur
- Clear error states for invalid inputs
- Submit button disabled until required fields are valid

### Post-Submission Experience
- Inline success state (no redirect)
- Success message: "You're on the list. We'll email you when we open in NYC."
- Form disappears after successful submission
- No confirmation email in v1

### Data Storage (Backend - For Later)
- Supabase table: `waitlist`
  - `id` (uuid, primary key)
  - `created_at` (timestamp, auto)
  - `email` (text, unique, required)
  - `first_name` (text, required)
  - `last_name` (text, required)
  - `phone_number` (text, required)
  - `city` (text, nullable, default "New York City")
  - `industry` (text, nullable)
  - `source` (text, default "landing")

## Design System

### Bridge Brand Color Palette

| Role                   | Name       | Hex       | CSS Variable              | Description                                                            |
| ---------------------- | ---------- | --------- | ------------------------- | ---------------------------------------------------------------------- |
| **Primary**            | Sky Blue   | `#4A90E2` | `--color-bridge-primary`  | The signature Bridge hue — calm, intelligent, evokes clarity and trust |
| **Primary Light**      | Light Sky  | `#B3D4FF` | `--color-bridge-primary-light` | Used for hover, focus, or backgrounds with subtle energy     |
| **Primary Dark**       | Deep Sky   | `#1E6BD6` | `--color-bridge-primary-dark` | For call-to-action emphasis, darker buttons, or hero gradients  |
| **Accent**             | Warm Sand  | `#EBD8B7` | `--color-bridge-accent`   | Soft contrast accent — brings warmth and balance to cool tones         |
| **Neutral Background** | Off White  | `#F9FAFB` | `--color-bridge-neutral-bg` | Clean backdrop that keeps focus on content                       |
| **Surface**            | Mist Gray  | `#F1F3F5` | `--color-bridge-surface`  | Used for cards, modals, and elevated containers                        |
| **Border**             | Cloud Gray | `#D6D9DE` | `--color-bridge-border`   | Light, non-distracting borders for inputs or containers                |
| **Text Primary**       | Charcoal   | `#1A1A1A` | `--color-bridge-text-primary` | High-contrast, professional typography color                   |
| **Text Secondary**     | Slate      | `#4A5568` | `--color-bridge-text-secondary` | Used for subtitles, muted labels, or secondary info          |
| **Success**            | Emerald    | `#16A34A` | `--color-bridge-success`  | Positive, trustworthy feedback color                                   |
| **Error**              | Rose       | `#DC2626` | `--color-bridge-error`    | Clean red tone for validation errors or warnings                       |

### Color Usage Guidelines
- **Primary (Sky Blue)**: Use for all CTAs, interactive elements, and brand moments
- **Primary Light**: Hover states, focus rings, light backgrounds
- **Primary Dark**: Emphasized buttons, important actions, hero gradients
- **Accent (Warm Sand)**: Subtle background overlays, secondary highlights (use sparingly)
- **Neutral Background**: Page backgrounds, section separators
- **Surface**: Card backgrounds, modal containers, elevated surfaces
- **Charcoal + Slate**: Text hierarchy — Charcoal for headings, Slate for descriptions
- **Success/Error**: Form validation, status indicators

### Visual Identity
- **Typography**: Barlow Condensed (Google Font) - A modern, slim, professional sans-serif with slightly rounded letterforms that balance sophistication with approachability. Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Logo**: Text-only "Bridge" for now (use Primary gradient: Light Sky → Sky Blue → Deep Sky)
- **Spacing**: Consistent 8px grid system
- **Border Radius**: Medium roundness (8-12px)

### Responsive Design
- Mobile-first approach (320px+)
- Tablet breakpoint (768px+)
- Desktop breakpoint (1024px+)
- All sections fully responsive
- Form optimized for mobile input

### Interactions & Animations
- Light fade-in animations on scroll (optional, keep minimal)
- Smooth hover states on buttons
- Focus states for accessibility
- No video content
- No complex animations

## Messaging & Tone

### Brand Voice
- **Calm, refined, professional**
- Explicitly target busy NYC professionals (finance, consulting, law, medicine, tech)
- Avoid hyperbole and superlatives
- Focus on respect for user's time

### Key Messages
- **Primary**: Bridge saves time by delivering one high-quality match at a time
- **Pain Points to Address**:
  - Endless swiping is exhausting and inefficient
  - Most dating app matches are low-intent
  - Scheduling actual dates is unnecessarily difficult
- **Benefits to Emphasize**:
  - One curated match at a time
  - Community-validated compatibility
  - Time-respectful experience

### Target Audience
- **Demographics**: Professionals aged 22-30 in NYC
- **Industries**: Finance, consulting, medicine, law, technology
- **Psychographics**: Time-constrained, high-intent, value efficiency and discretion

## Technical Requirements

### Core Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Shadcn UI components
- Supabase (for waitlist storage, backend only)

### Development Priorities
1. **UI First**: Build and perfect the interface before backend integration
2. **Mobile Responsiveness**: Ensure flawless mobile experience
3. **Form UX**: Smooth, intuitive form interaction
4. **Performance**: Fast page loads, optimized images
5. **Accessibility**: Proper semantic HTML, ARIA labels, keyboard navigation

### SEO & Analytics
- Meta title: "Bridge - Dating for Busy Professionals | NYC"
- Meta description: "One curated match at a time. No swiping. No noise. Join the waitlist for thoughtful dating built for busy NYC professionals."
- Open Graph image (to be created)
- Analytics: Plausible or Vercel Analytics
- Sitemap and robots.txt

### Deployment
- Platform: Vercel
- Initial URL: bridge-waitlist.vercel.app
- Custom domain: TBD
- Environment variables for Supabase (later)

## Primary Goal

**One Action**: Get visitors to join the waitlist
**One Message**: Bridge saves time by delivering one high-quality match at a time so busy NYC people can meet other busy NYC people

## Development Notes

- Focus on UI/UX perfection first, backend integration second
- Keep the design calm, clean, and minimal
- No FAQ section in v1
- No referral system in v1
- No confirmation emails in v1
- Iterate quickly based on feedback

---

## Reference Documents

- **PRODUCT_SPEC.md** - Full Bridge product specification and future development context
- **UI_GUIDELINES.md** - Comprehensive UI/UX design standards and best practices for the landing page
- **CLAUDE.md** (this file) - Development standards and project configuration
