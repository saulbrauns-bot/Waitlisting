# 🚀 Deploy Bridge Landing Page NOW - Quick Start

**Estimated Time**: 20 minutes
**Prerequisites**: Access to Supabase, Resend, and Vercel dashboards

---

## Step 1: Rotate Exposed Credentials (5 min)

### Supabase Service Role Key

1. Open: https://supabase.com/dashboard/project/ikyiwnydgedwbmcdzgbe/settings/api
2. Scroll to "Service role key"
3. Click "Reset" button
4. Copy the new key
5. Update `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=<paste_new_key_here>
   ```

### Resend API Key

1. Open: https://resend.com/api-keys
2. Click "Create API Key"
3. Name: "Bridge Production"
4. Copy the new key
5. Update `.env.local`:
   ```bash
   RESEND_API_KEY=<paste_new_key_here>
   ```
6. Delete old key: `re_EyquE55x_6cJsBxo7d3oJXsJZHj75hsfy`

---

## Step 2: Verify Database Migrations (5 min)

### Option A: Check via Supabase Dashboard

1. Open: https://supabase.com/dashboard/project/ikyiwnydgedwbmcdzgbe/editor
2. Look for table `waitlist_signups`
3. **If table exists**: ✅ Skip to Step 3
4. **If table missing**: Continue to Option B

### Option B: Apply Migrations Manually

1. Open: https://supabase.com/dashboard/project/ikyiwnydgedwbmcdzgbe/sql/new
2. Copy/paste content from:
   - `supabase/migrations/20250511000000_waitlist.sql`
3. Click "Run"
4. Repeat for:
   - `supabase/migrations/20250512000000_add_confirmation_fields.sql`
   - `supabase/migrations/20251210000000_restructure_waitlist.sql`
5. Verify: Table `waitlist_signups` now exists

---

## Step 3: Configure Vercel Environment Variables (5 min)

1. Open: https://vercel.com/[your-username]/bridge-landing/settings/environment-variables

2. Click "Add New" for each variable below:

### Variable 1: SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: `https://ikyiwnydgedwbmcdzgbe.supabase.co`
- **Environments**: Production, Preview, Development (check all)
- **Mark as Secret**: Yes

### Variable 2: SUPABASE_SERVICE_ROLE_KEY
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: [Paste the NEW rotated key from Step 1]
- **Environments**: Production, Preview, Development (check all)
- **Mark as Secret**: ✅ REQUIRED

### Variable 3: RESEND_API_KEY
- **Key**: `RESEND_API_KEY`
- **Value**: [Paste the NEW rotated key from Step 1]
- **Environments**: Production, Preview, Development (check all)
- **Mark as Secret**: ✅ REQUIRED

### Variable 4: RESEND_FROM_EMAIL
- **Key**: `RESEND_FROM_EMAIL`
- **Value**: `onboarding@resend.dev` (or your verified domain email)
- **Environments**: Production, Preview, Development (check all)
- **Mark as Secret**: No

### Variable 5: RESEND_REPLY_TO
- **Key**: `RESEND_REPLY_TO`
- **Value**: `saulbrauns@gmail.com` (or your support email)
- **Environments**: Production, Preview, Development (check all)
- **Mark as Secret**: No

### Variable 6: NEXT_PUBLIC_BASE_URL

For **Production**:
- **Key**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://waitlisting-gtpgcq1t3-saulbrauns-bots-projects.vercel.app` (or your custom domain)
- **Environments**: Production only
- **Mark as Secret**: No

For **Preview**:
- Click "Add New" again
- **Key**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://[your-preview-url].vercel.app`
- **Environments**: Preview only
- **Mark as Secret**: No

For **Development**:
- Click "Add New" again
- **Key**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `http://localhost:3000`
- **Environments**: Development only
- **Mark as Secret**: No

3. Verify you have **7 total variables** configured

---

## Step 4: Test Locally (2 min)

```bash
# Verify environment is correct
pnpm dev
```

- Open: http://localhost:3000
- Submit test waitlist form
- Verify: Success message appears
- Check: Email arrives in inbox
- ✅ If working: Continue to Step 5
- ❌ If errors: Check console logs

---

## Step 5: Deploy to Vercel (1 min)

### Option A: Automatic Deploy
```bash
git add .
git commit -m "chore: configure production environment"
git push origin main
```

### Option B: Manual Redeploy
1. Open Vercel Dashboard
2. Go to: Deployments
3. Click "..." on latest deployment
4. Click "Redeploy"
5. Confirm

---

## Step 6: Verify Production (2 min)

1. **Check Build Status**
   - Vercel Dashboard → Deployments
   - Wait for "Ready" status
   - ✅ Verify: No build errors

2. **Visit Production URL**
   - Open: https://waitlisting-gtpgcq1t3-saulbrauns-bots-projects.vercel.app
   - ✅ Verify: Page loads

3. **Test Waitlist Form**
   - Fill out form with real email
   - Submit
   - ✅ Verify: Success message
   - ✅ Verify: Email received
   - ✅ Verify: Confirmation link works

4. **Check Database**
   - Open: https://supabase.com/dashboard/project/ikyiwnydgedwbmcdzgbe/editor
   - Table: `waitlist_signups`
   - ✅ Verify: New record appears

---

## ✅ Success Checklist

- [ ] Supabase service role key rotated
- [ ] Resend API key rotated
- [ ] Old credentials revoked
- [ ] 7 environment variables added to Vercel
- [ ] All secrets marked as "Secret"
- [ ] Local test passed
- [ ] Deployment succeeded
- [ ] Production form submission works
- [ ] Email confirmation received
- [ ] Database record created

---

## 🐛 Quick Troubleshooting

### "Missing environment variable: SUPABASE_URL"
- **Fix**: Verify all variables added to Vercel
- **Then**: Redeploy application

### "Failed to collect page data for /api/confirm"
- **Cause**: API route error (usually env vars)
- **Fix**: Check Vercel function logs
- **Redeploy**: After fixing variables

### Form submits but no email received
- **Check**: Resend Dashboard → Activity
- **Verify**: API key is correct (rotated)
- **Verify**: From email domain verified (if not using onboarding@resend.dev)

### Database connection error
- **Check**: Vercel function logs
- **Verify**: Service role key correct
- **Verify**: Supabase project active

---

## 📞 Support Resources

- **Vercel Logs**: https://vercel.com/[username]/bridge-landing/logs
- **Supabase Logs**: https://supabase.com/dashboard/project/ikyiwnydgedwbmcdzgbe/logs
- **Resend Activity**: https://resend.com/activity

---

## 🎯 After Successful Deploy

1. **Monitor for 1 hour**
   - Watch Vercel logs for errors
   - Test form submissions
   - Verify email delivery

2. **Delete old Resend key**
   - Go to: https://resend.com/api-keys
   - Find: `re_EyquE55x_6cJsBxo7d3oJXsJZHj75hsfy`
   - Click: Delete

3. **Celebrate** 🎉
   - Your landing page is live!
   - Backend is fully functional
   - Ready to collect signups

---

**Last Updated**: 2026-01-23
