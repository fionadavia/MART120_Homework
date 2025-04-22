// Player position
var playerX = 50;
var playerY = 50;

// Key codes
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// Obstacles (2+ moving ones with different colors/sizes)
var obstacles = [
    { x: 100, y: 200, size: 30, speedX: 2, speedY: 3, color: [255, 0, 0] },
    { x: 300, y: 400, size: 50, speedX: -3, speedY: 1, color: [0, 255, 0] }
];

// Mouse-click obstacle
var mouseObstacleX;
var mouseObstacleY;

// Setup
function setup() {
    createCanvas(500, 600);
}

// Main draw loop
function draw() {
    background(50, 100, 150);

    createBorders(10);
    drawExit();

    drawPlayer();
    movePlayer();

    moveObstacle1(obstacles[0]);
    drawObstacle(obstacles[0]);

    moveObstacle2(obstacles[1]);
    drawObstacle(obstacles[1]);

    if (mouseObstacleX !== undefined && mouseObstacleY !== undefined) {
        fill(200, 200, 50);
        rect(mouseObstacleX, mouseObstacleY, 40, 40);
    }

    checkWin();
}

// Player functions
function drawPlayer() {
    fill(0, 0, 255);
    circle(playerX, playerY, 25);
}

function movePlayer() {
    if (keyIsDown(w)) playerY -= 5;
    if (keyIsDown(s)) playerY += 5;
    if (keyIsDown(a)) playerX -= 5;
    if (keyIsDown(d)) playerX += 5;
}

// Obstacle functions
function drawObstacle(obs) {
    fill(obs.color);
    ellipse(obs.x, obs.y, obs.size);
}

function moveObstacle1(obs) {
    obs.x += obs.speedX;
    obs.y += obs.speedY;
    wrapAround(obs);
}

function moveObstacle2(obs) {
    obs.x += obs.speedX * 1.5;
    obs.y += obs.speedY * 0.5;
    wrapAround(obs);
}

function wrapAround(obs) {
    if (obs.x > width) obs.x = 0;
    else if (obs.x < 0) obs.x = width;

    if (obs.y > height) obs.y = 0;
    else if (obs.y < 0) obs.y = height;
}

// Draw exit
function drawExit() {
    fill(255, 255, 0);
    rect(width - 60, height - 60, 50, 50);
    fill(0);
    textSize(16);
    text("EXIT", width - 50, height - 40);
}

// Borders
function createBorders(thickness) {
    fill(0);
    rect(0, 0, width, thickness); // top
    rect(0, 0, thickness, height); // left
    rect(0, height - thickness, width, thickness); // bottom
    rect(width - thickness, 0, thickness, height - 60); // right with gap
}

// Win condition
function checkWin() {
    if (playerX > width - 60 && playerY > height - 60) {
        fill(255);
        textAlign(CENTER);
        textSize(32);
        text("Huzzah You Win!", width / 2, height / 2);
    }
}

// Mouse click to add a static obstacle
function mouseClicked() {
    mouseObstacleX = mouseX;
    mouseObstacleY = mouseY;
}
