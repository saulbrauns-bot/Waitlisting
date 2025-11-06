# 🚀 Bridge Landing Page - Pre-Production Action Plan

**Created**: 2025-01-05
**Status**: Ready to Execute
**Timeline**: 2-3 hours to production-ready

---

## 📊 Current Status Assessment

Based on the comprehensive review in `DEPLOYMENT_READINESS.md`:

**Deployment Score**: 90/100 ✅
**Code Quality**: Excellent ✅
**Critical Issues**: 0 (all fixed) ✅
**High Priority Issues**: 3 remaining
**Deployment Blockers**: None ✅

---

## 🎯 Strategic Priorities

### **Tier 1: MUST DO Before Production** 🔴
These tasks are **required** for a successful production launch. Without these, the application will have reduced functionality or poor user experience.

1. **Disable /api/invite Feature** (2 minutes)
2. **Add SEO Metadata** (15 minutes)
3. **Add Vercel Analytics** (5 minutes)
4. **Test Full Signup Flow Locally** (10 minutes)

**Total Time**: ~30 minutes

---

### **Tier 2: SHOULD DO During Deployment** 🟡
These tasks happen as part of the deployment process and are necessary for production configuration.

1. **Verify Resend Domain** (30-60 min)
2. **Configure Vercel Environment Variables** (5 min)
3. **Test Production Signup Flow** (10 min)

**Total Time**: ~45-75 minutes (includes DNS wait time)

---

### **Tier 3: NICE TO HAVE Post-Launch** 🟢
These can be added after launch without impacting core functionality.

1. **Implement /api/invite Endpoint** (30 min)
2. **Add Error Monitoring (Sentry)** (15 min)
3. **Upgrade Rate Limiting to Redis** (45 min)
4. **Add More Test Coverage** (60 min)

**Total Time**: ~2.5 hours (post-launch technical debt)

---

## 📋 TIER 1: Pre-Production Tasks (MUST DO)

### **Task 1.1: Disable /api/invite Feature** 🔴 CRITICAL

**Why**: The endpoint doesn't exist yet, will cause 404 errors and poor UX

**Location**: `app/components/confirmation/WaitlistConfirmation.tsx:172-200`

**Action Plan**:
```typescript
// Option A: Hide the entire "text a friend directly" section
// Wrap lines 172-200 in a conditional:
{false && ( // TODO: Enable when /api/invite is implemented
  <div className="pt-4 border-t border-bridge-border">
    {/* ... existing invite form ... */}
  </div>
)}

// Option B: Show "Coming soon" message
<div className="pt-4 border-t border-bridge-border text-center">
  <p className="text-sm text-bridge-text-secondary">
    Direct invite feature coming soon!
  </p>
</div>
```

**Files to Modify**:
- `app/components/confirmation/WaitlistConfirmation.tsx`

**Verification**:
- Visit `/confirmation` page
- Invite form should not be visible
- No console errors

**Priority**: 🔴 **CRITICAL** - Will cause user-facing errors
**Time**: 2 minutes
**Difficulty**: Easy

---

### **Task 1.2: Add SEO Metadata** 🟡 HIGH

**Why**: Without proper SEO, your launch won't rank on Google and social shares will look unprofessional

**Location**: `app/layout.tsx`

**Action Plan**:
```typescript
// Update app/layout.tsx metadata
export const metadata: Metadata = {
  title: "Bridge - Dating for Busy Professionals | NYC",
  description: "One curated match at a time. No swiping. No noise. Join the waitlist for thoughtful dating built for busy NYC professionals.",

  // OpenGraph for social sharing
  openGraph: {
    title: "Bridge - Dating for Busy Professionals",
    description: "One curated match at a time. Join the waitlist for thoughtful dating in NYC.",
    url: "https://bridge.app", // Update with your domain
    siteName: "Bridge",
    images: [
      {
        url: "/og-image.png", // Create this image
        width: 1200,
        height: 630,
        alt: "Bridge - Thoughtful Dating for Busy Professionals"
      }
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Bridge - Dating for Busy Professionals",
    description: "One curated match at a time. Join the waitlist.",
    images: ["/og-image.png"], // Same as OG image
  },

  // Search engine directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification tags (add when ready)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};
```

**Additional Files to Create**:

1. **app/robots.ts** (for robots.txt)
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/confirmation-test/'],
    },
    sitemap: 'https://bridge.app/sitemap.xml', // Update domain
  }
}
```

2. **app/sitemap.ts** (for sitemap.xml)
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bridge.app', // Update domain
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

3. **Create OG Image**: `public/og-image.png`
   - Dimensions: 1200x630px
   - Include Bridge logo and tagline
   - Use brand colors
   - Test at https://www.opengraph.xyz/

**Files to Create/Modify**:
- `app/layout.tsx` (update metadata)
- `app/robots.ts` (create)
- `app/sitemap.ts` (create)
- `public/og-image.png` (create)

**Verification**:
- Test at https://www.opengraph.xyz/
- Share link on Slack/Discord to see preview
- Check https://yourdomain.com/robots.txt
- Check https://yourdomain.com/sitemap.xml

**Priority**: 🟡 **HIGH** - Critical for launch visibility
**Time**: 15 minutes (+ time to create OG image)
**Difficulty**: Easy

---

### **Task 1.3: Add Vercel Analytics** 🟡 HIGH

**Why**: You need to track signups, traffic sources, and conversion rates from day one

**Action Plan**:

**Option A: Vercel Analytics (Recommended - Free)**
```typescript
// 1. Install package
// pnpm add @vercel/analytics

// 2. Update app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-center" />
        <Analytics /> {/* Add this */}
      </body>
    </html>
  );
}

// 3. Enable in Vercel dashboard
// Project Settings → Analytics → Enable
```

**Option B: Plausible (Privacy-focused)**
```typescript
// 1. Sign up at https://plausible.io
// 2. Add script to app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Files to Modify**:
- `app/layout.tsx`
- `package.json` (if using Vercel Analytics)

**Verification**:
- Visit your site
- Check Vercel Analytics dashboard OR Plausible dashboard
- Verify page views are tracked

**Priority**: 🟡 **HIGH** - Essential for measuring launch success
**Time**: 5 minutes
**Difficulty**: Very Easy

---

### **Task 1.4: Test Full Signup Flow Locally** 🟡 HIGH

**Why**: You need to verify the entire flow works end-to-end before anyone else sees it

**Action Plan**:

1. **Start Dev Server**
```bash
pnpm dev
```

2. **Test Signup Flow**
   - ✅ Navigate to http://localhost:3000
   - ✅ Fill out waitlist form with test data
   - ✅ Submit form
   - ✅ Verify success message displays
   - ✅ Check email inbox for confirmation email
   - ✅ Click confirmation link in email
   - ✅ Verify redirected to `/confirmation` page
   - ✅ Check Supabase dashboard for record

3. **Verify Database**
```sql
-- In Supabase SQL Editor
SELECT * FROM waitlist_signups ORDER BY created_at DESC LIMIT 5;

-- Should show:
-- - Your test signup
-- - token_hash populated
-- - confirmation_sent_at timestamp
-- - confirmed_at NULL (until you click link)
```

4. **Test Email Confirmation Link**
   - Click link in email
   - Should redirect to `/confirmation?firstName=...&email=...`
   - Check database again - `confirmed_at` should now have timestamp
   - `token_hash` should be NULL (cleared after use)

5. **Test Edge Cases**
   - Try submitting same email again → should get "Already on waitlist" message
   - Try invalid email → should show validation error
   - Try empty fields → should show validation errors

**Checklist**:
- [ ] Form validation works (required fields)
- [ ] Form submission succeeds
- [ ] Database record created
- [ ] Email received within 30 seconds
- [ ] Email has correct sender (Bridge <onboarding@resend.dev>)
- [ ] Confirmation link works
- [ ] Confirmation page displays correctly
- [ ] Database shows confirmed_at timestamp
- [ ] Duplicate email shows appropriate message
- [ ] No console errors

**Priority**: 🟡 **HIGH** - Must verify before anyone else uses it
**Time**: 10 minutes
**Difficulty**: Easy

---

## 📋 TIER 2: Deployment Tasks (DURING DEPLOYMENT)

### **Task 2.1: Verify Resend Domain** 🔴 REQUIRED

**Why**: Production emails won't send without verified domain

**Action Plan**:

1. **Go to Resend Dashboard**
   - Visit https://resend.com/domains
   - Click "Add Domain"

2. **Add Your Domain**
   - Enter: `bridge.app` (or your domain)
   - Resend will provide DNS records

3. **Add DNS Records** (in your DNS provider)
   ```
   # SPF Record
   Type: TXT
   Name: @
   Value: v=spf1 include:resend.com ~all

   # DKIM Record (provided by Resend)
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]

   # DMARC Record
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:your-email@bridge.app
   ```

4. **Wait for Verification**
   - Usually takes 5-30 minutes
   - Resend will show "Verified" status when ready

5. **Update Environment Variables**
   ```bash
   # In Vercel Dashboard
   RESEND_FROM_EMAIL=hello@bridge.app
   RESEND_REPLY_TO=support@bridge.app
   ```

**Prerequisites**:
- Domain registered and active
- Access to DNS management
- Resend account created

**Verification**:
- Resend dashboard shows "Verified" status
- Send test email from Resend dashboard
- Check email headers to confirm SPF/DKIM pass

**Priority**: 🔴 **REQUIRED** - Blocks production email
**Time**: 30-60 minutes (includes DNS propagation)
**Difficulty**: Medium

---

### **Task 2.2: Configure Vercel Environment Variables** 🔴 REQUIRED

**Why**: Production needs different values than development

**Action Plan**:

1. **Go to Vercel Dashboard**
   - Project Settings → Environment Variables

2. **Add Production Variables**
   ```bash
   # Public Variables
   NEXT_PUBLIC_BASE_URL=https://bridge.app
   APP_VERSION=v1.0.0

   # Supabase (mark as secret ✅)
   SUPABASE_URL=https://ikyiwnydgedwbmcdzgbe.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... [mark as secret]

   # Resend (mark as secret ✅)
   RESEND_API_KEY=re_EyquE55x... [mark as secret]
   RESEND_FROM_EMAIL=hello@bridge.app
   RESEND_REPLY_TO=support@bridge.app
   ```

3. **Environment Selection**
   - Set all to: Production, Preview, Development
   - Or separate values for each environment

4. **Redeploy**
   - After adding variables, redeploy the project
   - Vercel will automatically use new values

**Reference**:
- Use `.env.example` as template
- Copy values from `.env.local` for Supabase
- Update email addresses to verified domain

**Verification**:
- Check Vercel deployment logs for environment variable confirmation
- Test `/api/health` endpoint - should show `supabaseUrlDefined: true`

**Priority**: 🔴 **REQUIRED** - App won't work without these
**Time**: 5 minutes
**Difficulty**: Easy

---

### **Task 2.3: Test Production Signup Flow** 🔴 REQUIRED

**Why**: Production environment may have different behavior

**Action Plan**:

1. **After Deployment**
   - Visit https://bridge.app (your production URL)
   - Open browser DevTools (Console tab)

2. **Complete Signup Flow**
   - Fill out form with real email
   - Submit
   - Verify no console errors
   - Check email inbox (should arrive within 30 seconds)
   - Click confirmation link
   - Verify confirmation page loads

3. **Verify Database**
   ```sql
   -- In Supabase dashboard
   SELECT
     id,
     email,
     created_at,
     confirmed_at,
     confirmation_sent_at
   FROM waitlist_signups
   WHERE email = 'your-test-email@gmail.com';
   ```

4. **Check Email Quality**
   - Sender should be: `Bridge <hello@bridge.app>`
   - Reply-to should work
   - Email should not land in spam
   - Links should be HTTPS (not HTTP)

5. **Test Error Scenarios**
   - Submit same email again → "Already on waitlist"
   - Submit invalid email → validation error
   - Test on mobile device
   - Test with slow 3G network

**Checklist**:
- [ ] Production URL loads correctly
- [ ] Form submission works
- [ ] Email received (check spam folder too)
- [ ] Email from correct domain (@bridge.app)
- [ ] Confirmation link works (HTTPS)
- [ ] Confirmation page loads
- [ ] Database record confirmed
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast loading time

**Priority**: 🔴 **REQUIRED** - Final verification before announcement
**Time**: 10 minutes
**Difficulty**: Easy

---

## 📋 TIER 3: Post-Launch Improvements (NICE TO HAVE)

### **Task 3.1: Implement /api/invite Endpoint** 🟢 OPTIONAL

**Why**: Enables viral growth through friend invites

**Action Plan**:

1. **Create API Route**: `app/api/invite/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistInvite } from '@/app/lib/email';
import { normalizePhone } from '@/app/lib/phone-utils';
import { checkRateLimit } from '@/app/lib/rate-limiting';
import { getIpAddress } from '@/app/lib/request-utils';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getIpAddress(request) || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { phone, refCode } = body;

    // Validate phone
    if (!phone) {
      return NextResponse.json(
        { ok: false, message: 'PHONE_REQUIRED' },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);

    // TODO: Send SMS invite via Twilio or similar
    // For now, just log it
    console.log('[invite_sent]', {
      phone: normalizedPhone,
      refCode,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Invite error:', error);
    return NextResponse.json(
      { ok: false, message: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
```

2. **Re-enable UI**: `app/components/confirmation/WaitlistConfirmation.tsx`
   - Remove the `{false &&` wrapper
   - Test the invite form

3. **Consider SMS Service**:
   - Twilio (full-featured, $$$)
   - Plivo (cheaper alternative)
   - Or just log invites and manually follow up

**Priority**: 🟢 **OPTIONAL** - Nice for viral growth but not critical
**Time**: 30 minutes
**Difficulty**: Medium

---

### **Task 3.2: Add Error Monitoring (Sentry)** 🟢 OPTIONAL

**Why**: Catch production errors before users report them

**Action Plan**:
```bash
# Install
pnpm add @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs

# Configure app/error.tsx
'use client'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <div>Something went wrong!</div>
}
```

**Priority**: 🟢 **OPTIONAL** - Helpful for debugging
**Time**: 15 minutes
**Difficulty**: Easy

---

### **Task 3.3: Upgrade Rate Limiting to Redis** 🟢 OPTIONAL

**Why**: Persistent rate limiting across serverless restarts

**Action Plan**:
```bash
# Install
pnpm add @upstash/ratelimit @upstash/redis

# Create Upstash account and Redis database
# https://upstash.com

# Update app/lib/rate-limiting.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
})

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const { success } = await ratelimit.limit(identifier)
  return success
}
```

**Priority**: 🟢 **OPTIONAL** - Current solution works for launch
**Time**: 45 minutes
**Difficulty**: Medium

---

## ⏱️ Timeline Summary

### **Today (Before Deployment)**
```
Task 1.1: Disable /api/invite       →  2 min   ✅
Task 1.2: Add SEO metadata          → 15 min   ✅
Task 1.3: Add analytics             →  5 min   ✅
Task 1.4: Test local signup flow    → 10 min   ✅
                                    ___________
                        TOTAL:       ~30 minutes
```

### **During Deployment**
```
Task 2.1: Verify Resend domain      → 30-60 min 🕐
Task 2.2: Configure Vercel env vars →  5 min    ✅
Task 2.3: Test production flow      → 10 min    ✅
                                    ___________
                        TOTAL:       ~45-75 minutes
```

### **After Launch** (Optional)
```
Task 3.1: Implement /api/invite     → 30 min
Task 3.2: Add Sentry               → 15 min
Task 3.3: Upgrade rate limiting     → 45 min
Task 3.4: Add test coverage         → 60 min
                                    ___________
                        TOTAL:       ~2.5 hours (technical debt)
```

---

## 🎯 Recommended Execution Order

### **Phase 1: Local Improvements (Today)**
1. ✅ Disable /api/invite feature (2 min)
2. ✅ Add SEO metadata (15 min)
3. ✅ Add Vercel Analytics (5 min)
4. ✅ Test full local signup flow (10 min)
5. ✅ Commit and push changes

**Checkpoint**: All code changes complete, ready to deploy

---

### **Phase 2: Deployment Preparation**
1. 🕐 Start Resend domain verification (begins DNS propagation)
2. ✅ Deploy to Vercel (while DNS propagates)
3. ✅ Configure Vercel environment variables
4. 🕐 Wait for Resend verification (check every 10 min)
5. ✅ Update RESEND_FROM_EMAIL once verified
6. ✅ Redeploy with new email config

**Checkpoint**: Production deployed and configured

---

### **Phase 3: Production Verification**
1. ✅ Test production signup flow
2. ✅ Verify email delivery
3. ✅ Test confirmation flow
4. ✅ Check all error states
5. ✅ Test on mobile
6. ✅ Share preview with team

**Checkpoint**: Production verified and ready to announce

---

### **Phase 4: Post-Launch (Optional)**
- Add remaining features as needed
- Monitor analytics and errors
- Iterate based on user feedback

---

## ✅ Success Criteria

### **Before Deployment**
- [ ] All Tier 1 tasks completed
- [ ] No console errors in development
- [ ] Build succeeds (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Local signup flow works end-to-end

### **After Deployment**
- [ ] Production URL loads correctly
- [ ] Email sends from verified domain
- [ ] Confirmation flow works
- [ ] No console errors in production
- [ ] Analytics tracking page views
- [ ] SEO preview looks correct

### **Ready for Launch Announcement**
- [ ] All success criteria met above
- [ ] Team has tested the flow
- [ ] Social sharing preview looks good
- [ ] Mobile experience is smooth
- [ ] Confident in stability

---

## 🚨 Rollback Plan

If something goes wrong after deployment:

1. **Immediate Rollback**
   ```bash
   # In Vercel dashboard
   # Deployments → Previous deployment → Promote to Production
   ```

2. **Common Issues & Fixes**
   - **Emails not sending**: Check Resend verification status
   - **404 errors**: Verify environment variables are set
   - **Database errors**: Check Supabase connection and RLS
   - **Slow performance**: Check Vercel logs for errors

3. **Emergency Contact**
   - Vercel support: https://vercel.com/help
   - Supabase support: https://supabase.com/support
   - Resend support: https://resend.com/support

---

## 📞 Support Resources

- **DEPLOYMENT_READINESS.md**: Comprehensive review and findings
- **CLAUDE.md**: Project standards and guidelines
- **.env.example**: Complete environment variable reference
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs

---

**Ready to execute?** Start with Phase 1 and work through each task systematically. Good luck with the launch! 🚀
