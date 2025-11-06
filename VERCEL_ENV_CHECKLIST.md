# Vercel Environment Variables Checklist

## Required Environment Variables for Production Deployment

Use this checklist when configuring environment variables in Vercel Dashboard.

**Location**: Vercel Dashboard → Your Project → Settings → Environment Variables

---

## 📋 Variables to Add

### Public Variables (not sensitive)

- [ ] `NEXT_PUBLIC_BASE_URL`
  - **Value**: `https://yourdomain.com` (your production domain)
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ❌ No

- [ ] `APP_VERSION`
  - **Value**: `v1.0.0` (or current version)
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ❌ No
  - **Optional**: Yes (defaults to 'dev' if not set)

---

### Secret Variables (MUST mark as secret)

- [ ] `SUPABASE_URL`
  - **Value**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
  - **Where to find**: Supabase Dashboard → Settings → API
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ✅ Yes (recommended)

- [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - **Value**: Your **ROTATED** service role key (see DEPLOYMENT_SECURITY.md)
  - **Where to find**: Supabase Dashboard → Settings → API → service_role key
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ✅ **REQUIRED**
  - **⚠️ IMPORTANT**: Use the NEW key after rotation

- [ ] `RESEND_API_KEY`
  - **Value**: Your **ROTATED** Resend API key (see DEPLOYMENT_SECURITY.md)
  - **Where to find**: Resend Dashboard → API Keys
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ✅ **REQUIRED**
  - **⚠️ IMPORTANT**: Use the NEW key after rotation

- [ ] `RESEND_FROM_EMAIL`
  - **Value**: `hello@yourdomain.com` (must be verified in Resend)
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ❌ No (but keep private)
  - **⚠️ IMPORTANT**: Domain must be verified in Resend dashboard first

- [ ] `RESEND_REPLY_TO`
  - **Value**: `support@yourdomain.com` (or your support email)
  - **Apply to**: Production, Preview, Development
  - **Mark as Secret**: ❌ No

---

## 🔐 Security Reminders

1. **NEVER use the old credentials** - They were exposed in git history
2. **Always mark API keys as "Secret"** - This encrypts them in Vercel
3. **Copy values from your local `.env.local`** - After rotating credentials
4. **Verify domain in Resend first** - Before setting `RESEND_FROM_EMAIL`
5. **Test in Preview environment** - Before applying to Production

---

## 📝 Environment Types

When adding variables, you can choose where they apply:

- **Production**: Live site (yourdomain.com)
- **Preview**: Preview deployments (PR branches, feature branches)
- **Development**: Local development with `vercel dev`

**Recommendation**: Apply all variables to all three environments for consistency.

---

## ✅ Verification Steps

After adding all environment variables:

1. **Check Variable Count**
   - You should have **7 total variables** configured
   - 2 public variables
   - 5 secret/sensitive variables

2. **Verify "Secret" Status**
   - ✅ `SUPABASE_SERVICE_ROLE_KEY` shows a lock icon
   - ✅ `RESEND_API_KEY` shows a lock icon
   - ✅ Values are masked (not visible after saving)

3. **Trigger Redeploy**
   - After adding variables, redeploy your application
   - Vercel → Deployments → Latest deployment → "..." → Redeploy

4. **Test in Production**
   - Visit your production URL
   - Submit waitlist form
   - Verify email arrives
   - Check Supabase for new record

---

## 🚨 Troubleshooting

### "Environment variable not found" error

**Solution**: Ensure you've redeployed after adding variables. Environment variables are only loaded during build/deploy.

```bash
# Force redeploy via CLI
vercel --prod --force
```

### Emails not sending

**Possible causes**:
1. `RESEND_API_KEY` not set or incorrect
2. `RESEND_FROM_EMAIL` domain not verified
3. Old (exposed) API key still being used

**Solution**: Check Resend dashboard → Activity for errors

### Database connection failed

**Possible causes**:
1. `SUPABASE_URL` incorrect
2. `SUPABASE_SERVICE_ROLE_KEY` not set or incorrect
3. Old (exposed) key still being used

**Solution**: Check Vercel function logs for specific error message

---

## 📋 Quick Copy Template

For easy copying into Vercel:

```bash
# Public Variables
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
APP_VERSION=v1.0.0

# Supabase (mark as secret)
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-rotated-service-role-key

# Resend (mark as secret)
RESEND_API_KEY=your-rotated-resend-api-key
RESEND_FROM_EMAIL=hello@yourdomain.com
RESEND_REPLY_TO=support@yourdomain.com
```

**⚠️ Remember**: Replace placeholder values with actual credentials from your `.env.local` (after rotation)

---

## 🔄 After Rotation

After rotating credentials (see DEPLOYMENT_SECURITY.md):

1. [ ] Update `SUPABASE_SERVICE_ROLE_KEY` in Vercel
2. [ ] Update `RESEND_API_KEY` in Vercel
3. [ ] Redeploy application
4. [ ] Test production signup flow
5. [ ] Verify emails send successfully
6. [ ] Monitor Vercel logs for 24 hours

---

## 📚 Related Documentation

- **DEPLOYMENT_SECURITY.md** - Credential rotation instructions
- **VERCEL_DEPLOYMENT_CHECKLIST.md** - Full deployment checklist
- **.env.example** - Complete environment variable reference
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/environment-variables

---

**Last Updated**: 2025-01-06
