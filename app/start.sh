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

# Find available port for backend and active IP address
backend_ip=$(python3 -c "
import socket
def get_active_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip_address = s.getsockname()[0]
    except Exception:
        ip_address = '127.0.0.1'
    finally:
        s.close()
    print(ip_address)
")

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

# Start the Flask backend with the dynamic port and IP
FLASK_RUN_PORT=$backend_port FLASK_APP=script.py python3 script.py &

# Navigate to the frontend directory
cd ..

# Set the frontend to use the backend IP and port
export REACT_APP_BACKEND_IP=$backend_ip
export REACT_APP_BACKEND_PORT=$backend_port

# Install Node.js dependencies
npm install

# Start the Expo frontend
npx expo start

# Deactivate the virtual environment when done
deactivate
