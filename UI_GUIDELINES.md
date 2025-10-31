# UI Guidelines for Bridge Landing Page

## Purpose
This document defines the UI design standards and best practices for the Bridge landing page and waitlist sign-up flow. It serves as the single source of truth for designers and developers.

## Audience & Context
- Target audience: Busy professionals aged 22-35 in NYC (finance, law, consulting, med)
- Platform: Web landing page (responsive mobile + desktop)
- Primary goal: Convert visitors into waitlist sign-ups
- Secondary goal: Communicate brand trust, sophistication, time-respectful matchmaking

---

## Design Principles
### Clarity & Simplicity
- Focus user attention on one primary action: "Join Waitlist".
- Minimal distractions above the fold; essential information only.
- Remove redundant elements; each UI element must serve a purpose.

### Visual Hierarchy
- Strong headline, supporting sub-headline, hero image/illustration.
- Clear CTA button stands out via size, color, contrast.
- Use whitespace to separate content sections and group related items.
- Secondary actions (e.g., "Learn more", "FAQ") are visually less dominant.

### Consistency
- Use a unified set of colors, typography, button styles, input styles (see Color & Typography section).
- Maintain consistent hover/active/focus states across buttons and links.
- Components (cards, forms, modals) behave consistently in layout and interaction.

### Accessibility & Inclusive Design
- Ensure text/background contrast meets WCAG AA standards.
- Touch/click targets should meet minimum size thresholds (e.g., ~44px).
- Forms must support keyboard navigation and screen-reader labels.
- Responsive design: all layouts adapt to mobile, tablet and desktop.

### Feedback & Interaction States
- Provide immediate visual feedback for user actions (form submission, errors, success).
- Include loading indicators or disabled states when processes are ongoing.
- Error messages should clearly state what went wrong and how to fix it.

### Mobile-First & Responsive Design
- Design and build for mobile first; then enhance for larger screens.
- Avoid horizontal scroll; ensure layout reorganizes gracefully.
- Prioritize content: hero image, headline, waitlist form are visible without long scroll.

### Brand & Trust
- Design tone: calm, refined, elegant, professional—no flashy or gimmicky visuals.
- Leverage premium typography and subtle imagery relevant to busy professionals.
- Use trust indicators (e.g., "Join 2,000+ professionals", "NYC first launch") to build credibility.

### Performance & Layout Patterns
- Use hero → "How It Works" → "Why Bridge" → Waitlist CTA flow as hero structure.
- Leverage card patterns for testimonials or key features.
- Optimize assets, compress images, use lazy-load where appropriate to improve speed.

### Iteration & Testing
- Conduct usability tests or heuristic reviews using standards like Heuristic Evaluation.
- Gather analytics (conversion rate, bounce rate) and iterate design based on data.
- Document decisions and rationale for future reference.

---

## Color Scheme & Typography
*(Refer to the Color Scheme document in CLAUDE.md)*
- Primary color: `#4A90E2` (Sky Blue)
- Accent color: `#EBD8B7` (Warm Sand)
- Neutrals: `#F9FAFB`, `#F1F3F5`, `#1A1A1A`, etc.
- Provide Dark Mode variants.
- Typography: Use consistent font family, size & weight hierarchy across headings, body text, labels.

---

## Components & Patterns
### Buttons
- Primary CTA: large size, primary color, white text.
- Secondary: neutral background, border.
- Disabled: lower opacity, no pointer-cursor.
- Hover/focus/active states defined.
- Accessible label, aria attributes.

### Forms & Inputs
- Label above input field, clear placeholder text.
- Error states: red border, icon + message.
- Success state: green check icon, confirmation message.
- Minimum 44 px height for touch targets.

### Cards & Sections
- Use cards for "How It Works" steps or testimonials.
- Light surface color, subtle shadow for elevation.
- Consistent spacing, alignment, and image/text ratio.

### Navigation & Header
- Header: logo left, minimal nav links (if any) since landing page has one core action.
- Sticky header optional, but only if it adds value (e.g., quick access to CTA).
- Mobile nav: collapsible/hamburger if needed.

### Hero Section
- Full-width hero with headline, sub-headline, CTA button.
- Optional illustration/image aligned right or below headline on mobile.
- Ensure hero content is visible within first visible screen without scroll.

### Waitlist Signup Section
- Short form (e.g., Name + Email) or Email only.
- Clear label for form, minimal fields, strong CTA.
- Inline success message or redirect to a thank-you page.
- Use visual cues (icon, badge) to build urgency ("Limited spots").
- Provide microcopy: "We'll email you when we launch in NYC".

### Footer
- Minimal links: Privacy Policy, Terms, Social media (optional).
- Copyright line, small text.

---

## Interaction & Micro-copy Guidelines
- Use friendly professional tone: "Join the waitlist", "Coming soon in NYC" rather than gimmicks.
- Active voice: "Get matched with your community", not "You will be matched".
- Provide context: e.g., "No endless swiping. We match you when you're ready."
- Error messages: "Please enter a valid email address."
- Form success confirmation: "Thanks! You're on the waitlist. We'll be in touch."

---

## Accessibility Checklist
- [ ] All text meets contrast guidelines (≥ 4.5:1 for normal text)
- [ ] Images have alt text or are decorative only
- [ ] Buttons and links are reachable via keyboard tabbing
- [ ] Form fields have `label` elements or `aria-label`s
- [ ] Touch targets ≥ 44 px
- [ ] Responsive layout adapts to screen sizes down to 320px wide
- [ ] Semantic HTML structure (header, main, section, footer)
- [ ] aria-live regions for status updates (e.g., "Form submitted")

---

## Analytics & Conversion Tracking
- Track CTA click, form submission, thank-you page view
- Measure bounce rate, time on page, conversion rate
- A/B test headline variants, form field counts, hero image options
- Optimize for speed (LCP, CLS, FID) since landing page conversion is sensitive to performance

---

## Versioning & Documentation
- Maintain version history of UI guidelines (v0.1, v0.2…) as you iterate
- Document any deviations from guideline (why, when)
- Link to component library (e.g., `components/ui/`) for dev reference
- Update this document when new patterns or needs emerge

---

## Summary
The Bridge landing page UI must align with brand values — calm, premium, professional — while making the conversion goal (waitlist sign-up) as frictionless as possible. By adhering to the guidelines above, we ensure clarity, trust, and performance.
