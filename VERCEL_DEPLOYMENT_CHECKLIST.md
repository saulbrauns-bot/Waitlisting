# Vercel Deployment Checklist for Bridge Landing Page

## Pre-Deployment (Complete Before Pushing to Vercel)

### 1. Environment Variables to Add in Vercel
```
SUPABASE_URL=https://ikyiwnydgedwbmcdzgbe.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreWl3bnlkZ2Vkd2JtY2R6Z2JlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY2ODgyMywiZXhwIjoyMDc3MjQ0ODIzfQ.Yz1FSIsDvuz4nRge4zBJ7vxj-RQDYYPdb_MHr4eJRFs
```

**Important:** Add these in Vercel Dashboard → Project Settings → Environment Variables

### 2. Local Testing Checklist
- [ ] Dev server runs without errors
- [ ] Form submission works
- [ ] Success message displays
- [ ] Confirmation page loads with refCode
- [ ] Mobile responsive (test on phone)
- [ ] All images load correctly

### 3. Git Repository Status
- [ ] All files committed to git
- [ ] No sensitive data in committed files (.env.local is gitignored)
- [ ] Push to GitHub/GitLab

### 4. Vercel Deployment Steps

#### Option A: Deploy via Vercel CLI (Recommended)
```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production (after testing preview)
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: pnpm build
   - Output Directory: .next
   - Install Command: pnpm install
4. Add Environment Variables (from section 1 above)
5. Click "Deploy"

### 5. Post-Deployment Testing
- [ ] Visit your-project.vercel.app
- [ ] Test form submission on production
- [ ] Check Supabase database for new entry
- [ ] Test on mobile device
- [ ] Check Vercel deployment logs for errors

### 6. Custom Domain Setup (Optional)
- [ ] Add custom domain in Vercel dashboard
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (automatic)
- [ ] Verify HTTPS works

## Troubleshooting

### If form submission fails on Vercel:
1. Check Environment Variables are set correctly
2. Check Vercel Function Logs
3. Verify Supabase URL is accessible from Vercel

### If images don't load:
1. Check image paths are correct (use `/images/...` not `./images/...`)
2. Verify images are in `public/` directory
3. Check Next.js Image Optimization is working

### If build fails:
1. Check for TypeScript errors: `pnpm build` locally
2. Check for missing dependencies
3. Review Vercel build logs

## Performance Checklist (After Deployment)
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify analytics tracking
- [ ] Test from different geographic locations

## Monitoring
- [ ] Set up Vercel Analytics
- [ ] Monitor Supabase dashboard for errors
- [ ] Check Vercel function execution logs

---

## Quick Commands Reference

```bash
# Test production build locally
pnpm build && pnpm start

# Deploy to Vercel preview
vercel

# Deploy to Vercel production
vercel --prod

# View deployment logs
vercel logs
```

## Emergency Rollback
If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
