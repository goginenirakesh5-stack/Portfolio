#!/bin/bash

echo "Starting AI Research Assistant..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "OPENAI_API_KEY=your_api_key_here" > .env
    echo ""
    echo "Please edit .env and add your OpenAI API key!"
    read -p "Press enter to continue..."
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting Flask server..."
echo "Open http://localhost:5002 in your browser"
echo ""
python app.py

