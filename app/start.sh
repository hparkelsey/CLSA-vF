#!/bin/bash

# Activate the virtual environment for the backend
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask backend
python3 script.py &

# Navigate to the frontend directory
cd ..

# Install Node.js dependencies
npm install

# Start the Expo frontend
npx expo start

# Deactivate the virtual environment when done
deactivate
