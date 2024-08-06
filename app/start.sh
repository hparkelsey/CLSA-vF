#!/bin/bash

# Check if virtual environment exists
if [ ! -d "venv" ]; then
  echo "Virtual environment not found at venv. Please ensure it's created."
  exit 1
fi

# Activate the virtual environment for the backend
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Find available port for backend
backend_port=$(python3 -c "
import socket
def find_free_port(start_port=5000):
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('', port))
                return port
            except OSError:
                port += 1
port = find_free_port(5000)
print(port)
")

# Start the Flask backend with the dynamic port
FLASK_RUN_PORT=$backend_port python3 script.py &

# Navigate to the frontend directory
cd ..

# Set the frontend to use the backend port
export REACT_APP_BACKEND_PORT=$backend_port

# Install Node.js dependencies
npm install

# Start the Expo frontend
npx expo start

# Deactivate the virtual environment when done
deactivate
