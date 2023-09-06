import subprocess

def generate_pdf(html_file_path, pdf_output_path, chrome_path):

    command = [
        chrome_path,
        '--headless',
        '--disable-gpu',
        f'--print-to-pdf={pdf_output_path}',
        html_file_path
    ]

    try:
        subprocess.run(command, check=True)
        print("PDF has been generated")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")

# Change the path as required
# This the Chrome headless path for Mac OS
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Windows
# chrome_path = "C:\Program Files\Google\Chrome\Application\chrome.exe"
# Linux Ubuntu
# whereis google-chrome
# /usr/bin/google-chrome

html_file_path = "timesheet.html"
pdf_output_path = "output.pdf"

# Run the PDF generation function
generate_pdf(html_file_path, pdf_output_path, chrome_path)