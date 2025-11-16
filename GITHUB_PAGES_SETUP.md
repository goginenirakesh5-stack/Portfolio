# 🚀 Step-by-Step GitHub Pages Configuration Guide

Follow these instructions carefully to get your portfolio live on GitHub Pages.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ A GitHub account
- ✅ Your portfolio repository pushed to GitHub
- ✅ Repository is **public** (or GitHub Pro/Team/Enterprise account for private repos)
- ✅ `index.html` file in the root directory
- ✅ All files committed and pushed to the `main` branch

---

## 🎯 Method 1: Using GitHub Actions (Recommended)

This method uses your existing `.github/workflows/pages.yml` file for deployment.

### ⚠️ IMPORTANT: Enable Pages FIRST!

**You MUST enable GitHub Pages in Settings BEFORE running the workflow, or you'll get an error.**

### Step 1: Navigate to GitHub Pages Settings

1. Open your web browser
2. Go to: `https://github.com/goginenirakesh5-stack/Portfolio`
3. Click on the **"Settings"** tab (located at the top of the repository, next to "Code", "Issues", etc.)
4. Scroll down in the left sidebar and click on **"Pages"**

   **Direct link:** `https://github.com/goginenirakesh5-stack/Portfolio/settings/pages`

### Step 2: Enable GitHub Pages Source

1. Under the **"Source"** section, you'll see a dropdown menu
2. **CRITICAL:** Click on the dropdown and select **"GitHub Actions"**
3. Click the **"Save"** button
4. **Wait 30 seconds** for GitHub to process the change
5. You should see a message indicating Pages is enabled

**✅ If you see "Your site is ready to be published" or similar, you're good to go!**

### Step 3: Verify Workflow is Set Up

1. Click on the **"Actions"** tab (at the top of your repository)
2. You should see a workflow called **"Deploy to GitHub Pages"**
3. If you see a yellow dot or red X, the workflow may need to run

### Step 4: Trigger the Workflow (if needed)

**Option A: Automatic Trigger**
- If you just pushed code, the workflow should run automatically
- Wait 1-2 minutes and refresh the Actions page

**Option B: Manual Trigger**
1. In the "Actions" tab, click on **"Deploy to GitHub Pages"** workflow
2. Click the **"Run workflow"** button (on the right side)
3. Select branch: `main`
4. Click **"Run workflow"** again

### Step 5: Monitor Deployment

1. Stay on the "Actions" tab
2. Click on the latest workflow run (it will show "Deploy to GitHub Pages" with a timestamp)
3. Watch the progress:
   - **Yellow circle** = In progress
   - **Green checkmark** = Success ✅
   - **Red X** = Failed ❌

4. Wait for all steps to complete:
   - ✅ Checkout
   - ✅ Setup Pages
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

### Step 6: Verify Your Site is Live

1. Go back to **Settings → Pages**
2. You should see a green checkmark and a message: **"Your site is live at..."**
3. Click on the URL: `https://goginenirakesh5-stack.github.io/Portfolio/`
4. Your portfolio should load!

**⏱️ Wait Time:** 5-10 minutes after workflow completes

---

## 🎯 Method 2: Using Branch Deployment (Simpler Alternative)

If Method 1 doesn't work, try this simpler approach.

### Step 1: Navigate to GitHub Pages Settings

1. Go to: `https://github.com/goginenirakesh5-stack/Portfolio/settings/pages`
2. Or: Repository → **Settings** → **Pages** (left sidebar)

### Step 2: Configure Branch Deployment

1. Under **"Source"**, click the dropdown
2. Select **"Deploy from a branch"**
3. Under **"Branch"**, select: **`main`**
4. Under **"Folder"**, select: **`/ (root)`**
5. Click **"Save"**

### Step 3: Wait for Deployment

1. GitHub will automatically build your site
2. You'll see a yellow dot indicating deployment in progress
3. After 2-5 minutes, refresh the page
4. You should see a green checkmark: **"Your site is published at..."**

### Step 4: Verify Your Site

1. Click on the URL shown: `https://goginenirakesh5-stack.github.io/Portfolio/`
2. Your portfolio should be live!

**⏱️ Wait Time:** 5-10 minutes

---

## ✅ Verification Checklist

After completing either method, verify:

- [ ] Settings → Pages shows "Your site is live at..."
- [ ] The URL loads without 404 error
- [ ] Your portfolio displays correctly
- [ ] All images and styles load properly
- [ ] Navigation links work

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Still Getting 404 Error

**Solution:**
1. Double-check Settings → Pages is configured correctly
2. Verify repository is **public** (not private)
3. Wait 10-15 minutes and try again
4. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
5. Try incognito/private browsing mode

### Issue 2: Workflow Fails with "Get Pages site failed" Error

**Error Message:** `Error: Get Pages site failed. Please verify that the repository has Pages enabled...`

**Solution:**
1. **Go to Settings → Pages FIRST** (before running workflow)
2. Under "Source", select **"GitHub Actions"**
3. Click **"Save"**
4. **Wait 30-60 seconds** for GitHub to enable Pages
5. Verify Pages is enabled (you should see a message in Settings → Pages)
6. **THEN** go to Actions tab and run the workflow
7. The workflow has been updated to auto-enable Pages, but you still need to set the source first

**If still failing:**
- Try Method 2 (Branch Deployment) instead
- Or manually enable Pages using branch deployment first, then switch to GitHub Actions

### Issue 3: Other Workflow Failures (Red X)

**Solution:**
1. Click on the failed workflow run
2. Check which step failed
3. Common issues:
   - Missing `index.html` in root → Add it
   - Wrong branch name → Ensure you're using `main` (not `master`)
   - Permissions issue → Check repository settings

### Issue 4: "GitHub Actions" Option Not Available

**Solution:**
- Your repository might not have the workflow file
- Use **Method 2** (Branch Deployment) instead
- Or ensure `.github/workflows/pages.yml` exists and is committed

### Issue 5: Site Shows but Looks Broken

**Solution:**
1. Check browser console for errors (F12 → Console tab)
2. Verify all file paths are correct (CSS, JS, images)
3. Ensure all files are committed and pushed to GitHub
4. Check file paths are relative (not absolute)

### Issue 6: Repository is Private

**Solution:**
- **Option A:** Make repository public (Settings → scroll to bottom → Change visibility)
- **Option B:** Upgrade to GitHub Pro/Team/Enterprise (paid)

---

## 📝 Quick Reference Commands

If you need to push changes:

```bash
# Navigate to your project folder
cd C:\Users\gogin\OneDrive\Documents\portfolio

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Update portfolio"

# Push to GitHub
git push origin main
```

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Settings → Pages shows green checkmark
2. ✅ URL loads your portfolio (not 404)
3. ✅ Actions tab shows successful workflow (if using Method 1)
4. ✅ Site updates automatically when you push changes

---

## 📞 Still Having Issues?

1. **Check GitHub Status:** https://www.githubstatus.com/
2. **GitHub Pages Docs:** https://docs.github.com/en/pages
3. **GitHub Community:** https://github.community/
4. **Verify repository structure:**
   - `index.html` should be in root
   - `styles.css` should be in root
   - `script.js` should be in root

---

## 🔄 Updating Your Site

Once configured, updates are automatic:

1. Make changes to your files locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
3. Wait 2-5 minutes
4. Refresh your site - changes will appear!

---

**Last Updated:** Based on your current repository setup
**Repository:** https://github.com/goginenirakesh5-stack/Portfolio
**Expected URL:** https://goginenirakesh5-stack.github.io/Portfolio/

