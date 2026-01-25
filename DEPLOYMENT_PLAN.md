# Bridge Landing Page - Production Deployment Plan

**Status**: Ready for Deployment (pending configuration)
**Created**: 2026-01-23
**Deployment Target**: Vercel + Supabase

---

## Executive Summary

Your Bridge landing page has a **fully functional backend** with:
- ✅ Supabase database integration
- ✅ Email confirmation system (Resend)
- ✅ Rate limiting & security measures
- ✅ Complete validation & error handling
- ✅ Production-ready code

**Current Issue**: Environment variables not configured in Vercel

**Estimated Time to Deploy**: 15-20 minutes

---

## 🚨 Critical Issues Found

### 1. Missing Environment Variables in Vercel
The build failure occurred because Vercel doesn't have access to:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_REPLY_TO`
- `NEXT_PUBLIC_BASE_URL`

### 2. Database Migrations Status: Unknown
Cannot verify if migrations have been applied to production Supabase instance.

---

## 📋 Pre-Deployment Checklist

### Phase 1: Security Audit (CRITICAL)

- [ ] **Rotate Supabase Service Role Key**
  - Current key was committed to git (line 4 of `.env.local`)
  - Exposed key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - **Action**: Generate new service_role key in Supabase Dashboard
  - **Location**: Supabase → Settings → API → Service Role Key → Reset
  - **Update**: `.env.local` with new key

- [ ] **Rotate Resend API Key**
  - Current key was committed to git (line 13 of `.env.local`)
  - Exposed key: `re_EyquE55x_6cJsBxo7d3oJXsJZHj75hsfy`
  - **Action**: Generate new API key in Resend Dashboard
  - **Location**: Resend → API Keys → Create New
  - **Update**: `.env.local` with new key

- [ ] **Verify Domain in Resend**
  - Current from email: `onboarding@resend.dev` (testing only)
  - **Action**: Set up custom domain for production emails
  - **Recommended**: `hello@yourdomain.com` or `welcome@bridge.com`
  - **Location**: Resend → Domains → Add Domain

### Phase 2: Database Setup

- [ ] **Verify Supabase Project Status**
  - **Project URL**: `https://ikyiwnydgedwbmcdzgbe.supabase.co`
  - **Action**: Log into Supabase dashboard
  - **Verify**: Project is active and accessible

- [ ] **Apply Database Migrations** (if not already applied)

  **Option A: Supabase Dashboard (Recommended)**
  1. Go to Supabase Dashboard → SQL Editor
  2. Open new query
  3. Copy contents of each migration file in order:
     - `supabase/migrations/20250511000000_waitlist.sql`
     - `supabase/migrations/20250512000000_add_confirmation_fields.sql`
     - `supabase/migrations/20251210000000_restructure_waitlist.sql`
  4. Execute each migration
  5. Verify no errors

  **Option B: Supabase CLI** (if installed)
  ```bash
  # Install Supabase CLI if not already installed
  brew install supabase/tap/supabase

  # Link to your project
  supabase link --project-ref ikyiwnydgedwbmcdzgbe

  # Apply migrations
  supabase db push
  ```

- [ ] **Verify Table Structure**
  - **Action**: Supabase Dashboard → Table Editor
  - **Check**: Table `waitlist_signups` exists
  - **Verify columns**:
    - `id` (uuid, primary key)
    - `created_at` (timestamptz)
    - `name` (text, not null)
    - `email` (citext, unique, not null)
    - `phone` (text, nullable)
    - `location` (text, nullable)
    - `interest_type` (text, nullable)
    - `student_email` (text, nullable)
    - `first_name` (text, nullable) - legacy
    - `last_name` (text, nullable) - legacy
    - `source` (text)
    - `user_agent` (text)
    - `ip` (inet)
    - `consent` (boolean, default true)
    - `token_hash` (text)
    - `confirmation_sent_at` (timestamptz)
    - `confirmed_at` (timestamptz)
    - `token_expires_at` (timestamptz)

- [ ] **Verify RLS Policies**
  - **Action**: Supabase Dashboard → Authentication → Policies
  - **Check**: Table `waitlist_signups` has RLS enabled
  - **Verify policy**: `service_role_only` exists
  - **Policy rule**: Only service_role can insert/select

### Phase 3: Vercel Configuration

- [ ] **Add Environment Variables to Vercel**

  **Location**: Vercel Dashboard → Your Project → Settings → Environment Variables

  **Variables to add**:

  1. **SUPABASE_URL**
     - Value: `https://ikyiwnydgedwbmcdzgbe.supabase.co`
     - Apply to: Production, Preview, Development
     - Secret: ✅ Yes (recommended)

  2. **SUPABASE_SERVICE_ROLE_KEY**
     - Value: `[YOUR_NEW_ROTATED_KEY]`
     - Apply to: Production, Preview, Development
     - Secret: ✅ **REQUIRED**

  3. **RESEND_API_KEY**
     - Value: `[YOUR_NEW_ROTATED_KEY]`
     - Apply to: Production, Preview, Development
     - Secret: ✅ **REQUIRED**

  4. **RESEND_FROM_EMAIL**
     - Value: `hello@yourdomain.com` (or verified domain)
     - Apply to: Production, Preview, Development
     - Secret: ❌ No

  5. **RESEND_REPLY_TO**
     - Value: `support@yourdomain.com`
     - Apply to: Production, Preview, Development
     - Secret: ❌ No

  6. **NEXT_PUBLIC_BASE_URL**
     - Value (Production): `https://yourdomain.com`
     - Value (Preview): `https://[your-preview-url].vercel.app`
     - Value (Development): `http://localhost:3000`
     - Secret: ❌ No

- [ ] **Update Local Environment**
  - **Action**: Update `.env.local` with rotated credentials
  - **Verify**: `pnpm dev` runs without errors
  - **Test**: Submit waitlist form locally

### Phase 4: Pre-Deployment Testing

- [ ] **Build Test Locally**
  ```bash
  pnpm build
  ```
  - **Expected**: No TypeScript errors
  - **Expected**: No build errors
  - **Expected**: Output shows all pages built successfully

- [ ] **Smoke Test Local Backend**
  ```bash
  pnpm smoke:local
  ```
  - **Expected**: Waitlist signup succeeds
  - **Expected**: Email confirmation sent
  - **Expected**: Supabase record created

- [ ] **Manual Form Test**
  - **Action**: Run `pnpm dev` and navigate to `http://localhost:3000`
  - **Test cases**:
    1. Submit valid form → Success message
    2. Submit duplicate email → Duplicate detection
    3. Submit invalid email → Validation error
    4. Submit without required fields → Validation errors
    5. Rate limit test → 6 requests should trigger rate limit

---

## 🚀 Deployment Steps

### Step 1: Prepare Credentials

```bash
# 1. Rotate Supabase key
# - Go to Supabase Dashboard → Settings → API
# - Copy current service_role key (backup)
# - Click "Reset" on service_role key
# - Copy new key
# - Update .env.local

# 2. Rotate Resend key
# - Go to Resend Dashboard → API Keys
# - Create new API key
# - Copy new key
# - Revoke old key (after successful deployment)
# - Update .env.local

# 3. Verify domain in Resend (if not using onboarding@resend.dev)
# - Go to Resend Dashboard → Domains
# - Add your domain
# - Add DNS records (TXT, CNAME)
# - Wait for verification
```

### Step 2: Apply Database Migrations

```bash
# Option A: Manual via Supabase Dashboard
# 1. Open Supabase Dashboard → SQL Editor
# 2. Copy/paste each migration file in order
# 3. Execute and verify success

# Option B: Supabase CLI
supabase link --project-ref ikyiwnydgedwbmcdzgbe
supabase db push
```

### Step 3: Configure Vercel

```bash
# Add environment variables via Vercel Dashboard
# (See Phase 3 checklist above)

# OR use Vercel CLI
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM_EMAIL production
vercel env add RESEND_REPLY_TO production
vercel env add NEXT_PUBLIC_BASE_URL production

# Repeat for preview and development environments
```

### Step 4: Deploy

```bash
# Option A: Push to main branch (triggers automatic deploy)
git push origin main

# Option B: Manual deploy via Vercel Dashboard
# Vercel Dashboard → Deployments → "Redeploy"

# Option C: Deploy via Vercel CLI
vercel --prod
```

### Step 5: Verify Deployment

1. **Check Build Logs**
   - Vercel Dashboard → Deployments → Latest
   - Verify: Build succeeded
   - Verify: No environment variable errors

2. **Visit Production URL**
   - Navigate to your production domain
   - Verify: Page loads correctly
   - Verify: No console errors

3. **Test Waitlist Form**
   - Submit test signup
   - Check: Success message appears
   - Check: Email received
   - Check: Supabase record created

4. **Test Email Confirmation**
   - Click confirmation link in email
   - Verify: Redirected to `/confirmation` page
   - Verify: Record marked as confirmed in Supabase

5. **Monitor Logs**
   - Vercel Dashboard → Logs
   - Watch for any errors
   - Check: API routes responding correctly

---

## 🔧 Post-Deployment Tasks

### Immediate (Within 24 Hours)

- [ ] **Monitor Error Rates**
  - Vercel Dashboard → Logs → Filter by errors
  - Supabase Dashboard → Logs → Filter by errors
  - Resend Dashboard → Activity → Check delivery rate

- [ ] **Test Production Flow End-to-End**
  - Submit real signup
  - Verify email delivery
  - Test confirmation link
  - Check database record

- [ ] **Set Up Monitoring**
  - Enable Vercel Analytics
  - Configure error alerts (Sentry, LogRocket, etc.)
  - Set up uptime monitoring (UptimeRobot, Pingdom)

- [ ] **Revoke Old Credentials**
  - Delete old Resend API key
  - Verify old Supabase key no longer works
  - Remove exposed credentials from git history (optional)

### Within 1 Week

- [ ] **Performance Audit**
  - Run Lighthouse audit
  - Check Core Web Vitals
  - Optimize if needed

- [ ] **SEO Verification**
  - Verify meta tags render correctly
  - Submit sitemap to Google Search Console
  - Check Open Graph preview

- [ ] **Analytics Setup**
  - Configure Vercel Analytics
  - Set up conversion tracking
  - Monitor signup funnel

### Ongoing

- [ ] **Weekly Database Backups**
  - Supabase has automatic backups
  - Verify backup settings in dashboard
  - Test restore process

- [ ] **Monthly Security Review**
  - Check for dependency updates
  - Review Supabase advisor notices
  - Audit RLS policies

---

## 🐛 Troubleshooting Guide

### Build Fails: "Missing environment variable"

**Cause**: Environment variables not set in Vercel
**Solution**: Follow Phase 3 checklist
**Verification**: Redeploy after adding variables

### Build Fails: "Failed to collect page data for /api/confirm"

**Cause**: API route error during build (likely env vars)
**Solution**: Ensure all Supabase env vars are set
**Note**: This route is dynamic and should not cause build failure unless misconfigured

### Form Submission Fails: 500 Error

**Cause**: Database connection or RLS policy issue
**Check**: Vercel function logs for specific error
**Common fixes**:
- Verify service_role key is correct
- Verify RLS policy allows service_role inserts
- Check Supabase project is active

### Emails Not Sending

**Cause**: Resend configuration issue
**Common fixes**:
- Verify API key is correct
- Verify from email domain is verified
- Check Resend dashboard → Activity for errors
- Ensure `RESEND_FROM_EMAIL` uses verified domain

### Duplicate Email Detection Not Working

**Cause**: Unique constraint not applied
**Solution**: Verify migration `20251210000000_restructure_waitlist.sql` applied
**Check**: Supabase → Table Editor → Indexes → `waitlist_signups_email_unique`

### Rate Limiting Not Working

**Note**: Rate limiting uses in-memory storage
**Limitation**: Resets when Vercel function cold starts
**Upgrade Path**: Use Redis or Upstash for persistent rate limiting

---

## 📊 Success Metrics

### Technical Success
- ✅ Build completes without errors
- ✅ All API routes respond with 200 status
- ✅ Email delivery rate > 95%
- ✅ Database connection stable
- ✅ Page load time < 2 seconds

### User Success
- ✅ Waitlist form submits successfully
- ✅ Confirmation emails arrive within 60 seconds
- ✅ Email links work correctly
- ✅ Success messages display properly
- ✅ No user-reported errors

---

## 🔐 Security Reminders

1. **NEVER commit `.env.local`** to git (already in `.gitignore`)
2. **NEVER use exposed credentials** (rotate immediately)
3. **ALWAYS mark secrets** as "Secret" in Vercel
4. **VERIFY RLS policies** are enabled on all tables
5. **MONITOR logs** for suspicious activity
6. **ROTATE credentials** every 90 days (best practice)

---

## 📚 Reference Documentation

- **VERCEL_ENV_CHECKLIST.md** - Environment variable setup guide
- **DEPLOYMENT_SECURITY.md** - Credential rotation instructions
- **EMAIL_SETUP.md** - Resend email configuration
- **CONFIRMATION_IMPLEMENTATION.md** - Email verification flow
- **docs/waitlist-backend-checklist.md** - Backend validation tests
- **.env.example** - Environment variable reference

---

## 🎯 Next Steps (Priority Order)

1. ✅ **Phase 1: Security Audit** - Rotate credentials (15 min)
2. ✅ **Phase 2: Database Setup** - Apply migrations (5 min)
3. ✅ **Phase 3: Vercel Config** - Add environment variables (5 min)
4. ✅ **Phase 4: Testing** - Local smoke tests (10 min)
5. ✅ **Deploy** - Push to production (5 min)
6. ✅ **Verify** - Test production flow (10 min)

**Total Time**: ~50 minutes (including testing and verification)

---

## 🆘 Need Help?

- **Supabase Issues**: Check Supabase Dashboard → Logs
- **Vercel Issues**: Check Vercel Dashboard → Functions → Logs
- **Email Issues**: Check Resend Dashboard → Activity
- **Code Issues**: Run `pnpm dev` locally and check console

---

**Last Updated**: 2026-01-23
**Document Version**: 1.0
**Status**: Ready for execution
