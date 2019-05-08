var walls = [];
var wallsIntersect = [];
var particle;

var t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  walls = [];
  wallsIntersect = [];
  createWalls();
  particle = new Particle(width / 2, height / 2, walls);
  //noCursor();
}

function draw() {
  background(0);
  // if (mouseX != 0 && mouseY != 0)
  //   particle.updatePos(mouseX, mouseY);
  t += 0.02;
  console.log(t > TWO_PI);

  var xoff = cos(t) + 1;
  var yoff = sin(t) + 1;
  var n = map(noise(xoff, yoff), 0, 1, height / 4, height / 2);
  particle.updatePos(
    width / 2 + cos(t) * (height / 2 - 100),
    height / 2 + sin(t) * (height / 2 - 100)
  );


  particle.look(walls);
  particle.draw();
  for (let wall of walls) {
    wall.draw();
  }
}

function windowResized() {
  setup();
}

document.ontouchmove = function (event) {
  event.preventDefault();
};