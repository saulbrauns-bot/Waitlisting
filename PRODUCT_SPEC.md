# Bridge V0 — Product Specification

## Overview

**Bridge** is a modern matchmaking platform for busy professionals who want meaningful relationships without the chaos of dating apps. It replaces endless swiping with a calm, structured, time-respectful experience designed for people who value efficiency, discretion, and genuine human connection.

**Tagline**: "Busy people for busy people."

**Value Proposition**: Quality over quantity through human-guided matchmaking. Instead of overwhelming users with choices, Bridge surfaces a few high-quality, high-intent matches — each validated by collective user insight and algorithmic structure.

## Target Market

**Demographics**: Professionals aged 22–30 in major metropolitan centers (starting with New York City) — individuals in finance, consulting, medicine, law, and technology.

**Psychographic Profile**:
- Highly intentional, time-constrained professionals
- Value structure, discretion, and depth over casual connection
- Seek efficiency without sacrificing emotional intelligence
- Expect technology to be elegant, respectful, and unobtrusive

## Core Mechanics

### 1. Community-Driven Matchmaking

**Survey System for Heterosexual Matching**:
- Female users receive daily surveys at 7 PM local time
- Each survey shows **3 women and 1 man**
- The rater (woman) ranks the 3 women from most to least compatible for the featured man
- Survey format: full profiles visible (photos, lifestyle info, prompts, preferences) but **no names displayed**

**Survey Frequency & Limits**:
- One mandatory daily survey at 7 PM
- Optional: up to 2 additional bonus surveys per day
- Surveys expire after 24 hours (no catch-up)
- Missing surveys carries no penalty, but consistent participation increases visibility and trust metrics

**Inclusivity & Same-Sex Matching**:
- Same-sex and non-binary users have alternating or adaptive rater roles
- Men may opt into "Survey Contributor Mode" if the system requires balance or extra data

**Survey Pool Curation**:
- The 3 women shown with a featured man are **pre-selected** based on mutual preferences, age bounds, distance, intent, and lifestyle tags (not random)
- Diversity constraints enforce variety across occupation, school, and interest clusters to avoid echo chambers
- Cold-start users may receive exploration slots but still pass basic compatibility screens

**Survey Fatigue Prevention**:
- Per-rater cooldown: same profile cannot be shown to the same rater more than once within **7 days**
- Global pacing: each profile has a daily cap on total survey impressions that scales with pool size
- Bonus surveys prioritize fresh and under-seen profiles

**First Appearance Timing**:
- New users start **receiving surveys** the day after onboarding at next local 7 PM
- New users start **appearing in surveys** immediately after onboarding, verification, and completing 5 mandatory questions + 1 profile photo

### 2. Match Proposal Creation

**Ranking Aggregation Logic**:
- Per-rater weight: w_r = 1.0 default (high-accuracy raters can boost to 1.2 max)
- Rank points: 1st place = 1.00, 2nd place = 0.60, 3rd place = 0.25
- Pair score: S(M,W) = sum over raters of [rank_points × w_r]

**Match Thresholds**:
- Threshold adapts dynamically by city size and data density:
  - **Small pool**: T = 6.0 with minimum 7 raters
  - **Medium pool**: T = 7.5 with minimum 8 raters
  - **Large pool**: T = 9.0 with minimum 10 raters
- Diversity check: at least 7 distinct raters and at least 3 micro-cohorts across age band, occupation cluster, or school cluster

**Example Scenarios**:
- 8 first places + 2 third places → S = 8.5 → triggers in small/medium pools
- 10 second places → S = 6.0 → triggers in small pools only if diversity passes

### 3. Match Proposal UI

**Proposal Display**:
- Full profile of the other person with **name visible** at proposal stage
- Social proof text: "17 people think you two would be a great fit"
- **Why Card**: 2-3 shared highlights auto-generated from:
  - Shared deeper question answers (values, lifestyle alignment)
  - Overlapping interests or tags
  - Community validation patterns
  - Practical proximity (neighborhoods, commute zones)
  - Scheduling compatibility

**Response Window**:
- Both users have **48 hours** to Accept or Pass
- Real-time countdown (not business hours)
- Users may enable **one Vacation Pause per month** to freeze timers up to 48 hours

**Rejection Visibility**:
- If Person A accepts and Person B passes, Person A sees neutral status: "Not a match this time"
- System does not reveal explicit pass vs. timeout
- Optional private feedback from B informs the system but is not shown to A

### 4. Chat Windows

**Chat Mechanics**:
- Mutual acceptance opens a **3-day chat window**
- **One active chat at a time** — users cannot accept another proposal until current chat ends
- Neither user can unmatch before **72 hours** unless a guideline violation occurs
- At 72 hours, either party may unmatch with required reason

**Chat Features (MVP)**:
- Text, emojis, read receipts
- Quick scheduling with time windows
- Neutral venue suggestions
- **No media in MVP**: no photos, files, voice notes, or video

**Unmatching**:
- At or after 72 hours, user must select unmatch reason from multiple choice or provide free-text
- Reason is **delivered to the other person** (ghosting is impossible)
- Chat disappears for both users after unmatch
- Feedback is attributed and informs reputation scoring
- Chat remains disabled until a new match is formed

**Violation-Based Immediate Unmatch**:
- Allowed for: harassment, hate speech, explicit sexual content, threats, spam, doxxing, persistent boundary crossing
- Reports trigger automated triage within minutes and human review ASAP
- Outcomes: warning, temporary suspension, or permanent ban

### 5. Onboarding & Profile Setup

**Quick Onboarding (3 minutes)**:
- Name, email, gender, preferences (age range, gender/orientation preference, location radius, intent, dealbreakers)

**Deeper Setup**:
- **Photos**: 2 mandatory (verification + profile) + up to 4 optional lifestyle photos
- **Verification photo**: eyes closed, left pointer finger touching nose (anti-bot verification)
  - Automated liveness and pose check (under 2 minutes)
  - Up to 3 automated attempts; manual review fallback within 24 hours
  - Failing verification locks matching until retaken
- **Questions**: 5 mandatory core questions required; up to 36 optional questions total
  - Mandatory: ~3 minutes; full 36 questions: ~15 minutes
  - Purpose: fast onboarding while rewarding depth

**Profile Updates**:
- Users can edit photos, 36 optional questions, and preferences at any time
- Pending proposals use snapshot of profile at creation time
- New surveys and proposals use latest profile
- Nightly jobs refresh compatibility features after significant edits

### 6. User States & Account Management

**Primary States** (mutually exclusive):
- **Pending Verification**: signed up, not yet verified via selfie or phone
- **Active**: verified and eligible for surveys and matches
- **Suspended**: temporary restriction for policy review or violation
- **Banned**: permanent removal for major or repeated violations
- **Deactivated**: user self-paused, can reactivate later

**Secondary Flags** (can overlap with Active):
- **In Active Chat**: ongoing 3-day chat window
- **On Vacation Pause**: proposal and survey timers frozen up to 48 hours (does not freeze active chat)
- **In Travel Mode**: user switched to different city for minimum 3 weeks

**Overlap Rules**:
- In Active Chat can overlap with In Travel Mode
- Vacation Pause can overlap with Travel Mode or Active
- Suspended, Banned, and Deactivated override all other states

### 7. Travel Mode

**Activation**:
- User switches cities with **3-week minimum** commitment
- Discourages short-term travel use; encourages stable connections
- Permanent moves can re-verify instantly

**Continuity**:
- Existing chats continue to their 72-hour conclusion
- Active proposals keep running timers
- User stops appearing in surveys in home city **immediately**
- Enters new city's pool at Travel Mode start

**Geography**:
- Default matching radius: **25 miles** within metro area
- Timezone auto-detects during travel; users may manually pin timezone

### 8. Reputation & Badge System

**Points & Badges**:
- Earn points: completing surveys, prompt replies, respectful chatting, positive feedback
- Lose points: timeouts, reports, violations
- Badge tiers: **Bronze** (baseline), **Silver** (small visibility boost), **Gold** (priority placement and queue advantage)

**Badge Visibility**:
- **Hidden during surveys** to prevent rater bias
- **Visible on match proposals**
- **Visible in active chats and Past Matches archive**

**System Impact**:
- Badges influence exposure and ranking weight internally
- Do not alter Why Card text directly

### 9. Weekend Friend Mode

**Activation**:
- Active **Friday 5 PM – Sunday 9 PM** local time
- Users can have up to **3 active friends** participating at once
- Friends must be registered Bridge users

**Friend Participation**:
- Friends receive surveys featuring the inviter and 3 potential matches (same 3+1 format)
- Friends' individual inputs are **anonymous** to the inviter
- Aggregate social proof may be shown

**Friend Rewards**:
- System attributes successful matches to contributing rankings, including friend raters
- Friends receive small point bonuses and can earn **Matchmaker badge** after repeated helpful outcomes
- Friends are notified when their input contributed to a successful match

### 10. Match History & Data Retention

**Past Matches Archive**:
- When chat ends (unmatch or natural expiration), moves to **Past Matches** archive visible to user
- Archive shows: name, date matched, and unmatch reason received
- Chat messages are **no longer viewable** in app after match ends
- Backend retains chat content for safety and analytics for limited period, then purges per retention policy

**Rematch Mechanics**:
- Same two users cannot be automatically rematched
- **Request rematch** button appears on archived match thread
- Other person receives notification and can accept or decline
- Either person may request; rematch proceeds only if other opts in
- If declined or ignored, pair stays excluded from automatic rematches

### 11. Notifications System

**Channels**:
- **In-app**: all critical updates
- **Push**: time-sensitive events
- **Email**: slower events, verification, moderation
- **SMS**: optional for codes or reminders

**Events & Priority**:
- **High**: Daily survey available (7 PM), match proposal received, match accepted, unmatch with reason
- **Medium**: New message in chat (push optional), chat window ending soon, verification status
- **Low**: Friend matchmaker success, badge earned
- **Critical**: Safety or moderation notices (cannot be disabled)

**User Preferences**:
- Users may disable low-priority notifications
- High-priority and safety notices cannot be disabled

### 12. Access Control & Verification

**Signup**:
- Waitlist or invite-based during early stages
- Mandatory phone and liveness verification
- Optional LinkedIn or work email for extra trust badges
- Fake or flagged accounts suspended automatically

**Gender Balance Management**:
- System tracks gender ratios per city
- Temporarily limits new signups or increases survey duty to restore equilibrium
- Ensures fair match density across demographics

### 13. Autonomous Backend Systems

**Daily & Weekly Jobs**:
- Survey generation and expiration (7 PM local time, timezone-aware)
- Proposal creation and cooldowns
- Reward computation and badge updates
- Analytics, telemetry, and performance tracking
- Feature store refresh after significant profile edits

**Purpose**: System works seamlessly so users never experience friction or downtime

## Market Differentiation

Bridge serves high-intent, high-responsibility professionals optimizing every aspect of their lives. Unlike swipe-based apps that optimize for screen time, **Bridge optimizes for outcomes**: compatibility, emotional resonance, and respect for user bandwidth.

**Core Differentiators**:
- **Time-aware UX**: One short survey per day, then done
- **Collective matching**: Compatibility emerges from human consensus, not black-box algorithms
- **Transparency & trust**: Users see why a match was made through visible social proof
- **Professional design**: Every detail — tone, copy, UX — feels credible and mature
- **Limited, meaningful engagement**: Finite matches and cooldown periods prevent burnout

## Brand Identity

**Tone**: Calm, confident, refined — designed for people who want connection without chaos

**Vision**: Redefine modern matchmaking by blending human empathy with algorithmic structure, creating a dating ecosystem that respects time, fosters trust, and builds relationships grounded in authenticity. Bridge aims to become the default relationship platform for professionals — restoring human intelligence, integrity, and emotional intention to digital connection.

## Monetization

Monetization strategy deferred post-MVP. Subscription model excluded as it conflicts with long-term, relationship-focused intent. Alternative, non-subscription revenue models to be explored later.
