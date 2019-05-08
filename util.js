function createWalls() {
  // for (let i = 0; i < 10; i++) {
  //   walls.push(new Boundary(
  //     random(width), random(height),
  //     random(width), random(height)));
  // }

  walls.push(new Boundary(
    width / 2 - height * 2 / 8, height / 4 + 50,
    width / 2 + height * 2 / 8, height / 4 + 50));

  walls.push(new Boundary(
    width / 2 + height * 2 / 8, height / 4 + 50,
    width / 2 + height * 2 / 8, height / 4 + height / 8 + 50));
  walls.push(new Boundary(
    width / 2 + height * 2 / 8, height / 4 + height / 8 + 50,
    width / 2 + height / 16, height / 4 + height / 8 + 50));
  walls.push(new Boundary(
    width / 2 + height / 16, height / 4 + height / 8 + 50,
    width / 2 + height / 16, height / 4 + height / 8 + height / 3 + 50));

  walls.push(new Boundary(
    width / 2 + height / 16, height / 4 + height / 8 + height / 3 + 50,
    width / 2 - height / 16, height / 4 + height / 8 + height / 3 + 50));

  walls.push(new Boundary(
    width / 2 - height / 16, height / 4 + height / 8 + height / 3 + 50,
    width / 2 - height / 16, height / 4 + height / 8 + 50));
  walls.push(new Boundary(
    width / 2 - height / 16, height / 4 + height / 8 + 50,
    width / 2 - height * 2 / 8, height / 4 + height / 8 + 50));
  walls.push(new Boundary(
    width / 2 - height * 2 / 8, height / 4 + height / 8 + 50,
    width / 2 - height * 2 / 8, height / 4 + 50));

    
  walls.push(new Boundary(300, 300, 500, 100));
  walls.push(new Boundary(width - 300, height - 300, width - 500, height - 100));
  walls.push(new Boundary(width - 300, 300, width - 500, 100));
  walls.push(new Boundary(300, height - 300, 500, height - 100));


  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  getWallsInstersections();
}

function getWallsInstersections() {
  for (let wall1 of walls) {
    for (let wall2 of walls) {
      if (wall1 != wall2) {
        const p = wall1.hasIntersection(wall2);
        if (p) {
          if (isUnique(p))
            wallsIntersect.push(p);
        }
      }
    }
  }
}

function isUnique(p) {
  for (let wI of wallsIntersect) {
    if (p5.Vector.dist(p, wI) < 0.0001)
      return false;
  }
  return true;
}