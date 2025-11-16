#!/bin/bash

echo "Starting Airbnb Listing Finder Agent..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.7 or higher"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt --quiet

# Start the application
echo ""
echo "Starting Flask server..."
echo "Server will be available at: http://localhost:5001"
echo "Press Ctrl+C to stop the server"
echo ""
python app.py

