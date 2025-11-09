const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function generateIcon(size) {
    canvas.width = size;
    canvas.height = size;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw background
    ctx.fillStyle = '#0078d4';
    ctx.fillRect(0, 0, size, size);
    
    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SVG', size/2, size/2);
    
    return canvas.toDataURL('image/png');
}