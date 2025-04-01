// Fiona Davia's Self-Portrait using p5.js
function setup() {
    createCanvas(400, 400);
    background(220);
  
    // Title
    textSize(20);
    textAlign(CENTER);
    text('Self-Portrait', 200, 30);
  
    // Face
    fill(255, 224, 189);
    ellipse(200, 200, 150, 180);  // Face shape
  
    // Eyes
    fill(255);
    ellipse(170, 180, 30, 20);
    ellipse(230, 180, 30, 20);
    fill(0);
    ellipse(170, 180, 10, 10);  // Left pupil
    ellipse(230, 180, 10, 10);  // Right pupil
  
    // Nose
    fill(255, 224, 189);
    triangle(195, 200, 205, 200, 200, 220);
  
    // Mouth
    fill(255, 100, 100);
    ellipse(200, 250, 50, 20);
  
    // Hair
    fill(0);
    rect(150, 100, 100, 40);
    line(150, 100, 130, 150);  // Hair strand
    line(250, 100, 270, 150);  // Hair strand
  
    // Signature
    textSize(12);
    textAlign(LEFT);
    text('Fiona Davia', 10, 390);
  }
  
  function draw() {
    // Drawing code only happens once in setup
  }
  