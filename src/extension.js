// SVG Converter functionality
class SVGConverter {
  constructor() {
    this.initialize();
    this.convertedSVG = null;
  }

  initialize() {
    // Add event listeners when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.setupEventListeners();
      this.initializeDarkMode();
    });
  }

  initializeDarkMode() {
    const html = document.documentElement;

    // Function to update the UI based on dark mode state
    const updateDarkMode = (isDark) => {
      if (isDark) {
        html.classList.add('dark');
        document.body.style.backgroundColor = '#1f2937';
        document.body.style.color = '#f3f4f6';
      } else {
        html.classList.remove('dark');
        document.body.style.backgroundColor = '#f9fafb';
        document.body.style.color = '#111827';
      }
    };

    // Get system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial setup based on system preference
    updateDarkMode(systemPrefersDark.matches);

    // Listen for system preference changes
    systemPrefersDark.addEventListener('change', (e) => {
      updateDarkMode(e.matches);
    });
  }

  setupEventListeners() {
    const convertButton = document.getElementById('convertButton');
    const fileInput = document.getElementById('fileInput');
    const copyButton = document.getElementById('copyButton');
    
    if (convertButton && fileInput) {
      convertButton.addEventListener('click', () => this.handleConversion());
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    if (copyButton) {
      copyButton.addEventListener('click', () => this.handleCopy());
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
    
    // Store the converted SVG in a data attribute and display it
    const outputText = document.getElementById('outputText');
    outputText.value = convertedSVG;
    outputText.dataset.convertedSvg = convertedSVG;
  }

  convertSVGForPowerApps(svgElement) {
    // Clone the SVG to avoid modifying the original
    const clone = svgElement.cloneNode(true);
    
    // Remove any unnecessary attributes
    this.cleanupSVG(clone);
    
    // Convert to string
    let svgString = clone.outerHTML;
    
    // Replace double quotes with single quotes
    svgString = svgString.replace(/"/g, "'");
    
    // Create the Power Apps compatible format
    const powerAppsFormat = `"data:image/svg+xml;utf8, "&EncodeUrl("${svgString}")`;
    
    return powerAppsFormat;
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

  async handleCopy() {
    const outputText = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');
    const textToCopy = outputText.value;

    if (!textToCopy) {
      copyButton.textContent = 'Nothing to copy';
      copyButton.style.backgroundColor = '#f44336';
      setTimeout(() => {
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.style.backgroundColor = '#0078d4';
      }, 2000);
      return;
    }

    try {
      // Create a temporary textarea element
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      
      // Select and copy the text
      tempTextArea.select();
      document.execCommand('copy');
      
      // Remove the temporary element
      document.body.removeChild(tempTextArea);

      // Visual feedback
      copyButton.textContent = 'Copied!';
      copyButton.style.backgroundColor = '#4CAF50';
    } catch (err) {
      console.error('Copy failed:', err);
      copyButton.textContent = 'Failed to copy';
      copyButton.style.backgroundColor = '#f44336';
    }

    // Reset button after 2 seconds
    setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
      copyButton.style.backgroundColor = '#0078d4';
    }, 2000);
  }
}

// Initialize the converter
const converter = new SVGConverter();