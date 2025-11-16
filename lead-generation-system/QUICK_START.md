# Quick Start Guide

## ✅ Python is Installed (3.14)

Great! Python is installed. Since `pip` command might not be in your PATH, use `python -m pip` instead.

## 🚀 Quick Setup

### Step 1: Install Dependencies

**Option A: Use the automated script (Easiest)**
```bash
install_dependencies.bat
```

**Option B: Manual installation**
```bash
python -m pip install -r requirements.txt
```

> 💡 **Note**: Always use `python -m pip` instead of just `pip` if pip command doesn't work directly.

### Step 2: Start the Flask Backend

```bash
python app.py
```

You should see:
```
Starting Lead Generation System API...
API will be available at http://localhost:5000
```

### Step 3: Open the Frontend

1. Open `index.html` in your browser, OR
2. Run a local server:
   ```bash
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

## 📝 Common Commands

### Install packages:
```bash
python -m pip install package_name
```

### Upgrade pip:
```bash
python -m pip install --upgrade pip
```

### List installed packages:
```bash
python -m pip list
```

### Install with user flag (if permission errors):
```bash
python -m pip install --user -r requirements.txt
```

## 🔧 Adding pip to PATH (Optional)

If you want to use `pip` directly instead of `python -m pip`:

1. Find pip location:
   ```bash
   python -m pip show pip
   ```
   Look for "Location" - usually something like:
   `C:\Users\YourName\AppData\Local\Python\pythoncore-3.14-64\Scripts`

2. Add to PATH:
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "User variables", find "Path" and click "Edit"
   - Click "New" and add the Scripts folder path
   - Click OK on all dialogs
   - Restart terminal

3. Verify:
   ```bash
   pip --version
   ```

## ✅ Verification

After installation, verify everything works:

```bash
python --version          # Should show Python 3.14.0
python -m pip --version    # Should show pip version
python app.py             # Should start Flask server
```

## 🆘 Troubleshooting

### "pip is not recognized"
- Use `python -m pip` instead
- Or add pip to PATH (see above)

### Permission errors
- Use `--user` flag: `python -m pip install --user -r requirements.txt`
- Or run terminal as Administrator

### Module not found errors
- Make sure you're in the `lead-generation-system` directory
- Verify installation: `python -m pip list`

---

**You're all set!** 🎉

