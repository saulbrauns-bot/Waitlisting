# Bridge Landing Page Revamp Plan

## Goal
Transform the page from an NYC-only waitlist into a universal "express interest" page suitable for LinkedIn/Instagram bio links. Anyone should be able to learn about Bridge and express interest. Rice email signups should see the February 28th beta launch date.

---

## Phase 1: Remove NYC-Specific Content

### 1.1 Remove NYC Skyline Decoration
- **File**: `app/components/sections/WhyBridgeSection.tsx`
- **Action**: Remove `NYCSkylineDecoration` component import and usage
- **Rationale**: NYC imagery limits appeal to broader audience

### 1.2 Update Landing Content Constants
- **File**: `app/constants/landing-content.ts`
- **Changes**:
  - Update `SECTIONS.WAITLIST.description` - remove "NYC" reference
  - Update FAQ items - remove NYC-specific targeting language
  - Make launch dates/pricing more general or remove if not confirmed

### 1.3 Update Referral Messages
- **File**: `app/lib/referral.ts`
- **Action**: Check and update any NYC references in share messages

---

## Phase 2: Reframe from "Waitlist" to "Express Interest"

### 2.1 Update Hero Section
- **File**: `app/components/hero/Hero.tsx`
- **Changes**:
  - Button text: "Join Waitlist" → "Get Started" or "Express Interest"
  - Keep the taglines as-is (they're universal)

### 2.2 Update Waitlist Section Title
- **File**: `app/components/sections/WaitlistSection.tsx`
- **Changes**:
  - Title: "Stay in the Loop" → Keep or change to "Express Your Interest"
  - Subtitle should emphasize learning more, not just joining a queue
  - Section ID can remain `#waitlist` for URL compatibility

### 2.3 Update Form Config
- **File**: `app/constants/form-config.ts`
- **Changes**:
  - Review and update any waitlist-specific language
  - Button text is already "Join the list" - consider "Submit" or keep as-is

---

## Phase 3: Add "What is Bridge?" Context

### 3.1 Enhance Why Bridge Section
- **File**: `app/components/sections/WhyBridgeSection.tsx`
- **Changes**:
  - Update subheading to better explain what Bridge is
  - Remove or generalize "Beta launching at Rice" text (keep for Rice users in confirmation)
  - Make the section more informative for first-time visitors from social media

### 3.2 Update Section Header Copy
- **File**: `app/constants/landing-content.ts`
- **Changes**:
  - `SECTIONS.WHY.description` - make more explanatory

---

## Phase 4: Rice Beta Flow Enhancement

### 4.1 Rice Confirmation Page (Already Done)
- **File**: `app/confirmation/rice/page.tsx`
- **Status**: Already shows "Beta launches at Rice on February 28th"
- **No changes needed**

### 4.2 Consider Adding Rice Mention on Main Page
- **Decision**: Keep Rice beta mention subtle on main page, or remove entirely
- **Rationale**: Main page should be universal; Rice-specific info shows after signup

---

## Phase 5: Polish & Cleanup

### 5.1 Footer Content
- **File**: `app/page.tsx`
- **Action**: Review footer SMS consent text - keep as-is (relevant for future app)

### 5.2 Navigation Links
- **File**: `app/constants/landing-content.ts`
- **Action**: Update nav link from "Join Waitlist" to match new CTA

### 5.3 Meta/SEO Updates
- **File**: `app/layout.tsx` or metadata config
- **Action**: Update meta description to be location-agnostic

---

## Files to Modify

| File | Priority | Changes |
|------|----------|---------|
| `app/components/sections/WhyBridgeSection.tsx` | High | Remove NYC skyline, update Rice beta text |
| `app/constants/landing-content.ts` | High | Remove NYC refs, update FAQ, nav links |
| `app/components/hero/Hero.tsx` | Medium | Update CTA button text |
| `app/components/sections/WaitlistSection.tsx` | Medium | Update section copy |
| `app/lib/referral.ts` | Medium | Check/update share messages |
| `app/constants/form-config.ts` | Low | Review language |
| `app/layout.tsx` | Low | Update meta description |

---

## Implementation Order

1. **WhyBridgeSection.tsx** - Remove NYC Skyline, update copy
2. **landing-content.ts** - Update all NYC references and FAQ
3. **Hero.tsx** - Update CTA button
4. **WaitlistSection.tsx** - Update section copy
5. **referral.ts** - Update share messages
6. **layout.tsx** - Update meta tags

---

## Success Criteria

- [ ] No NYC-specific imagery or copy on main page
- [ ] Page clearly explains what Bridge is to first-time visitors
- [ ] Interest form works for all user types (users, investors, partners, followers)
- [ ] Rice email signups see February 28th beta date on confirmation
- [ ] Share messages are location-agnostic
- [ ] Page is suitable for LinkedIn/Instagram bio link
