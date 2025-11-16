#!/bin/bash

echo "Starting Lead Generation System..."
echo ""
echo "Step 1: Starting Flask Backend Server..."
python3 app.py &
sleep 3
echo ""
echo "Step 2: Opening Frontend in Browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8000
fi
echo ""
echo "Step 3: Starting HTTP Server for Frontend..."
python3 -m http.server 8000

