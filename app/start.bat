@echo off
REM Navigate to the directory where the script is located
cd /d %~dp0

REM Check if virtual environment directory exists
if not exist "venv\Scripts\activate.bat" (
    echo Virtual environment not found at venv. Please ensure it's created.
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install Python dependencies
pip install -r requirements.txt

REM Find an available port for the backend starting from 5000
set backend_port=5000

:CHECK_PORT
    netstat -ano | findstr ":!backend_port!" > nul
    if not errorlevel 1 (
        set /a backend_port=!backend_port!+1
        goto CHECK_PORT
    )
echo Using backend port: !backend_port!

REM Start the Flask backend with the dynamic port
set FLASK_RUN_PORT=!backend_port!
set FLASK_APP=script.py
python script.py --port=!backend_port! &

REM Start the Expo frontend
npx expo start

REM Deactivate virtual environment
deactivate
