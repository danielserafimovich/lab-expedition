// Get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');

// Load the mustache image
const mustacheImage = new Image();
mustacheImage.src = 'https://pngimg.com/d/moustache_PNG18.png'; // Mustache image URL

// Check for camera access and start streaming
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

// Function to capture an image from the video stream
function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
}

// Function to add a mustache to the captured image
function addMustacheToImage(imageData) {
    const context = canvas.getContext('2d');
    
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the captured image
    const capturedImage = new Image();
    capturedImage.src = imageData;
    context.drawImage(capturedImage, 0, 0, canvas.width, canvas.height);

    // Calculate the position and size of the mustache (under the nose)
    const mustacheX = canvas.width / 2 - mustacheImage.width / 2;
    const mustacheY = canvas.height / 2 + canvas.height / 5;
    const mustacheWidth = mustacheImage.width;
    const mustacheHeight = mustacheImage.height;

    // Draw the mustache image onto the captured image
    context.drawImage(mustacheImage, mustacheX, mustacheY, mustacheWidth, mustacheHeight);
}

// Event listener for the Start button
startButton.addEventListener('click', () => {
    startCamera();
    startButton.disabled = true;
});

// Event listener to capture an image and add a mustache
video.addEventListener('click', () => {
    const imageData = captureImage();
    addMustacheToImage(imageData);
});

// Initialize the camera on page load
startCamera();
