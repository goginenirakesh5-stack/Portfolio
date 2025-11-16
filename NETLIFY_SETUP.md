# 🚀 Netlify Setup Guide - Contact Form with Email Notifications

This guide will help you deploy your portfolio to Netlify and configure email notifications for your contact form.

---

## 📋 Step 1: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Netlify Forms integration"
   git push origin main
   ```

2. **Go to Netlify**
   - Visit: https://app.netlify.com/
   - Sign up/Login (free account)

3. **Import from GitHub**
   - Click "Add new site" → "Import an existing project"
   - Click "GitHub" and authorize Netlify
   - Select your repository: `Portfolio`
   - Configure build settings:
     - **Build command:** (leave empty - static site)
     - **Publish directory:** `/` (root)
   - Click "Deploy site"

4. **Wait for deployment**
   - Netlify will build and deploy your site
   - You'll get a URL like: `https://random-name-123.netlify.app`

---

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

## 📧 Step 2: Configure Email Notifications

### Method 1: Netlify Dashboard (Easiest)

1. **Go to Site Settings**
   - In your Netlify dashboard, click on your site
   - Go to **"Site settings"** → **"Forms"**

2. **Enable Form Notifications**
   - Scroll to **"Form notifications"**
   - Click **"Add notification"**

3. **Configure Email Notification**
   - **Notification type:** Email
   - **Email address:** `goginenirakesh5@gmail.com`
   - **Form name:** `contact` (must match your form name)
   - **Subject:** `New Contact Form Message from Portfolio`
   - Click **"Save"**

4. **Test the Form**
   - Fill out your contact form on your live site
   - Check your email inbox
   - You should receive the message!

---

### Method 2: Configure via netlify.toml (Advanced)

Create a `netlify.toml` file in your root directory:

```toml
[build]
  publish = "."

[[plugins]]
  package = "@netlify/plugin-form-handler"

[context.production.environment]
  NETLIFY_EMAIL = "goginenirakesh5@gmail.com"
```

Then configure notifications in the Netlify dashboard as above.

---

## ✅ Step 3: Verify Setup

1. **Check Form Submission**
   - Go to your Netlify site
   - Fill out the contact form
   - Submit it

2. **Check Email**
   - Check `goginenirakesh5@gmail.com`
   - You should receive an email with the form data

3. **Check Netlify Dashboard**
   - Go to **"Forms"** tab in Netlify
   - You should see the submission listed

---

## 🎯 Form Configuration Details

Your form is now configured with:

- **Form name:** `contact`
- **Netlify Forms:** Enabled (`netlify` attribute)
- **Spam protection:** Honeypot field (`bot-field`)
- **Fields:**
  - `name` - Sender's name
  - `email` - Sender's email
  - `subject` - Message subject
  - `message` - Message content

---

## 📧 Email Template

Netlify will send you emails with this format:

```
Subject: New Contact Form Message from Portfolio

From: [Name] <[Email]>
Subject: [Subject]

Message:
[Message content]

---
Submitted via Netlify Forms
```

---

## 🔧 Customizing Email Notifications

### Custom Email Subject

In Netlify Dashboard → Forms → Notifications:
- Edit your notification
- Change subject to: `Portfolio Contact: {{subject}}`

### Custom Email Body

You can customize the email template in Netlify Forms settings to include:
- Form field values: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
- Custom formatting
- Additional information

---

## 🚨 Troubleshooting

### Form Not Sending Emails

1. **Check Form Name**
   - Form name in HTML must match Netlify form name
   - Current: `name="contact"`

2. **Check Netlify Settings**
   - Go to Site Settings → Forms
   - Verify form notifications are enabled
   - Check email address is correct

3. **Check Spam Folder**
   - Emails might go to spam initially
   - Mark as "Not Spam" to whitelist

4. **Verify Deployment**
   - Make sure latest code is deployed
   - Check Netlify build logs for errors

### Form Shows Error

1. **Check Browser Console**
   - Press F12 → Console tab
   - Look for JavaScript errors

2. **Check Netlify Logs**
   - Go to Netlify Dashboard → Deploys
   - Check latest deploy logs

3. **Verify Form Attributes**
   - Ensure `netlify` attribute is present
   - Ensure `name="contact"` matches Netlify form name

---

## 📊 Viewing Form Submissions

### In Netlify Dashboard

1. Go to your site in Netlify
2. Click **"Forms"** tab
3. Click on **"contact"** form
4. See all submissions with:
   - Timestamp
   - Form data
   - Download as CSV option

### Email Notifications

You'll receive an email for each submission at:
- `goginenirakesh5@gmail.com`

---

## 🎉 Success Checklist

- [ ] Site deployed to Netlify
- [ ] Form notifications configured
- [ ] Email address set: `goginenirakesh5@gmail.com`
- [ ] Tested form submission
- [ ] Received email notification
- [ ] Form submissions visible in Netlify dashboard

---

## 🔄 Updating Your Site

After making changes:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Netlify Auto-Deploys**
   - Netlify automatically rebuilds your site
   - Changes go live in 1-2 minutes

---

## 📝 Custom Domain (Optional)

To use your own domain:

1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS records
4. Wait for SSL certificate (automatic)

---

## 💡 Pro Tips

1. **Form Limits**
   - Free tier: 100 submissions/month
   - Upgrade for more if needed

2. **Spam Protection**
   - Honeypot field already added
   - Consider adding reCAPTCHA for extra protection

3. **Email Filters**
   - Create a filter in Gmail for form submissions
   - Label: "Portfolio Contact"

4. **Backup Notifications**
   - Set up Slack/Discord webhooks
   - Get instant notifications

---

## 🆘 Need Help?

- **Netlify Docs:** https://docs.netlify.com/forms/setup/
- **Netlify Support:** https://www.netlify.com/support/
- **Community:** https://community.netlify.com/

---

**Your contact form is now connected to Netlify and will send emails to: `goginenirakesh5@gmail.com`** ✉️

