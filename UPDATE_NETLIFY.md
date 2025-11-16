# 🔄 How to Update Your Portfolio on Netlify

If your Netlify site isn't showing the latest changes, follow these steps:

---

## ✅ Method 1: Trigger Manual Deployment (Easiest)

### Step 1: Go to Netlify Dashboard
1. Visit: https://app.netlify.com/
2. Log in to your account
3. Click on your site: **glistening-moonbeam-3cb84b**

### Step 2: Trigger Manual Deploy
1. Click on the **"Deploys"** tab (at the top)
2. Click **"Trigger deploy"** button (top right)
3. Select **"Deploy site"**
4. Wait 1-2 minutes for deployment to complete

### Step 3: Verify Update
- Check the deploy status (should show green checkmark ✅)
- Visit your site: https://glistening-moonbeam-3cb84b.netlify.app/
- Hard refresh: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## ✅ Method 2: Check GitHub Connection

### Step 1: Verify GitHub Integration
1. Go to Netlify Dashboard → Your Site
2. Click **"Site settings"** → **"Build & deploy"**
3. Scroll to **"Continuous Deployment"**
4. Verify:
   - **Repository:** Should show `goginenirakesh5-stack/Portfolio`
   - **Branch:** Should be `main`
   - **Status:** Should show "Connected"

### Step 2: Reconnect if Needed
If repository shows "Not connected":
1. Click **"Link to Git provider"**
2. Select **"GitHub"**
3. Authorize Netlify
4. Select repository: `Portfolio`
5. Click **"Save"**

---

## ✅ Method 3: Verify Build Settings

### Step 1: Check Build Configuration
1. Go to Netlify Dashboard → Your Site
2. Click **"Site settings"** → **"Build & deploy"**
3. Scroll to **"Build settings"**
4. Verify these settings:
   - **Base directory:** (leave empty)
   - **Build command:** (leave empty - static site)
   - **Publish directory:** `/` or `.` (root directory)

### Step 2: Update if Wrong
1. Click **"Edit settings"**
2. Set:
   - **Build command:** (empty)
   - **Publish directory:** `/`
3. Click **"Save"**
4. Trigger a new deploy

---

## ✅ Method 4: Check Deployment Logs

### Step 1: View Latest Deploy
1. Go to Netlify Dashboard → Your Site
2. Click **"Deploys"** tab
3. Click on the latest deployment

### Step 2: Check for Errors
Look for:
- ❌ **Red X** = Deployment failed
- ⚠️ **Yellow warning** = Warnings (may still work)
- ✅ **Green checkmark** = Success

### Step 3: Read Error Messages
If deployment failed:
- Scroll through the deploy log
- Look for error messages (usually in red)
- Common issues:
  - Build command errors
  - Missing files
  - Configuration errors

---

## ✅ Method 5: Force Re-deploy from GitHub

### Step 1: Make a Small Change
1. Open `README.md` in your repository
2. Add a space or comment
3. Commit and push:
   ```bash
   git add README.md
   git commit -m "Trigger Netlify deployment"
   git push origin main
   ```

### Step 2: Wait for Auto-Deploy
- Netlify should detect the push
- Auto-deploy will start within 30 seconds
- Check Deploys tab for progress

---

## ✅ Method 6: Clear Netlify Cache

### Step 1: Clear Build Cache
1. Go to Netlify Dashboard → Your Site
2. Click **"Deploys"** tab
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Wait for deployment

This clears cached files and forces a fresh build.

---

## 🔍 Troubleshooting Common Issues

### Issue 1: "Build failed"
**Solution:**
- Check build logs for errors
- Verify `netlify.toml` is correct
- Ensure all files are committed to GitHub

### Issue 2: "Site not updating"
**Solution:**
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito/private window
- Check if deployment actually completed

### Issue 3: "GitHub not connected"
**Solution:**
- Reconnect GitHub in Netlify settings
- Check GitHub permissions
- Verify repository is accessible

### Issue 4: "Wrong files deployed"
**Solution:**
- Check publish directory setting
- Verify `netlify.toml` publish path
- Ensure `index.html` is in root

---

## 📋 Quick Checklist

- [ ] Latest code pushed to GitHub `main` branch
- [ ] Netlify connected to GitHub repository
- [ ] Build settings correct (empty build command, `/` publish directory)
- [ ] Latest deployment shows success (green checkmark)
- [ ] Cleared browser cache
- [ ] Checked site in incognito window

---

## 🚀 Quick Commands

### Check if code is pushed:
```bash
git status
git log --oneline -5
```

### Force push to trigger deploy:
```bash
git commit --allow-empty -m "Trigger Netlify deployment"
git push origin main
```

### Check Netlify CLI (if installed):
```bash
netlify status
netlify deploy --prod
```

---

## 📞 Still Not Working?

1. **Check Netlify Status Page**
   - https://www.netlifystatus.com/
   - See if there are any outages

2. **Contact Netlify Support**
   - Go to: https://www.netlify.com/support/
   - Or check community: https://community.netlify.com/

3. **Verify Repository**
   - Ensure repository is public (or you have Netlify Pro)
   - Check that `main` branch exists
   - Verify files are actually in the repository

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Latest deploy shows green checkmark
- ✅ Deploy time matches your last push
- ✅ Site shows latest changes
- ✅ No errors in deploy logs

---

**Your Netlify URL:** https://glistening-moonbeam-3cb84b.netlify.app/

**Most Common Fix:** Go to Deploys tab → Click "Trigger deploy" → "Deploy site"

