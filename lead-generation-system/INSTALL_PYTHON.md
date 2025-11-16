# Installing Python and pip on Windows

## Method 1: Install from Python.org (Recommended)

1. **Download Python**
   - Go to https://www.python.org/downloads/
   - Click "Download Python 3.12.x" (latest version)
   - The installer will download

2. **Run the Installer**
   - Double-click the downloaded `.exe` file
   - **IMPORTANT**: Check the box "Add Python to PATH" at the bottom of the installer
   - Click "Install Now"
   - Wait for installation to complete

3. **Verify Installation**
   - Open a new Command Prompt or PowerShell window
   - Run: `python --version`
   - Run: `pip --version`
   - Both should show version numbers

## Method 2: Install from Microsoft Store

1. Open Microsoft Store
2. Search for "Python 3.12"
3. Click "Install"
4. Wait for installation
5. Open a new terminal and verify with `python --version`

## Method 3: Using Chocolatey (If you have it)

```powershell
choco install python
```

## After Installation

1. **Close and reopen your terminal** (important for PATH to update)

2. **Verify Python is installed:**
   ```bash
   python --version
   ```

3. **Verify pip is installed:**
   ```bash
   pip --version
   ```

4. **Navigate to your project:**
   ```bash
   cd lead-generation-system
   ```

5. **Install project dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Troubleshooting

### If `python` command doesn't work:
- Make sure you checked "Add Python to PATH" during installation
- Restart your computer
- Try `py` instead of `python` (Windows Python Launcher)

### If `pip` command doesn't work:
- Try: `python -m pip --version`
- Or: `py -m pip --version`

### If you get permission errors:
- Run terminal as Administrator
- Or use: `pip install --user -r requirements.txt`

## Quick Test

After installation, test with:
```bash
python -c "print('Python is working!')"
pip list
```

Both commands should work without errors.

