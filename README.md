# PowerApps SVG Converter Extension

A browser extension that converts SVG files into a format compatible with Canvas Apps.

## Description

Power Apps SVG Converter is a simple and intuitive browser extension designed to help PowerApps developers easily convert SVG images for use in Canvas Apps. The extension converts SVG code to the `data:image/svg+xml` format with proper encoding, making it ready to use in PowerApps Image controls.

## Features

- **Upload SVG Files**: Select SVG files directly from your computer
- **Paste SVG Code**: Paste SVG code directly into the extension
- **Live Preview**: See a real-time preview of your SVG before conversion
- **One-Click Conversion**: Automatically converts SVG to PowerApps-compatible format
- **Copy**: Easily copy the converted code with a single click to use in a image control
- **Copy YAML**: Easily copy the converted code to a direct Image control
- **Dark Mode Support**: Automatically adapts to your system's dark mode preference
- **Clean Output**: Removes unnecessary attributes that might cause issues in PowerApps

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
   ```bash
   git clone https://github.com/arijsdijk/powerapps-svg-converter-extension.git
   ```

2. Open your browser's extension management page:
   - **Microsoft Edge**: Navigate to `edge://extensions/`
   - **Google Chrome**: Navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in the top right corner)

4. Click **Load unpacked** and select the cloned repository folder

5. The extension icon should now appear in your browser toolbar

## Usage

### Upload SVG File

1. Click on the extension icon in your browser toolbar
2. Make sure the "Upload SVG" tab is selected
3. Click "Choose File" and select an SVG file from your computer
4. The preview and converted code will appear automatically
5. Click "Copy to Clipboard" to copy the PowerApps-compatible code, or click "Copy YAML" to copy in YAML format

### Paste SVG Code

1. Click on the extension icon in your browser toolbar
2. Switch to the "Paste SVG" tab
3. Paste your SVG code into the text area
4. The preview and converted code will appear automatically
5. Click "Copy to Clipboard" to copy the PowerApps-compatible code, or click "Copy YAML" to copy in YAML format

### Using in PowerApps

After copying the converted SVG code, you can use it in PowerApps by:

**Option 1: Direct Copy**
1. Add an Image control to your Canvas App
2. Set the `Image` property to the copied code
3. The SVG will render in your PowerApps application

Example output format:
```
"data:image/svg+xml;utf8, "&EncodeUrl("<svg>...</svg>")
```

**Option 2: YAML Import (Copy YAML)**
1. Copy the YAML format from the extension
2. In PowerApps Studio, paste the YAML code to import the Image control with the SVG
3. The Image control will be created automatically with the SVG already configured

Example YAML format:
```yaml
- Image:
    Control: Image@2.2.3
    Properties:
      Image: |-
        ="data:image/svg+xml;utf8, "&EncodeUrl("<svg>...</svg>")
      X: =40
      Y: =40
```

## Support

If you encounter any issues or have questions about the extension, you can reach out through the following channels:

- **GitHub Issues**: [Open an issue](https://github.com/arijsdijk/powerapps-svg-converter-extension/issues) for bug reports or feature requests
- **Email**: [arjan.rijsdijk@outlook.com](mailto:arjan.rijsdijk@outlook.com)
- **LinkedIn**: [Arjan Rijsdijk](https://www.linkedin.com/in/arjanrijsdijk/)

## Questions and Feedback

We welcome your feedback and suggestions! Here's how you can contribute:

- **Feature Requests**: Have an idea to improve the extension? [Open an issue](https://github.com/arijsdijk/powerapps-svg-converter-extension/issues/new) with the label "enhancement"
- **Bug Reports**: Found a bug? [Report it here](https://github.com/arijsdijk/powerapps-svg-converter-extension/issues/new) with steps to reproduce
- **General Questions**: Feel free to reach out via email or LinkedIn for general inquiries

## Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is open source. See the repository for license details.

## Version

Current version: **1.0.0**

## Privacy policy

For more information about your privacy [click here](privacy.md)
