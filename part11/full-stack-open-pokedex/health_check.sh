#!/bin/bash

# Greet from shell script
echo "Hello from shell script"

# exit 1 # exit status 1 means that the script "fails"
# exit 0 # exit status 0 means that the script "succeeds"

# Perform the health check
endpoint="http://localhost:5000/health"
expected_response="ok"

response=$(curl -s "$endpoint")
if [[ "$response" == *"$expected_response"* ]]; then
    echo "Health check passed."
    exit 0
else
    echo "Health check failed."
    exit 1
fi