Start-Process -NoNewWindow -FilePath "python" -ArgumentList "C:\Users\hoyun\Downloads\CLSentimentAnalysis\CLSA-vF\app\script.py"
Start-Process -NoNewWindow -WorkingDirectory "C:\Users\hoyun\Downloads\CLSentimentAnalysis\CLSA-vF\app" -FilePath "npm" -ArgumentList "start"

Start-Process "http://localhost:19000"
