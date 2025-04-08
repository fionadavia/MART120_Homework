// === Motion Variables ===
var eyeY = 75;
var eyeDirection;

var leftArmX = 150;
var leftArmDirection;

var rightArmX = 300;
var rightArmDirection;

var decoX = 250;
var decoY = 220;
var decoXDirection;
var decoYDirection;

var titleSize = 22;
var titleCount = 0;
var titleDirection;
var growing = true;

function setup() {
  createCanvas(500, 600);

  // Assign random speeds
  eyeDirection = random(0.3, 1);
  leftArmDirection = random(0.5, 2);
  rightArmDirection = random(0.5, 2);
  decoXDirection = random(0.5, 2);
  decoYDirection = random(0.5, 2);
  titleDirection = random(0.3, 1);
}

function draw() {
  background(199, 221, 199); // sage green

  // === Title Text Animation ===
  fill(0);
  textSize(titleSize);
  text("Howdy Mate", 10, 80);

  if (growing) {
    titleSize += titleDirection;
    if (titleSize >= 32) {
      titleCount++;
      if (titleCount >= 5) {
        growing = false;
        titleCount = 0;
      }
    }
  } else {
    titleSize -= titleDirection;
    if (titleSize <= 22) {
      titleCount++;
      if (titleCount >= 5) {
        growing = true;
        titleCount = 0;
      }
    }
  }

  // === Eye Animation (y-axis) ===
  eyeY += eyeDirection;
  if (eyeY >= 78 || eyeY <= 72) {
    eyeDirection *= -1;
  }

  // === Arm Animation (x-axis, different speeds) ===
  leftArmX += leftArmDirection;
  if (leftArmX >= 160 || leftArmX <= 140) {
    leftArmDirection *= -1;
  }

  rightArmX += rightArmDirection;
  if (rightArmX >= 310 || rightArmX <= 290) {
    rightArmDirection *= -1;
  }

  // === Shirt Decoration Animation (diagonal) ===
  decoX += decoXDirection;
  decoY += decoYDirection;
  if (decoX >= 260 || decoX <= 240) {
    decoXDirection *= -1;
  }
  if (decoY >= 230 || decoY <= 210) {
    decoYDirection *= -1;
  }

  // === Drawing the Self-Portrait ===

  // Head
  strokeWeight(15);
  fill(255, 224, 189);
  circle(250, 100, 175);

  // Eyes
  strokeWeight(10);
  fill(0);
  point(220, eyeY); // left eye (animated)
  point(280, eyeY); // right eye (animated)

  // Nose
  strokeWeight(10);
  point(250, 93);

  // Mouth
  fill(255, 100, 100);
  ellipse(250, 135, 15, 10);

  // Hair
  stroke(139, 69, 19);
  strokeWeight(20);
  line(130, 173, 180, 50);
  line(320, 52, 360, 175);

  strokeWeight(25);
  line(190, 40, 250, 30);
  line(310, 40, 250, 30);

  // Body
  strokeWeight(10);
  fill(245, 245, 235); // off-white shirt
  rect(200, 185, 100, 150);

  // Shirt Decoration (animated)
  fill(176, 208, 168);
  triangle(decoX - 30, decoY + 100, decoX, decoY, decoX + 30, decoY + 100);

  // Arms (animated)
  fill(245, 245, 235);
  rect(rightArmX, 195, 50, 10); // Right Arm
  rect(leftArmX, 195, 50, 10);  // Left Arm

  // Legs
  rect(200, 335, 10, 50);
  rect(290, 335, 10, 50);

  // Signature
  fill(0);
  textSize(22);
  text("Fiona Davia", 270, 500);
}
