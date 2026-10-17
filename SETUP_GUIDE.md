# Email & Database Setup Guide

## Quick Setup (5 minutes)

### 1. MongoDB Atlas (Free - Database)

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a **FREE M0 cluster** (512MB storage)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add to `.env.local`:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
   ```

**Important**: In Atlas, go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (0.0.0.0/0)

### 2. Resend (Free - Email Service)

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up for a free account (100 emails/day free)
3. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
4. Click **"Create API Key"**
5. Copy the key (starts with `re_`)
6. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```

**Note**: Free tier sends from `onboarding@resend.dev`. To use `contact@flowitec.com`, you need to:
- Add and verify your domain in Resend
- Update `EMAIL_FROM` in `.env.local`

### 3. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
# MongoDB - from Atlas
MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/

# Database name (can keep as is)
DB_NAME=boss_card

# Resend API Key - from Resend dashboard
RESEND_API_KEY=re_your_actual_api_key_here

# Email from address (keep default for now)
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Flowitec Digital Card

# Where booking notifications go
ALERT_EMAIL=godwin.asamoah@flowitec.com
```

### 4. Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 5. Test It!

1. Go to http://localhost:3000/
2. Scroll to the contact form
3. Fill it out and submit
4. Check your email (the `ALERT_EMAIL` address)

## Troubleshooting

### "MongoDB connection failed"
- Check your IP is whitelisted in Atlas Network Access
- Verify your connection string has the correct password
- Make sure the connection string is properly formatted

### "Email not received"
- Check Resend dashboard for send logs
- Verify your `RESEND_API_KEY` is correct
- Check spam/junk folder
- Free tier has 100 emails/day limit

### "Rate limit exceeded"
- The form limits to 5 submissions per hour per IP
- This prevents spam
- Wait an hour or email directly: godwin.asamoah@flowitec.com

## Production Deployment (Vercel)

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all variables from `.env.local`:
   - `MONGO_URL`
   - `DB_NAME`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_FROM_NAME`
   - `ALERT_EMAIL`

4. Redeploy the site

## Using Your Own Domain for Emails

1. In Resend, go to **Domains**
2. Click **Add Domain**
3. Add `flowitec.com`
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually 5-30 minutes)
6. Update `.env.local`:
   ```
   EMAIL_FROM=contact@flowitec.com
   ```

---

Need help? Contact your developer or check:
- MongoDB docs: https://www.mongodb.com/docs/atlas/
- Resend docs: https://resend.com/docs/introduction
