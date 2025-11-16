# 📸 How to Add Your Photo to Portfolio

## Quick Steps

### Step 1: Prepare Your Photo

1. **Find your photo** (the one you want to use)
2. **Crop it to square** (1:1 ratio) - this works best for circular display
3. **Resize if needed**:
   - Recommended: 800x800 pixels or larger
   - Minimum: 400x400 pixels
   - File size: Under 500KB (for fast loading)

### Step 2: Save the Photo

1. **Open your photo** in any image editor (Photos, Paint, Photoshop, etc.)
2. **Save or Export** the photo
3. **Name it exactly**: `rakesh-photo.jpg`
   - ⚠️ Important: The filename must match exactly!
4. **Save location**: `C:\Users\gogin\OneDrive\Documents\portfolio\images\`

### Step 3: Verify It's Added

1. Navigate to: `C:\Users\gogin\OneDrive\Documents\portfolio\images\`
2. You should see: `rakesh-photo.jpg` in that folder
3. Open `index.html` in your browser to see the photo

---

## Detailed Instructions

### Option A: Using Windows File Explorer

1. **Open File Explorer**
2. **Navigate to**: `C:\Users\gogin\OneDrive\Documents\portfolio\images\`
3. **Copy your photo** to this folder
4. **Rename it** to: `rakesh-photo.jpg`
   - Right-click → Rename
   - Type: `rakesh-photo.jpg`
   - Press Enter

### Option B: Using Command Line

```powershell
# Navigate to portfolio directory
cd C:\Users\gogin\OneDrive\Documents\portfolio\images

# Copy your photo here (replace "path\to\your\photo.jpg" with actual path)
copy "path\to\your\photo.jpg" rakesh-photo.jpg
```

### Option C: Drag and Drop

1. **Open** the `images` folder: `C:\Users\gogin\OneDrive\Documents\portfolio\images\`
2. **Find your photo** on your computer
3. **Drag and drop** it into the `images` folder
4. **Rename** it to `rakesh-photo.jpg`

---

## Photo Format Options

The portfolio supports these formats:
- ✅ **JPG/JPEG** (recommended - smaller file size)
- ✅ **PNG** (supports transparency)
- ✅ **WebP** (modern, efficient format)

**Current setup expects**: `rakesh-photo.jpg`

---

## If You Want to Use a Different Filename

If your photo has a different name, update `index.html`:

1. Open `index.html`
2. Find line ~105 (look for `<img src="images/rakesh-photo.jpg"`)
3. Change `rakesh-photo.jpg` to your filename
4. Save the file

---

## Photo Optimization Tips

### For Best Results:

1. **Square Format**: Crop to 1:1 ratio (same width and height)
2. **Good Lighting**: Use a well-lit professional photo
3. **Centered Subject**: Face should be centered in the frame
4. **File Size**: Compress if over 500KB
   - Use online tools like: TinyPNG, Squoosh, or ImageOptim
5. **Resolution**: 800x800px or higher for crisp display

### Quick Photo Editing:

**Using Windows Photos:**
1. Open photo in Photos app
2. Click "Edit & Create" → "Edit"
3. Use "Crop" to make it square
4. Adjust if needed
5. Save as `rakesh-photo.jpg`

**Using Online Tools:**
- [Photopea](https://www.photopea.com/) - Free online Photoshop
- [Canva](https://www.canva.com/) - Easy photo editor
- [Remove.bg](https://www.remove.bg/) - Remove background

---

## Testing Your Photo

After adding the photo:

1. **Open** `index.html` in your browser
2. **Check the hero section** (top of page)
3. **You should see**:
   - ✅ Your photo in a circular frame
   - ✅ Tagline badge below it
   - ✅ Smooth animations

If you see the "RBG" placeholder instead:
- Check the filename is exactly `rakesh-photo.jpg`
- Check the file is in the `images` folder
- Refresh the browser (Ctrl+F5)

---

## Current File Structure

```
portfolio/
├── images/
│   ├── README.md
│   └── rakesh-photo.jpg  ← ADD YOUR PHOTO HERE
├── index.html
├── styles.css
└── script.js
```

---

## Need Help?

**Common Issues:**

1. **Photo not showing?**
   - Check filename spelling (case-sensitive)
   - Check file is in `images/` folder
   - Clear browser cache (Ctrl+F5)

2. **Photo looks stretched?**
   - Use a square photo (1:1 ratio)
   - Recommended: 800x800px

3. **File too large?**
   - Compress using TinyPNG or similar
   - Aim for under 500KB

---

**Once you add the photo, it will automatically appear on your portfolio!** 🎉

