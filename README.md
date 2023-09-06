

# Invoice Generator

## Instructions:

### 1. Installation:


Ensure Chromium or Chrome is installed on your system. You can download it from the official website or use a package manager like Homebrew (for macOS) or apt-get (for Linux).

   Make sure to edit the `html_file_path` variable in the script to point to the HTML file you want to convert. The generated PDF file will be saved as "output.pdf" by default, but you can change the filename as needed.

### 2. Customization:

If your HTML file structure is different or if you have specific requirements, you can customize the script:

- Adjust Waiting Element: Modify the script to specify the waiting element or conditions that indicate the HTML content is fully loaded. This ensures accurate PDF conversion.

- Modify Viewport Size: You can change the viewport size to match your content's dimensions for better PDF layout.

Feel free to adapt the script to fit your specific needs and HTML structure.

- Run the python script:

   ```shell
   python3 htmltopdf.py
   ```

- Or run the bash script:

  ```bash
  bash generate_pdf.sh
  ```

