let diver;
let shark;
let pearl;

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
}

function draw() {
  background(0, 100, 200); // ocean blue

  // Draw pearl
  fill(255, 255, 200);
  ellipse(pearl.x, pearl.y, pearl.size);

  // Draw diver
  fill(255);
  rect(diver.x, diver.y, diver.size, diver.size);

  // Draw shark
  fill(150, 0, 0);
  ellipse(shark.x, shark.y, shark.size);

  moveDiver();
  moveShark();
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
}
