#!/bin/bash

# Define the HTML input file path
html_file="timesheet.html"

# Define the PDF output file path
pdf_output="output.pdf"

# Windows
# path_to_chrome="C:\Program Files\Google\Chrome\Application\chrome.exe"

# Determine the user's operating system
os_name=$(uname -s)

# Set the path to Chrome based on the operating system
case $os_name in
  Linux)
    # Linux path
    whereis google-chrome
    path_to_chrome="/usr/bin/google-chrome"
    ;;
  Darwin)
    # macOS path
    path_to_chrome=/Applications/"Google\ Chrome.app"/Contents/MacOS/"Google\ Chrome"
    ;;
  *)
    # Default path (modify as needed)
    echo "Unsupported operating system: $os_name"
    exit 1
    ;;
esac

# Run Chrome Headless in headless mode to generate the PDF
    eval $path_to_chrome  \
    --headless  \
    --disable-gpu \
    --print-to-pdf=$pdf_output \
    $html_file


# Check if PDF generation was successful
if [ -f "$pdf_output" ]; then
    echo "PDF has been generated."
else
    echo "PDF generation failed."
fi
