#!/bin/bash

# Define the HTML input file path
html_file="timesheet.html"

# Define the PDF output file path
pdf_output="output.pdf"

chrome_bin=${CHROME_BIN:-"chromium-browser"}

# Run Chrome Headless in headless mode to generate the PDF
    eval $chrome_bin  \
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
