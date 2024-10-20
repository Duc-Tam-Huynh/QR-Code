function generateQRCode() {
    const link = document.getElementById('driveLink').value;
    
    // Clear any previous QR code
    document.getElementById('qrcode').innerHTML = '';

    if (link) {
        // Define size (4x larger than original 128x128) and calculate margin (10%)
        const size = 300; // 128 * 4 = 512
        const margin = Math.round(size * 0.1); // 10% of size

        // Generate new QR code with specified size and margin
        const qrCode = new QRCode(document.getElementById('qrcode'), {
            text: link,
            width: size,
            height: size,
            correctLevel: QRCode.CorrectLevel.H // High error correction level
        });

        // Add margin to the canvas after generating QR code
        setTimeout(() => {
            const qrCanvas = document.querySelector('#qrcode canvas');
            const ctx = qrCanvas.getContext('2d');
            
            // Create a new canvas with added margin
            const marginCanvas = document.createElement('canvas');
            marginCanvas.width = size + 2 * margin;
            marginCanvas.height = size + 2 * margin;

            const marginCtx = marginCanvas.getContext('2d');
            marginCtx.fillStyle = 'white'; // Set margin background color
            marginCtx.fillRect(0, 0, marginCanvas.width, marginCanvas.height); // Fill the whole canvas with white

            // Draw the QR code in the center of the new canvas
            marginCtx.drawImage(qrCanvas, margin, margin);

            // Replace the old canvas with the new one
            document.getElementById('qrcode').innerHTML = '';
            document.getElementById('qrcode').appendChild(marginCanvas);
            
            // Show the download button
            document.getElementById('downloadButton').style.display = 'block';
        }, 100); // Timeout to allow QR code generation before canvas manipulation
    } else {
        alert('Please enter a Google Drive link');
    }
}

function downloadQRCode() {
    const qrCodeElement = document.querySelector('#qrcode canvas');
    
    if (qrCodeElement) {
        const imgData = qrCodeElement.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
