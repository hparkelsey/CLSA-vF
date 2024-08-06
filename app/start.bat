@echo off

REM Check if virtual environment exists
if not exist "venv" (
    echo Virtual environment not found at venv. Please ensure it's created.
    exit /b 1
)

REM Activate the virtual environment for the backend
call venv\Scripts\activate

REM Install Python dependencies
pip install -r requirements.txt

REM Find available port for backend and active IP address
for /f "delims=" %%i in ('python -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect((''8.8.8.8'', 80)); print(s.getsockname()[0]); s.close()"') do set BACKEND_IP=%%i

for /f "delims=" %%i in ('python -c "import socket; port=5000; s=socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.bind(('', port)); print(port); s.close()"') do set BACKEND_PORT=%%i

REM Start the Flask backend with the dynamic port and IP
start /b python script.py

REM Navigate to the frontend directory
cd ..

REM Set the frontend to use the backend IP and port
set REACT_APP_BACKEND_IP=%BACKEND_IP%
set REACT_APP_BACKEND_PORT=%BACKEND_PORT%

REM Install Node.js dependencies
npm install

REM Start the Expo frontend
npx expo start

REM Deactivate the virtual environment when done
call venv\Scripts\deactivate

pause
