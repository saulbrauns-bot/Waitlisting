# 🔐 Bridge Landing Page - Security & Credential Rotation Guide

**Created**: 2025-01-06
**Status**: CRITICAL - ACTION REQUIRED BEFORE DEPLOYMENT
**Priority**: 🔴 **HIGHEST**

---

## ⚠️ SECURITY ALERT

### Credentials Exposed in Git History

During deployment preparation analysis, **API credentials were discovered in committed documentation files**. While the `.env.local` file itself was never committed (properly ignored), documentation files contained example configurations with **real production credentials**.

**Files Affected** (now sanitized):
- `VERCEL_DEPLOYMENT_CHECKLIST.md`
- `DEPLOYMENT_READINESS.md`
- `PRE_PRODUCTION_ACTION_PLAN.md`

**Credentials Exposed**:
1. ✅ Supabase Service Role Key
2. ✅ Resend API Key
3. ✅ Supabase Project URL (public, but reveals project structure)

**Status**:
- ✅ Credentials removed from current files
- ❌ Credentials still exist in git history
- 🔴 **MUST rotate both keys before deployment**

---

## 📋 IMMEDIATE ACTION REQUIRED

### Step 1: Rotate Supabase Service Role Key (5 minutes)

**Why**: The service role key has admin-level access to your entire Supabase database. If compromised, attackers could read, modify, or delete all data.

**Actions**:

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com/project/ikyiwnydgedwbmcdzgbe/settings/api
   - Navigate to: Settings → API → Service role key

2. **Regenerate the Key**
   - Click "Reset service_role secret"
   - Confirm regeneration
   - **IMPORTANT**: Old key will immediately stop working

3. **Update Local Environment**
   ```bash
   # Edit .env.local
   nano .env.local

   # Replace old SUPABASE_SERVICE_ROLE_KEY with new key
   SUPABASE_SERVICE_ROLE_KEY=eyJ... [new key from dashboard]
   ```

4. **Verify It Works**
   ```bash
   # Test the new key
   pnpm dev

   # Try submitting the waitlist form
   # Check Supabase logs for successful insert
   ```

5. **Store Securely**
   - Add to password manager (1Password, Bitwarden, etc.)
   - NEVER commit to git
   - NEVER share via Slack/email
   - NEVER screenshot

---

### Step 2: Rotate Resend API Key (5 minutes)

**Why**: The Resend API key allows sending emails from your domain. If compromised, attackers could send spam or phishing emails appearing to come from your brand.

**Actions**:

1. **Go to Resend Dashboard**
   - URL: https://resend.com/api-keys
   - Login with your Resend account

2. **Delete Old Key**
   - Find the key named (usually "Bridge Production" or similar)
   - Click "..." → "Delete"
   - Confirm deletion

3. **Create New Key**
   - Click "Create API Key"
   - Name: "Bridge Production" (rotated 2025-01-06)
   - Permissions: Send emails
   - Domain: Your verified domain
   - Click "Create"

4. **Update Local Environment**
   ```bash
   # Edit .env.local
   nano .env.local

   # Replace old RESEND_API_KEY with new key
   RESEND_API_KEY=re_... [new key from dashboard]
   ```

5. **Verify It Works**
   ```bash
   # Test the new key
   pnpm dev

   # Submit waitlist form
   # Check email arrives successfully
   ```

6. **Store Securely**
   - Add to password manager
   - Note the rotation date
   - Set calendar reminder for next rotation (90 days)

---

### Step 3: Clean Git History (Optional but Recommended)

**Why**: Even though credentials are rotated, having them in git history is poor security hygiene. Future developers might accidentally reuse old keys or patterns.

**WARNING**: This rewrites git history. Only do this if you're the sole contributor or coordinate with your team.

**Option A: Using BFG Repo-Cleaner (Recommended)**

```bash
# Install BFG
brew install bfg  # macOS
# or download from https://rtyley.github.io/bfg-repo-cleaner/

# Clone a fresh copy of your repo
cd ~/temp
git clone --mirror https://github.com/yourusername/bridge-landing.git
cd bridge-landing.git

# Remove exposed credentials
bfg --replace-text passwords.txt

# Force push (WARNING: destructive)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

**passwords.txt**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreWl3bnlkZ2Vkd2JtY2R6Z2JlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY2ODgyMywiZXhwIjoyMDc3MjQ0ODIzfQ.Yz1FSIsDvuz4nRge4zBJ7vxj-RQDYYPdb_MHr4eJRFs
re_EyquE55x_6cJsBxo7d3oJXsJZHj75hsfy
```

**Option B: Using git-filter-repo**

```bash
# Install git-filter-repo
pip3 install git-filter-repo

# Create filter file
cat > filter-credentials.txt <<EOF
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...==>***REMOVED-SUPABASE-KEY***
re_EyquE55x_6cJsBxo7d3oJXsJZHj75hsfy==>***REMOVED-RESEND-KEY***
EOF

# Apply filter
git filter-repo --replace-text filter-credentials.txt

# Force push
git push --force --all
```

**Option C: Start Fresh (Nuclear Option)**

If the repository is new and has minimal history:

```bash
# 1. Delete .git folder
rm -rf .git

# 2. Reinitialize
git init
git add .
git commit -m "Initial commit (credentials removed)"

# 3. Force push to origin
git remote add origin https://github.com/yourusername/bridge-landing.git
git push -u --force origin main
```

---

## 🔒 Future Security Best Practices

### 1. Never Commit Secrets

**DO**:
- Use `.env.local` for development secrets (already in .gitignore)
- Use `.env.example` with placeholder values
- Use Vercel environment variables for production
- Store secrets in password managers

**DON'T**:
- Commit `.env.local` or `.env` files
- Put real credentials in documentation
- Share secrets in Slack/Discord/email
- Screenshot environment variables

---

### 2. Use Environment-Specific Variables

```bash
# .env.local (NEVER commit)
SUPABASE_SERVICE_ROLE_KEY=real-secret-key-here
RESEND_API_KEY=real-api-key-here

# .env.example (SAFE to commit)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
RESEND_API_KEY=your-resend-api-key
```

---

### 3. Rotate Credentials Regularly

**Recommended Schedule**:
- Production API keys: Every 90 days
- Service role keys: Every 180 days
- After any security incident: Immediately
- After team member departure: Immediately

**Set Calendar Reminders**:
- April 6, 2025: Rotate Resend API key
- July 6, 2025: Rotate Supabase service role key

---

### 4. Limit Credential Scope

**Supabase**:
- Use anon/public key for client-side code
- Reserve service_role key for server-only operations
- Consider creating additional service accounts with limited permissions

**Resend**:
- Create separate API keys for dev vs production
- Use domain restrictions where possible
- Enable webhook signature verification

---

### 5. Monitor for Exposed Secrets

**Tools to Use**:
1. **Git-secrets** (prevent accidental commits)
   ```bash
   brew install git-secrets
   git secrets --install
   git secrets --register-aws  # or custom patterns
   ```

2. **Gitleaks** (scan for exposed secrets)
   ```bash
   brew install gitleaks
   gitleaks detect --source . --verbose
   ```

3. **GitHub Secret Scanning** (automatic)
   - Enabled by default on public repos
   - Enable Advanced Security for private repos

---

## ✅ Post-Rotation Verification Checklist

After rotating credentials, verify everything works:

- [ ] **Local Development**
  - [ ] Dev server starts without errors (`pnpm dev`)
  - [ ] Waitlist form submission succeeds
  - [ ] Email confirmation arrives
  - [ ] Confirmation link works
  - [ ] Database shows new record

- [ ] **Vercel Environment Variables**
  - [ ] Updated `SUPABASE_SERVICE_ROLE_KEY` in Vercel dashboard
  - [ ] Updated `RESEND_API_KEY` in Vercel dashboard
  - [ ] Marked both as "Secret"
  - [ ] Applied to Production, Preview, and Development

- [ ] **Production Testing**
  - [ ] Deploy to Vercel
  - [ ] Test signup flow end-to-end
  - [ ] Verify email sends from correct domain
  - [ ] Check Vercel function logs for errors
  - [ ] Monitor Supabase logs for successful inserts

- [ ] **Security Cleanup**
  - [ ] Old keys confirmed inactive
  - [ ] New keys stored in password manager
  - [ ] Git history cleaned (if using Option A/B/C)
  - [ ] Team notified of credential rotation
  - [ ] Documentation updated with rotation date

---

## 🚨 If Credentials Were Actually Compromised

If you suspect the exposed credentials were actually accessed by unauthorized parties:

### Immediate Actions (within 1 hour)

1. **Rotate All Credentials** (done above)

2. **Review Access Logs**
   - Supabase: Settings → Logs → API logs
   - Resend: Dashboard → Logs → Email activity
   - Look for unusual IPs or patterns

3. **Check Database Integrity**
   ```sql
   -- Check for suspicious records
   SELECT *
   FROM waitlist_signups
   WHERE created_at > '2025-01-05'
   ORDER BY created_at DESC;

   -- Look for unusual patterns
   SELECT
     email,
     COUNT(*) as count,
     MAX(created_at) as last_signup
   FROM waitlist_signups
   GROUP BY email
   HAVING COUNT(*) > 1;
   ```

4. **Check Email Sending Activity**
   - Resend Dashboard → Activity
   - Look for emails sent to unexpected recipients
   - Check for volume spikes

### Follow-Up Actions (within 24 hours)

5. **Enable Additional Security**
   - Supabase: Enable database audit logs
   - Supabase: Consider IP allowlisting
   - Resend: Enable webhook signing
   - Vercel: Enable Vercel Pro security features (if available)

6. **Notify Stakeholders**
   - Inform team members
   - If user data was accessed, follow GDPR notification requirements
   - Document incident in security log

7. **Implement Monitoring**
   - Set up Sentry or similar error tracking
   - Configure alerting for unusual database activity
   - Monitor email sending rates

---

## 📞 Support & Resources

### Supabase
- Dashboard: https://app.supabase.com/
- API Settings: https://app.supabase.com/project/_/settings/api
- Security Best Practices: https://supabase.com/docs/guides/platform/security
- Support: support@supabase.com

### Resend
- Dashboard: https://resend.com/
- API Keys: https://resend.com/api-keys
- Security: https://resend.com/docs/security
- Support: support@resend.com

### Vercel
- Dashboard: https://vercel.com/
- Environment Variables: Project Settings → Environment Variables
- Security: https://vercel.com/docs/concepts/security
- Support: https://vercel.com/support

---

## 📝 Rotation Log

Keep a record of when credentials were rotated:

| Date | Credential | Action | Reason | Performed By |
|------|------------|--------|--------|--------------|
| 2025-01-06 | Supabase Service Role Key | Rotated | Exposed in git history | [Your Name] |
| 2025-01-06 | Resend API Key | Rotated | Exposed in git history | [Your Name] |
| | | | | |

---

## ✅ Completion Checklist

Before proceeding with deployment:

- [ ] Supabase service role key rotated
- [ ] Resend API key rotated
- [ ] Local `.env.local` updated with new keys
- [ ] Local development verified working
- [ ] Vercel environment variables updated
- [ ] Git history cleaned (optional)
- [ ] Documentation sanitized (completed)
- [ ] Team notified of rotation
- [ ] New credentials stored securely
- [ ] Calendar reminders set for next rotation

---

**Status**: Once all items above are checked, you are clear to proceed with deployment.

**Next Steps**: Follow the deployment checklist in `VERCEL_DEPLOYMENT_CHECKLIST.md` (now sanitized).
