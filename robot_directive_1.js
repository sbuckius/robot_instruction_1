let totalImages = 30; // 6 questions * 5 images each
let imagePrefix = "images/brush";
let imageExtension = ".jpg";

let images = [];
let imageSets = [];
let questions = [];
let feedbackTexts = [];

let imagesPerSet = 5;
let numQuestions = 6;

let currentSet = 0;
let currentImageIndex = 0;

let showImage = true;
let showFeedback = false;
let showFinal = false;

let frameInterval = 15; // 0.25 seconds at 60fps
let lastSwitchFrame = 0;

let linkURL = "https://sbuckius.github.io/graph_fabric_woven_pixel/";
let finalLink;

function preload() {
  for (let i = 1; i <= totalImages; i++) {
    let path = imagePrefix + i + imageExtension;
    images.push(loadImage(path));
  }
}

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  textSize(18);

  // Create sets, questions, and feedback lines
  for (let i = 0; i < images.length; i += imagesPerSet) {
    imageSets.push(images.slice(i, i + imagesPerSet));
    questions.push("Select an image of a robot. (Set " + (i / imagesPerSet + 1) + ")");
    feedbackTexts.push("Instruct the human robot to perform this task 10 times. ");
  }

  finalLink = createA(linkURL, "Click here to continue", "_blank");
  finalLink.position(width / 2 - 70, height / 2);
  finalLink.style("color", "#00ffff"); // Cyan color
  finalLink.style("font-size", "18px");
  finalLink.style("text-decoration", "none");
  finalLink.hide();

  lastSwitchFrame = frameCount;
}

function draw() {
  background(242, 159, 185);
  fill(255);

  if (showFinal) {
    textSize(18);
    text("Thank you for your work!", width / 2, height / 2 - 40);
    finalLink.show();
    return;
  } else {
    finalLink.hide();
  }

  if (showFeedback) {
    textSize(18);
    text(feedbackTexts[currentSet], width / 2, height / 2 - 20);
    text("Click to continue.", width / 2, height / 2 + 20);
    return;
  }

  // Show current question
  textSize(18); // Larger question font
  text(questions[currentSet], width / 2, 50);

  if (showImage) {
    if (frameCount - lastSwitchFrame >= frameInterval) {
      currentImageIndex = (currentImageIndex + 1) % imageSets[currentSet].length;
      lastSwitchFrame = frameCount;
    }

    imageMode(CENTER);
    let img = imageSets[currentSet][currentImageIndex];
    image(img, width / 2, height / 2, 200, 200);
  }
}

function mousePressed() {
  if (showFeedback) {
    currentSet++;
    if (currentSet >= numQuestions) {
      showFinal = true;
    } else {
      currentImageIndex = 0;
      lastSwitchFrame = frameCount;
      showImage = true;
      showFeedback = false;
    }
    return;
  }

  if (showImage) {
    showImage = false;
    showFeedback = true;
  }
}
