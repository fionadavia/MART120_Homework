let diverImg, sharkImg, coralImg, pearlImg;
let diver;
let sharks = [];
let pearl;
let corals = [];
let score = 0;
let lives = 3;  // Start with 3 lives
let gameStarted = false;

function preload() {
  // Load images
  diverImg = loadImage('assets/diver.png');
  sharkImg = loadImage('assets/shark.png');
  coralImg = loadImage('assets/coral.png');
  pearlImg = loadImage('assets/pearl.png');
}

function setup() {
  createCanvas(800, 600);
  // Start screen
  showStartScreen();
}

function draw() {
  if (!gameStarted) return;

  background(0, 100, 200); // Ocean blue

  // Draw pearl
  image(pearlImg, pearl.x, pearl.y, 77.5, 81.5); // Scaled proportionally

  // Draw diver
  image(diverImg, diver.x, diver.y, 100, 32.6); // Scaled proportionally

  // Draw sharks
  for (let shark of sharks) {
    image(sharkImg, shark.x, shark.y, 120, 44.8);
  }

  // Draw corals
  for (let coral of corals) {
    image(coralImg, coral.x, coral.y, 87.4, 32.6);
  }

  // Display score
  textSize(32);
  fill(255);
  text(`Score: ${score}`, 70, 40);

  // Display lives
  textSize(32);
  fill(255);
  text(`Lives: ${'|'.repeat(lives)}`, width - 120, 50);

  moveDiver();
  moveSharks();
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

function moveSharks() {
  for (let shark of sharks) {
    shark.x += shark.dx;
    shark.y += shark.dy;

    // Bounce off walls
    if (shark.x < 0 || shark.x > width) shark.dx *= -1;
    if (shark.y < 0 || shark.y > height) shark.dy *= -1;
  }
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
  // Collision with sharks
  for (let shark of sharks) {
    let d1 = dist(diver.x, diver.y, shark.x, shark.y);
    if (d1 < (diver.size + shark.size) / 2) {
      lives--;
      if (lives <= 0) {
        gameOver();
      } else {
        resetGame();
      }
    }
  }

  // Collision with pearl
  let d2 = dist(diver.x, diver.y, pearl.x, pearl.y);
  if (d2 < (diver.size + pearl.size) / 2) {
    score++;
    resetPearl();
  }

  // Collision with corals (obstacles)
  for (let coral of corals) {
    let d3 = dist(diver.x, diver.y, coral.x, coral.y);
    if (d3 < (diver.size + coral.size) / 2) {
      lives--;
      if (lives <= 0) {
        gameOver();
      } else {
        resetGame();
      }
    }
  }
}

function resetGame() {
  // Reset diver position
  diver.x = 100;
  diver.y = height / 2;
  // Reset sharks position
  sharks = [];
  for (let i = 0; i < random(3, 5); i++) {
    sharks.push({
      x: random(width),
      y: random(height),
      size: 50,
      dx: random(-2, 2),
      dy: random(-2, 2)
    });
  }
  // Reset corals
  corals = [];
  for (let i = 0; i < 5; i++) {
    corals.push({
      x: random(width, width + 200),
      y: random(height),
      size: 30
    });
  }
}

function resetPearl() {
  pearl.x = width - 100;
  pearl.y = random(height);
}

function gameOver() {
  noLoop();
  fill(255, 0, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
  textSize(32);
  text(`Final Score: ${score}`, width / 2, height / 2 + 60);
  setTimeout(showStartScreen, 2000); // Show start screen after a short delay
}

function showStartScreen() {
  // Set up the start screen elements
  gameStarted = false;
  background(0, 100, 200);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("DIVER DASH", width / 2, height / 2 - 100);
  textSize(24);
  text("Use arrow keys to move\nCollect pearls to score\nAvoid sharks and corals", width / 2, height / 2 - 20);
  textSize(32);
  text("Press SPACE to start", width / 2, height / 2 + 100);
}

function keyPressed() {
  if (key === ' ' && !gameStarted) { // Start the game when space is pressed
    startGame();
  }
}

function startGame() {
  // Initialize diver and game variables
  diver = {
    x: 100,
    y: height / 2,
    size: 50,
    speed: 5
  };
  
  pearl = {
    x: width - 100,
    y: random(height),
    size: 30
  };
  
  // Initialize sharks
  sharks = [];
  for (let i = 0; i < random(3, 5); i++) {
    sharks.push({
      x: random(width),
      y: random(height),
      size: 50,
      dx: random(-2, 2),
      dy: random(-2, 2)
    });
  }
  
  // Initialize corals
  corals = [];
  for (let i = 0; i < 5; i++) {
    corals.push({
      x: random(width, width + 200),
      y: random(height),
      size: 30
    });
  }

  gameStarted = true;
  score = 0;
  lives = 3;
  loop();
}
