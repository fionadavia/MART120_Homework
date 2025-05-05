let diverImg, sharkImg, coralImg, pearlImg;
let diver;
let shark;
let pearl;
let corals = [];

function preload() {
  // Load images
  diverImg = loadImage('assets/diver.png');
  sharkImg = loadImage('assets/shark.png');
  coralImg = loadImage('assets/coral.png');
  pearlImg = loadImage('assets/pearl.png');
}

function setup() {
  createCanvas(800, 600);

  diver = {
    x: 100,
    y: height / 2,
    size: 40,
    speed: 4
  };

  shark = {
    x: random(width),
    y: random(height),
    size: 50,
    dx: random(-2, 2),
    dy: random(-2, 2)
  };

  pearl = {
    x: width - 100,
    y: height / 2,
    size: 30
  };

  // Create initial coral obstacles
  for (let i = 0; i < 5; i++) {
    corals.push({
      x: random(width, width + 200),
      y: random(height),
      size: 30
    });
  }
}

function draw() {
  background(0, 100, 200); // ocean blue

  // Draw pearl
  image(pearlImg, pearl.x, pearl.y, pearl.size, pearl.size);

  // Draw diver
  image(diverImg, diver.x, diver.y, diver.size, diver.size);

  // Draw shark
  image(sharkImg, shark.x, shark.y, shark.size, shark.size);

  // Draw corals (obstacles)
  for (let coral of corals) {
    image(coralImg, coral.x, coral.y, coral.size, coral.size);
  }

  moveDiver();
  moveShark();
  moveCorals();
  checkCollisions();
}

function moveDiver() {
  if (keyIsDown(LEFT_ARROW)) diver.x -= diver.speed;
  if (keyIsDown(RIGHT_ARROW)) diver.x += diver.speed;
  if (keyIsDown(UP_ARROW)) diver.y -= diver.speed;
  if (keyIsDown(DOWN_ARROW)) diver.y += diver.speed;

  // Stay on screen
  diver.x = constrain(diver.x, 0, width - diver.size);
  diver.y = constrain(diver.y, 0, height - diver.size);
}

function moveShark() {
  shark.x += shark.dx;
  shark.y += shark.dy;

  // Bounce off walls
  if (shark.x < 0 || shark.x > width) shark.dx *= -1;
  if (shark.y < 0 || shark.y > height) shark.dy *= -1;
}

function moveCorals() {
  for (let coral of corals) {
    coral.x -= 3; // Move obstacles leftward

    // Reset coral to the right side once it goes off-screen
    if (coral.x < 0) {
      coral.x = random(width, width + 200);
      coral.y = random(height);
    }
  }
}

function checkCollisions() {
  // Collision with shark
  let d1 = dist(diver.x, diver.y, shark.x, shark.y);
  if (d1 < (diver.size + shark.size) / 2) {
    noLoop();
    alert("You were eaten by the shark!");
  }

  // Collision with pearl
  let d2 = dist(diver.x, diver.y, pearl.x, pearl.y);
  if (d2 < (diver.size + pearl.size) / 2) {
    noLoop();
    alert("You got the pearl! You win!");
  }

  // Collision with coral (obstacles)
  for (let coral of corals) {
    let d3 = dist(diver.x, diver.y, coral.x, coral.y);
    if (d3 < (diver.size + coral.size) / 2) {
      noLoop();
      alert("You hit a coral! Game Over!");
    }
  }
}
