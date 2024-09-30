!/bin/bash

# Find the process running on port 8080 and store the PID
PID=$(lsof -t -i:8000)

# Check if a process was found
if [ -n "$PID" ]; then
  echo "Stopping the process running on port 8080 with PID: $PID"
  # Kill the process
  kill -9 $PID
else
  echo "No process found running on port 8080"
fi
npm install
# Run the Python script
echo "Starting the Nodejs script..."
git pull
pm2 stop solana_nft
pm2 start src/server.ts --name solana_nft --interpreter node
