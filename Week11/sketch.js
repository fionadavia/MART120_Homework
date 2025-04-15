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

    // Draw borders and exit
    createBorders(10);
    drawExit();

    // Draw player
    drawPlayer();
    movePlayer();

    // Draw and move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        moveObstacle(obstacles[i]);
        drawObstacle(obstacles[i]);
    }

    // Draw mouse obstacle
    if (mouseObstacleX !== undefined && mouseObstacleY !== undefined) {
        fill(200, 200, 50);
        rect(mouseObstacleX, mouseObstacleY, 40, 40);
    }

    // Win condition 
    if (playerX > width - 60 && playerY > height - 60) {
        textSize(32);
        fill(255);
        text("Huzzah You Win!", width / 2 - 80, height / 2);
    }
}

// Player functions
function drawPlayer() {
    fill(0, 0, 255);
    circle(playerX, playerY, 25);
}

function movePlayer() {
    if (keyIsDown(w)) {
        playerY -= 5;
    } else if (keyIsDown(s)) {
        playerY += 5;
    }

    if (keyIsDown(a)) {
        playerX -= 5;
    } else if (keyIsDown(d)) {
        playerX += 5;
    }
}

// Obstacles
function drawObstacle(obs) {
    fill(obs.color);
    ellipse(obs.x, obs.y, obs.size);
}

function moveObstacle(obs) {
    obs.x += obs.speedX;
    obs.y += obs.speedY;

    // Wrap around
    if (obs.x > width) {
        obs.x = 0;
    } else if (obs.x < 0) {
        obs.x = width;
    }

    if (obs.y > height) {
        obs.y = 0;
    } else if (obs.y < 0) {
        obs.y = height;
    }
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
    rect(width - thickness, 0, thickness, height - 60); // right (gap for exit)
}

// Mouse click to add a static obstacle
function mouseClicked() {
    mouseObstacleX = mouseX;
    mouseObstacleY = mouseY;
}
