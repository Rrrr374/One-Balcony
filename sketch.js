//IML575: Graduate Media Arts Research Lab - Media, Machines and Memoir
//Quickfire Challenge 2: Cornell Memory Box
//Ruihan (Rae) Fu

//My curated box is composed of elements from my past and symbols that hold deep personal meaning. These components have shaped my identity and who I am today, and together, they represent the past, present, and future. In the four-dimensional space we exist, a three-dimensional box can be divided into three parts: the outside, the box itself, and the inside. The outside symbolizes the future, the box represents the past, and the inside holds the present. My work, One Balcony, revolves around this general concept.

let clockImage, hourHandImage, minuteHandImage, secondHandImage;
let cx, cy; // Center position of the clock
let clockDiameter;
let font;  // Custom font for clock numbers
let bgImagePast, bgImageFuture; // Background images

function preload() {
  // Load your clock image
  clockImage = loadImage('present.png');

  // Load custom hand images
  hourHandImage = loadImage('hour-hand.png');
  minuteHandImage = loadImage('minute-hand.png');
  secondHandImage = loadImage('second-hand.png');

  // Load custom font (Make sure to upload Newsreader-Medium.ttf)
  font = loadFont('Newsreader-Medium.ttf'); 

  // Load your background images (it should have transparent areas if desired)
  bgImagePast = loadImage('past.png');  // The past image
  bgImageFuture = loadImage('future.png'); // The future image
}

function setup() {
  createCanvas(672, 576); // Set canvas size to 7x6 inches (672x576 pixels)
  stroke(255);
  textFont(font);  // Apply the custom font
  textSize(16);    // Set smaller text size for clock numbers
  let radius = min(width, height) / 2;
  clockDiameter = radius * 1.6; // Reduced clock size (smaller)

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  clear(); // This makes the background transparent

  // Draw the future background image (base backdrop)
  imageMode(CENTER);
  //image(bgImageFuture, width / 2, height / 2, width, height); // Adjust size and positioning as needed

  // Draw the past background image (on top of future.png)
    imageMode(CENTER);
  image(bgImagePast, width / 2, height / 2, width, height); // Adjust size and positioning as needed

  // Draw the clock image
  image(clockImage, cx, cy, clockDiameter, clockDiameter);

  // Draw clock numbers
  drawClockNumbers();

  // Get current time
  let h = hour();
  let m = minute();
  let s = second();

  // Draw custom second hand
  let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
  drawCustomHand(secondHandImage, secondAngle, clockDiameter * 0.4, clockDiameter * 0.06); // Wider second hand

  // Draw custom minute hand
  let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
  drawCustomHand(minuteHandImage, minuteAngle, clockDiameter * 0.35, clockDiameter * 0.08); // Wider minute hand

  // Draw custom hour hand
  let hourAngle = map(h % 12 + m / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  drawCustomHand(hourHandImage, hourAngle, clockDiameter * 0.3, clockDiameter * 0.10); // Even wider hour hand

  // Draw the center point of the clock
  fill(42,2,15);
  noStroke();
  ellipse(cx, cy, 10, 10); // Dot at the center
}

// Function to draw a custom hand image with rotation
function drawCustomHand(handImage, angle, length, width) {
  push(); // Start a new drawing state
  translate(cx, cy); // Move to the center of the clock
  rotate(angle); // Rotate the hand according to the calculated angle
  imageMode(CENTER);
  image(handImage, length / 2, 0, length, width); // Adjust the hand width and length
  pop(); // Restore the original drawing state
}

// Function to draw clock numbers
function drawClockNumbers() {
  fill(1, 6, 20);  // Set the clock number color to "rgb(1, 6, 20)"
  textAlign(CENTER, CENTER); // Center the text
  textSize(14); // Smaller font size

  // Loop through numbers 1 to 12
  for (let i = 1; i <= 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    let x = cx + cos(angle) * (clockDiameter * 0.45);  // Position the numbers slightly inside the clock edge
    let y = cy + sin(angle) * (clockDiameter * 0.45);

    // Draw the number at calculated position
    text(i, x, y);
  }
}
