// Get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');

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
    // You would implement the mustache addition logic here
    // This logic would depend on the specific requirements and libraries you use for face detection and image manipulation
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
