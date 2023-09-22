// Function to add green webbing and a mustache to the captured image
async function addWebbingAndMustacheToImage(imageData) {
    const imageElement = document.createElement('img');
    imageElement.src = imageData;

    const pose = await net.estimateSinglePose(imageElement);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Define the body part groups you want to outline
    const bodyPartGroups = [
        ['leftShoulder', 'leftElbow', 'leftWrist'],
        ['rightShoulder', 'rightElbow', 'rightWrist'],
        ['leftShoulder', 'rightShoulder'],
        ['leftHip', 'rightHip'],
        ['leftHip', 'leftKnee', 'leftAnkle'],
        ['rightHip', 'rightKnee', 'rightAnkle'],
        ['leftEye', 'rightEye'],
        ['leftEar', 'rightEar'],
    ];

    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'green';
    context.lineWidth = 2;

    // Draw green lines around selected body part groups
    bodyPartGroups.forEach(group => {
        context.beginPath();
        group.forEach(partName => {
            const part = pose.keypoints.find(kp => kp.part === partName);
            if (part) {
                context.lineTo(part.position.x, part.position.y);
            }
        });
        context.closePath();
        context.stroke();
    });

    // Add a mustache to the image (you can use your existing mustache-drawing code here)
    if (pose.keypoints[0].score > 0.5) {
        const noseX = pose.keypoints[0].position.x;
        const noseY = pose.keypoints[0].position.y;

        // Calculate the position and size of the mustache (under the nose)
        const mustacheWidth = 2 * pose.keypoints[0].position.x;
        const mustacheHeight = mustacheImage.height * (mustacheWidth / mustacheImage.width);

        // Draw the mustache image under the nose
        context.drawImage(
            mustacheImage,
            noseX - mustacheWidth / 2,
            noseY - mustacheHeight / 2,
            mustacheWidth,
            mustacheHeight
        );
    }
}

// Event listener to capture an image and add green webbing and a mustache
startButton.addEventListener('click', () => {
    const imageData = captureImage();
    addWebbingAndMustacheToImage(imageData);
});
