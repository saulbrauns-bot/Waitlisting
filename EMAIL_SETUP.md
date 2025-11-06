# Email Setup Guide for Bridge Waitlist

## Overview

Your Bridge landing page now sends beautiful confirmation emails to users when they join the waitlist. This guide will help you set up email delivery using Resend.

---

## Quick Setup (5 minutes)

### 1. Sign Up for Resend

1. Go to **https://resend.com**
2. Click "Start Building for Free"
3. Sign up with your GitHub account (or email)
4. Verify your email address

### 2. Get Your API Key

1. In the Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Name it: `Bridge Waitlist - Production`
4. Copy the API key (starts with `re_`)

### 3. Add API Key to Environment Variables

**Local Development:**
```bash
# Add to .env.local
RESEND_API_KEY=re_your_actual_key_here
```

**Vercel Production:**
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add new variable:
   - Name: `RESEND_API_KEY`
   - Value: `re_your_actual_key_here`
   - Environment: Production, Preview, Development (all)
4. Redeploy your app

---

## Email Configuration

### For Testing (Immediate - No Setup Required)

Resend provides a default sender for testing:
- **From**: `onboarding@resend.dev`
- **Limit**: 100 emails/day
- **Perfect for**: Testing, development, initial launch

The email template is already configured to use this. Just add your API key!

### For Production (Recommended after launch)

To send emails from your own domain (e.g., `hello@joybridgeapp.com`):

1. **Verify Your Domain** in Resend:
   - Go to Resend Dashboard → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `joybridgeapp.com`)
   - Add the DNS records Resend provides to your domain registrar
   - Wait for verification (usually 5-10 minutes)

2. **Update the Email Template**:
   ```typescript
   // In app/lib/email.ts, change:
   from: 'Bridge <onboarding@resend.dev>'

   // To:
   from: 'Bridge <hello@joybridgeapp.com>'
   ```

---

## Email Template Details

### What's Included

The confirmation email includes:
- ✅ Personalized greeting with first name
- ✅ Confirmation they're on the waitlist
- ✅ Reminder of their 12-month free reward
- ✅ Their unique referral code
- ✅ What to expect next
- ✅ Beautiful responsive design
- ✅ Mobile-optimized layout

### Email Preview

```
Subject: You're on the Bridge waitlist!

---

Welcome to Bridge

Hi Emma,

You're officially on the waitlist! 🎉

We're building something special for busy NYC professionals who want
real connections without the endless swiping. You'll be among the
first to know when we launch.

╔══════════════════════════════════════════╗
║     Your Early Member Reward             ║
║                                          ║
║     12 months of Bridge at no cost      ║
║                                          ║
║  As one of our first 2,500 members,     ║
║  you'll get a full year of Bridge for   ║
║  free. We'll email you when it's time   ║
║  to claim your reward.                   ║
╚══════════════════════════════════════════╝

Your referral code: EMMA1234
Share Bridge with friends and move up the waitlist together.

What's next?
1. We'll email you when Bridge launches in NYC (early 2026)
2. You'll get early access to claim your 12-month reward
3. Start meeting other busy professionals who get it

Questions? Just reply to this email.

– The Bridge Team
```

---

## Testing the Email

### Local Testing

1. Make sure your `.env.local` has the `RESEND_API_KEY`
2. Restart your dev server: `pnpm dev`
3. Go to http://localhost:3000
4. Fill out the waitlist form with YOUR real email
5. Submit the form
6. Check your inbox (and spam folder)

### Without API Key (Dev Mode)

If you don't add an API key yet, the app will still work! You'll see console logs like:
```
📧 Email would be sent to: user@example.com
⚠️  Resend not configured. Skipping email send.
```

This lets you develop without setting up email immediately.

---

## Monitoring & Limits

### Free Tier Limits

Resend's free tier includes:
- ✅ **3,000 emails per month**
- ✅ **100 emails per day**
- ✅ **Unlimited domains**
- ✅ **Email logs & analytics**

Perfect for your waitlist! At 100 signups/day, you can handle 3,000 signups in your first month.

### Monitoring Emails

Check your email delivery in the Resend dashboard:
1. Go to **Logs** to see all sent emails
2. View delivery status (Sent, Delivered, Bounced, etc.)
3. Check open rates and click tracking (if enabled)

---

## Troubleshooting

### Email not sending?

1. **Check API key is set:**
   ```bash
   # In your terminal
   echo $RESEND_API_KEY  # Should show your key
   ```

2. **Check server logs:**
   ```bash
   # Look for these messages in your terminal
   ✅ Email sent successfully: <message-id>
   # OR
   ⚠️  Resend not configured. Skipping email send.
   ```

3. **Verify email address:**
   - Make sure you're using a real, valid email
   - Check spam folder
   - Try a different email provider (Gmail, Outlook, etc.)

### Email goes to spam?

This is common with `onboarding@resend.dev`. Solutions:
1. Verify your own domain (recommended)
2. Add "no-reply" or "hello" email address
3. Configure SPF/DKIM records (done automatically when you verify domain)

### Rate limit exceeded?

Free tier is 100/day. If you hit this:
1. Wait 24 hours for reset
2. Upgrade to paid plan ($20/month for 50k emails)
3. Or temporarily disable email sending

---

## Next Steps

### Before Launch
- [x] Install Resend
- [x] Create email template
- [x] Integrate with API
- [ ] **Get Resend API key**
- [ ] Add API key to Vercel environment variables
- [ ] Test email with your own email address
- [ ] Verify email arrives and looks good

### After Initial Launch
- [ ] Monitor email delivery in Resend dashboard
- [ ] Verify your custom domain
- [ ] Update "from" address to use your domain
- [ ] Set up email forwarding for replies

---

## Cost Breakdown

| Signups | Emails/Month | Resend Cost |
|---------|--------------|-------------|
| 0-3,000 | 3,000        | **FREE** ✅ |
| 3,001-50,000 | 50,000  | $20/month   |
| 50,000+ | Custom       | Custom pricing |

For your waitlist launch, the free tier is perfect!

---

## Support

- **Resend Docs**: https://resend.com/docs
- **React Email Docs**: https://react.email/docs
- **Need Help?**: Check Resend's Discord or support email

---

## Quick Reference Commands

```bash
# Add Resend API key locally
echo "RESEND_API_KEY=re_your_key" >> .env.local

# Restart dev server
pnpm dev

# Test the API directly
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"your@email.com"}'

# Check if email was logged
# Look for "✅ Email sent successfully" in terminal
```

---

You're all set! 🎉

Once you add your Resend API key, confirmation emails will be sent automatically to everyone who joins your waitlist.
