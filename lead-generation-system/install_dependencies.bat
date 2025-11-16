@echo off
echo ========================================
echo Installing Lead Generation System Dependencies
echo ========================================
echo.

echo Using Python to install pip packages...
python -m pip install -r requirements.txt

if %errorlevel% == 0 (
    echo.
    echo ========================================
    echo [SUCCESS] All dependencies installed!
    echo ========================================
    echo.
    echo You can now run the application with:
    echo   python app.py
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Installation failed
    echo ========================================
    echo.
    echo Try running as Administrator or use:
    echo   python -m pip install --user -r requirements.txt
    echo.
)

pause

