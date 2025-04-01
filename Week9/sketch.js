function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(255, 255, 197);
fill(0);
text("Howdy Mate", 10, 80);

  // Head
  strokeWeight(15);
  fill(255, 224, 189);
  circle(250, 100, 175);

  // Eyes
  strokeWeight(10);
  fill(0);
  point(220, 75); // Left eye
  point(280, 75); // Right eye

  // Nose
  strokeWeight(10);
  point(250, 93);

  // Mouth
  fill(255, 100, 100);
  ellipse(250, 135, 15, 10);

  // Hair 
  stroke(139, 69, 19);  

  strokeWeight(20); // Hairline weight
  line(130, 173, 180, 50);
  line(320, 52, 360, 175);

  strokeWeight(25); // Bangs weight
  line(190, 40, 250, 30);
  line(310, 40, 250, 30);

  // Body
  strokeWeight(10);
  fill(245, 245, 235);  
  rect(200, 185, 100, 150);
  
  // shirt decoration
    fill(176, 208, 168);
    triangle(220,320,250,220,280,320)

  // Right Arm
  strokeWeight(10);
  fill(245, 245, 235);
  rect(300, 195, 50, 10);

  // Left Arm
  strokeWeight(10);
  rect(150, 195, 50, 10);

  // Left Leg
  strokeWeight(10);
  rect(200, 335, 10, 50);

  // Right Leg
  strokeWeight(10);
  rect(290, 335, 10, 50);

  // Signature
  strokeWeight(0)
fill(0);  // Black color for text
  textSize(22)
text("Fiona Davia", 270, 500);
}