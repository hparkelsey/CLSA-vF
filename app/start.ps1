# Navigate to the script directory
Set-Location -Path $PSScriptRoot

# Check if virtual environment directory exists
if (-Not (Test-Path -Path "venv\Scripts\Activate.ps1")) {
    Write-Host "Virtual environment not found at venv. Please ensure it's created."
    exit 1
}

# Activate virtual environment
& venv\Scripts\Activate.ps1

# Install Python dependencies
pip install -r requirements.txt

# Find an available port for the backend starting from 5000
$backend_port = 5000
while (Test-NetConnection -Port $backend_port -ComputerName localhost -InformationLevel Quiet) {
    $backend_port++
}
Write-Host "Using backend port: $backend_port"

# Start the Flask backend with the dynamic port
$env:FLASK_RUN_PORT = $backend_port
$env:FLASK_APP = "script.py"
Start-Process -NoNewWindow -FilePath python -ArgumentList "script.py", "--port=$backend_port"

# Start the Expo frontend
npx expo start

# Deactivate virtual environment (PowerShell session automatically ends on exit)
