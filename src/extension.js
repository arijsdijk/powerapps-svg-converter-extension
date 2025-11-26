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
    const fileInput = document.getElementById('fileInput');
    const copyButton = document.getElementById('copyButton');
    const uploadTab = document.getElementById('uploadTab');
    const pasteTab = document.getElementById('pasteTab');
    const svgInput = document.getElementById('svgInput');
    const refreshButton = document.getElementById('refreshButton');
    const infoButton = document.getElementById('infoButton');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    if (copyButton) {
      copyButton.addEventListener('click', () => this.handleCopy());
    }

    if (uploadTab && pasteTab) {
      uploadTab.addEventListener('click', () => this.switchTab('upload'));
      pasteTab.addEventListener('click', () => this.switchTab('paste'));
    }

    if (svgInput) {
      svgInput.addEventListener('input', () => {
        // Use a small delay to ensure we have the complete pasted content
        clearTimeout(this.pasteTimeout);
        this.pasteTimeout = setTimeout(() => this.handlePastedSVG(), 100);
      });
    }

    if (refreshButton) {
      refreshButton.addEventListener('click', () => this.handleRefresh());
    }

    if (infoButton) {
      infoButton.addEventListener('click', () => {
        location.href = 'info.html';
      });
    }
  }

  handleRefresh() {
    // Reset file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }

    // Reset SVG input textarea
    const svgInput = document.getElementById('svgInput');
    if (svgInput) {
      svgInput.value = '';
    }

    // Reset preview
    const previewContainer = document.getElementById('svgPreview');
    if (previewContainer) {
      previewContainer.innerHTML = '';
    }

    // Reset output
    const outputText = document.getElementById('outputText');
    if (outputText) {
      outputText.value = '';
    }

    // Reset to upload tab
    this.switchTab('upload');
  }

  switchTab(tab) {
    const uploadTab = document.getElementById('uploadTab');
    const pasteTab = document.getElementById('pasteTab');
    const uploadSection = document.getElementById('uploadSection');
    const pasteSection = document.getElementById('pasteSection');
    
    // Reset form data
    const fileInput = document.getElementById('fileInput');
    const svgInput = document.getElementById('svgInput');
    const previewContainer = document.getElementById('svgPreview');
    const outputText = document.getElementById('outputText');

    // Clear all inputs and outputs
    if (fileInput) fileInput.value = '';
    if (svgInput) svgInput.value = '';
    if (previewContainer) previewContainer.innerHTML = '';
    if (outputText) outputText.value = '';

    // Switch tabs
    if (tab === 'upload') {
      uploadTab.classList.add('active');
      uploadTab.classList.remove('inactive');
      pasteTab.classList.remove('active');
      uploadSection.classList.remove('hidden');
      pasteSection.classList.add('hidden');
    } else {
      pasteTab.classList.add('active');
      pasteTab.classList.remove('inactive');
      uploadTab.classList.remove('active');
      pasteSection.classList.remove('hidden');
      uploadSection.classList.add('hidden');
    }
  }

  handlePastedSVG() {
    const svgInput = document.getElementById('svgInput');
    const previewContainer = document.getElementById('svgPreview');
    const outputText = document.getElementById('outputText');
    const content = svgInput.value.trim();
    
    // Clear preview and output if there's no content
    if (!content) {
      previewContainer.innerHTML = '';
      outputText.value = '';
      return;
    }

    // Only process if it looks like SVG content
    if (content.includes('<svg')) {
      previewContainer.innerHTML = content;
      
      const svgElement = previewContainer.querySelector('svg');
      if (svgElement) {
        svgElement.style.width = '48px';
        svgElement.style.height = '48px';
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        const convertedSvg = this.convertSVGForPowerApps(svgElement);
        outputText.value = convertedSvg;
      } else {
        previewContainer.innerHTML = '';
        outputText.value = '';
      }
    } else {
      previewContainer.innerHTML = '';
      outputText.value = '';
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const previewContainer = document.getElementById('svgPreview');
        previewContainer.innerHTML = content;
        
        // Get the SVG element
        const svgElement = previewContainer.querySelector('svg');
        if (svgElement) {
          // Set width and height to 48px while preserving aspect ratio
          svgElement.style.width = '48px';
          svgElement.style.height = '48px';
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          
          // Automatically trigger the conversion
          const convertedSvg = this.convertSVGForPowerApps(svgElement);
          document.getElementById('outputText').value = convertedSvg;
          
          // Automatically trigger the conversion
          this.convertSvg(content);
        }
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