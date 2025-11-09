// SVG Converter functionality
class SVGConverter {
  constructor() {
    this.initialize();
  }

  initialize() {
    // Add event listeners when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.setupEventListeners();
    });
  }

  setupEventListeners() {
    const convertButton = document.getElementById('convertButton');
    const fileInput = document.getElementById('fileInput');
    
    if (convertButton && fileInput) {
      convertButton.addEventListener('click', () => this.handleConversion());
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        document.getElementById('svgPreview').innerHTML = content;
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid SVG file.');
    }
  }

  handleConversion() {
    const svgElement = document.getElementById('svgPreview').querySelector('svg');
    if (!svgElement) {
      alert('Please select an SVG file first.');
      return;
    }

    // Convert SVG to PowerApps format
    const convertedSVG = this.convertSVGForPowerApps(svgElement);
    
    // Display the converted SVG
    document.getElementById('outputText').value = convertedSVG;
  }

  convertSVGForPowerApps(svgElement) {
    // Clone the SVG to avoid modifying the original
    const clone = svgElement.cloneNode(true);
    
    // Remove any unnecessary attributes
    this.cleanupSVG(clone);
    
    // Convert to string and format for PowerApps
    let svgString = clone.outerHTML;
    
    // Escape special characters
    svgString = svgString.replace(/"/g, '""');
    
    return svgString;
  }

  cleanupSVG(element) {
    // Remove unnecessary attributes that might cause issues in PowerApps
    const attributesToRemove = ['style', 'class', 'data-name'];
    
    attributesToRemove.forEach(attr => {
      element.removeAttribute(attr);
    });
    
    // Clean up child elements recursively
    Array.from(element.children).forEach(child => {
      this.cleanupSVG(child);
    });
  }
}

// Initialize the converter
const converter = new SVGConverter();