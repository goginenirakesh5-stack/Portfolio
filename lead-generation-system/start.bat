@echo off
echo Starting Lead Generation System...
echo.
echo Step 1: Starting Flask Backend Server...
start cmd /k "python app.py"
timeout /t 3 /nobreak >nul
echo.
echo Step 2: Opening Frontend in Browser...
start http://localhost:8000
echo.
echo Step 3: Starting HTTP Server for Frontend...
python -m http.server 8000
pause

