import subprocess
import sys
def generate_pdf(html_file_path, pdf_output_path, chrome_path):
    
    command = [
        chrome_path,
        '--headless',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--no-margins',
        f'--print-to-pdf={pdf_output_path}',    
        html_file_path
    ]

    try:
        subprocess.run(command, check=True)
        print("PDF has been generated")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")

# Change the path as required

# Determine the operating system
if sys.platform == 'win32':
    # Windows
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
elif sys.platform == 'darwin':
    # macOS
    chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif sys.platform == 'linux':
    # Linux (example path, you should verify the actual path)
    chrome_path = "/usr/bin/google-chrome"
else:
    # Handle other platforms or provide a default path
    print("Unsupported platform. Please set the Chrome path manually.")
    chrome_path = None

# Check if the Chrome path was determined successfully
if chrome_path:
    print(f"Using Chrome path: {chrome_path}")
else:
    print("Chrome path not set.")



html_file_path = "timesheet.html"
pdf_output_path = "output.pdf"

# Run the PDF generation function
generate_pdf(html_file_path, pdf_output_path, chrome_path)