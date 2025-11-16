# 🌐 Custom Domain Setup Guide for Portfolio

This guide will help you host your portfolio on a custom domain to showcase your work professionally to clients.

## 📋 Prerequisites

- A GitHub account with your portfolio repository
- A domain name (purchased from providers like Namecheap, GoDaddy, Google Domains, etc.)
- Access to your domain's DNS settings

## 🚀 Step 1: Enable GitHub Pages

1. **Go to your GitHub repository**
   - Navigate to: https://github.com/goginenirakesh5-stack/Portfolio

2. **Open Settings**
   - Click on the "Settings" tab in your repository

3. **Navigate to Pages**
   - Scroll down to "Pages" in the left sidebar
   - Or go directly to: https://github.com/goginenirakesh5-stack/Portfolio/settings/pages

4. **Configure Source** (Choose ONE method)

   **Option A: Using GitHub Actions (Recommended if you have `.github/workflows/pages.yml`)**
   - Under "Source", select: **"GitHub Actions"**
   - This will use your workflow file to deploy
   - Click "Save"
   - Go to "Actions" tab and trigger the workflow if needed

   **Option B: Using Branch Deployment (Simpler method)**
   - Under "Source", select:
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Click "Save"

5. **Wait for deployment**
   - GitHub will build and deploy your site
   - Your site will be available at: `https://goginenirakesh5-stack.github.io/Portfolio/`
   - This may take a few minutes (check the "Actions" tab for progress)

## 🌍 Step 2: Set Up Custom Domain

### Option A: Using GitHub's CNAME File (Recommended)

1. **Create CNAME file** (Already created in repository)
   - The file `CNAME` is in the root of your repository
   - Edit it and add your domain (without http:// or https://)
   - Example: `rakeshbabugogineni.com` or `www.rakeshbabugogineni.com`

2. **Commit and push**
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

3. **Go back to GitHub Pages Settings**
   - In Settings → Pages
   - You'll see "Custom domain" section
   - Enter your domain and click "Save"
   - GitHub will automatically create a CNAME file if you haven't already

### Option B: Configure DNS Records

You need to add DNS records at your domain registrar. Here are the settings:

#### For Apex Domain (yourdomain.com - without www):

Add these **A Records**:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600 (or default)
```

#### For Subdomain (www.yourdomain.com):

Add this **CNAME Record**:
```
Type: CNAME
Name: www
Value: goginenirakesh5-stack.github.io
TTL: 3600 (or default)
```

## 🔧 Step 3: Domain Provider Specific Instructions

### Namecheap

1. Log in to Namecheap
2. Go to "Domain List" → Select your domain → "Advanced DNS"
3. Add the A records and CNAME as shown above
4. Wait 5-30 minutes for DNS propagation

### GoDaddy

1. Log in to GoDaddy
2. Go to "My Products" → "DNS"
3. Add the A records and CNAME as shown above
4. Wait 5-30 minutes for DNS propagation

### Google Domains

1. Log in to Google Domains
2. Go to "DNS" section
3. Add the A records and CNAME as shown above
4. Wait 5-30 minutes for DNS propagation

### Cloudflare (Free DNS)

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Go to DNS settings
4. Add the A records and CNAME as shown above
5. Set SSL/TLS mode to "Full" or "Full (strict)"

## ✅ Step 4: Verify Setup

1. **Check DNS Propagation**
   - Use https://www.whatsmydns.net/
   - Search for your domain
   - Verify A records point to GitHub IPs

2. **Enable HTTPS** (Automatic)
   - GitHub Pages automatically provides SSL certificates
   - Wait 24-48 hours after DNS setup
   - Your site will be available at `https://yourdomain.com`

3. **Test Your Site**
   - Visit `http://yourdomain.com` (should redirect to HTTPS)
   - Visit `https://yourdomain.com` (should show your portfolio)

## 🔒 Step 5: Force HTTPS (Recommended)

GitHub Pages automatically enables HTTPS, but you can verify:

1. Go to Settings → Pages
2. Under "Custom domain", check "Enforce HTTPS"
3. Wait for SSL certificate to be issued (can take up to 24 hours)

## 📝 Step 6: Update Portfolio Links

Update your portfolio to use your custom domain:

1. Update social media profiles
2. Update email signatures
3. Update business cards
4. Update LinkedIn profile
5. Update any other places where you share your portfolio link

## 🎯 Best Practices

1. **Use www or non-www consistently**
   - Choose one: `www.yourdomain.com` OR `yourdomain.com`
   - Set up redirects if needed

2. **Keep CNAME file updated**
   - If you change domains, update the CNAME file
   - Commit and push changes

3. **Monitor DNS**
   - Use tools like https://dnschecker.org/
   - Verify DNS records are correct globally

4. **Backup your domain**
   - Keep domain registration details safe
   - Enable domain lock at registrar

## 🐛 Troubleshooting

### "404 - There isn't a GitHub Pages site here" Error

If you see this error, GitHub Pages isn't enabled or configured correctly:

1. **Check GitHub Pages Settings**
   - Go to: `https://github.com/goginenirakesh5-stack/Portfolio/settings/pages`
   - Make sure "Source" is set to either:
     - **"GitHub Actions"** (if using workflow), OR
     - **"Deploy from a branch"** → Branch: `main`, Folder: `/ (root)`
   - Click "Save" if you made changes

2. **If using GitHub Actions:**
   - Go to the "Actions" tab in your repository
   - Check if the workflow has run successfully
   - If not, manually trigger it: Click "Deploy to GitHub Pages" → "Run workflow"
   - Wait for the workflow to complete (green checkmark)

3. **If using Branch Deployment:**
   - Make sure your `index.html` is in the root directory
   - Verify you're pushing to the `main` branch (not `master`)
   - Push a new commit to trigger deployment:
     ```bash
     git add .
     git commit -m "Trigger GitHub Pages deployment"
     git push origin main
     ```

4. **Wait 5-10 minutes** after saving settings for GitHub to build your site

5. **Check repository visibility:**
   - If repository is private, you need GitHub Pro/Team/Enterprise for Pages
   - Make repository public OR upgrade your GitHub plan

### Site not loading after DNS setup

- **Wait 24-48 hours** for DNS propagation
- Check DNS records are correct
- Verify CNAME file in repository
- Check GitHub Pages settings

### HTTPS not working

- Wait up to 24 hours for SSL certificate
- Ensure "Enforce HTTPS" is enabled
- Check DNS records are correct

### Domain shows GitHub 404 page

- Verify CNAME file is correct
- Check repository name matches GitHub Pages URL
- Ensure index.html is in root directory

### DNS propagation issues

- Use https://www.whatsmydns.net/ to check globally
- Clear browser cache
- Try different DNS servers (Google: 8.8.8.8)

## 📞 Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- Domain setup help: Contact your domain registrar support
- GitHub Community: https://github.community/

## 🎉 Success!

Once set up, your portfolio will be live at:
- **Your custom domain**: `https://yourdomain.com`
- **GitHub Pages**: `https://goginenirakesh5-stack.github.io/Portfolio/`

Both URLs will work, but your custom domain is what you'll share with clients!

---

**Pro Tip**: Share your portfolio link in your email signature, LinkedIn profile, and business cards to attract more clients!

