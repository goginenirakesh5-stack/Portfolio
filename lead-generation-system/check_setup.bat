@echo off
echo ========================================
echo Lead Generation System - Setup Checker
echo ========================================
echo.

echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python is installed
    python --version
) else (
    echo [ERROR] Python is NOT installed
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo.
echo Checking pip installation...
pip --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] pip is installed
    pip --version
) else (
    echo [WARNING] pip is not found, trying alternative...
    python -m pip --version >nul 2>&1
    if %errorlevel% == 0 (
        echo [OK] pip is available via python -m pip
    ) else (
        echo [ERROR] pip is NOT installed
        echo.
        echo Installing pip...
        python -m ensurepip --upgrade
    )
)

echo.
echo Checking project dependencies...
if exist "requirements.txt" (
    echo [OK] requirements.txt found
    echo.
    echo To install dependencies, run:
    echo   pip install -r requirements.txt
) else (
    echo [WARNING] requirements.txt not found
)

echo.
echo ========================================
echo Setup check complete!
echo ========================================
echo.
pause

