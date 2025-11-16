@echo off
echo Starting AI Research Assistant...
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    echo OPENAI_API_KEY=your_api_key_here > .env
    echo.
    echo Please edit .env and add your OpenAI API key!
    echo Press any key to continue...
    pause > nul
)

REM Install dependencies if needed
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Starting Flask server...
echo Open http://localhost:5002 in your browser
echo.
python app.py

pause

