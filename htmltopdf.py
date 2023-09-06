import asyncio
from pyppeteer import launch

async def generate_pdf(html_file_path, pdf_output_path):
    # Launch headless Chromium browser
    browser = await launch(headless=True)
    page = await browser.newPage()

    # Set a larger viewport size to capture the entire page
    await page.setViewport({'width': 1920, 'height': 1080})

    # Navigate to the HTML file
    await page.goto(f'file://{html_file_path}')

    # Wait for a selector to become visible (you can replace 'body' with your element)
    await page.waitForSelector('body')

    # Generate the PDF
    await page.pdf({'path': pdf_output_path, 'format': 'A4'})

    # Close the browser
    await browser.close()

# Change the path as required
html_file_path = "/Users/School/Documents/Freelance/Invoice generator/jspdf/timesheet.html"
pdf_output_path = "output.pdf"

# Run the PDF generation function
asyncio.get_event_loop().run_until_complete(generate_pdf(html_file_path, pdf_output_path))
