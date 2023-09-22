// Get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
let net;

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

// Load PoseNet model and estimate poses
async function loadPoseNet() {
    net = await posenet.load();
}

// Function to add a mustache to the captured image
async function addMustacheToImage(imageData) {
    const imageElement = document.createElement('img');
    imageElement.src = imageData;

    const pose = await net.estimateSinglePose(imageElement);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const mustacheImage = new Image();
    mustacheImage.src = 'https://www.freepnglogos.com/uploads/mustache-png/mustache-template-photo-booth-signs-and-templates-33.png'; // New mustache image URL

    if (pose.keypoints[0].score > 0.5) {
        const noseX = pose.keypoints[0].position.x;
        const noseY = pose.keypoints[0].position.y;

        // Calculate the position and size of the mustache (under the nose)
        const mustacheWidth = 1.5 * pose.keypoints[0].position.x;
        const mustacheHeight = mustacheImage.height * (mustacheWidth / mustacheImage.width);

        // Adjust the position of the mustache to be centered under the nose
        const mustacheX = noseX - mustacheWidth / 2;
        const mustacheY = noseY - mustacheHeight / 2 + 10; // Adjust the vertical position as needed

        // Draw the captured image
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        // Draw the new mustache image under the nose
        context.drawImage(
            mustacheImage,
            mustacheX,
            mustacheY,
            mustacheWidth,
            mustacheHeight
        );
    }
}

// Initialize the camera and PoseNet on page load (automatic start)
startCamera();
loadPoseNet();

// Event listener to capture an image and add a mustache
video.addEventListener('click', () => {
    const imageData = captureImage();
    addMustacheToImage(imageData);
});