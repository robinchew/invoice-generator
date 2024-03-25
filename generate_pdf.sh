#!/bin/bash
set -e

if [ -z $1 ];then
    echo "1 argument required";
    exit 1;
fi;

# Define the HTML input file path
html_file=$1

chrome_bin=${CHROME_BIN:-"chromium"}

# Run Chrome Headless in headless mode to generate the PDF
for qs in invoice timesheet;do
    pdf_output="${html_file%.*}_$qs.pdf";
    input=file://`readlink -f $html_file`?$qs;
    echo $input;
    eval $chrome_bin  \
    --headless  \
    --disable-gpu \
    --print-to-pdf=$pdf_output \
    $input;

    # Check if PDF generation was successful
    if [ -f "$pdf_output" ]; then
        echo "PDF has been generated."
    else
        echo "PDF generation failed."
    fi
done
