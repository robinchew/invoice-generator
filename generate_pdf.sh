#!/bin/bash

# Define the HTML input file path
html_file="timesheet.html"

# Define the PDF output file path
pdf_output="output.pdf"

# You have to provide the path to Chrome for the OS you are using
# Windows
# "C:\Program Files\Google\Chrome\Application\chrome.exe"

# Linux Ubuntu
# whereis google-chrome
# /usr/bin/google-chrome

# Mac OS
path_to_chrome=/Applications/"Google\ Chrome.app"/Contents/MacOS/"Google\ Chrome"
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
