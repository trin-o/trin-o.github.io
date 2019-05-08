class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.rays = [];
        for (let wall of walls) {
            this.rays.push(new Ray(this.pos, wall.a));
            this.rays.push(new Ray(this.pos, wall.a));
            this.rays.push(new Ray(this.pos, wall.b));
            this.rays.push(new Ray(this.pos, wall.b));
        }
        for (let wI of wallsIntersect) {
            this.rays.push(new Ray(this.pos, wI));
        }
        this.accuracy = 0.0001;
    }

    updatePos(x, y) {
        this.pos.set(x, y);
    }

    look() {
        stroke(50, 150, 200, 50);
        fill(50, 150, 200);
        
        strokeWeight(1);
        this.updateRays(walls);

        let hitPoints = [];

        for (let ray of this.rays) {
            let record = Infinity;
            let closest = null;

            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                //  line(this.pos.x, this.pos.y, closest.x, closest.y);
                //  ellipse(closest.x, closest.y, 12);
                hitPoints.push(createVector(closest.x, closest.y));
            }
        }

        hitPoints = this.sortHitPoints(hitPoints);
        noStroke();
        fill(50, 150, 200,80);
        
        beginShape()
        for (let i = 0; i < hitPoints.length; i++) {
            vertex(hitPoints[i].x, hitPoints[i].y);
        }
        endShape(CLOSE);
    }

    updateRays() {
        let i = 0;
        for (i; i < walls.length * 4 - 3; i += 4) {
            this.rays[i].lookAt(walls[i / 4].a, this.accuracy);
            this.rays[i + 1].lookAt(walls[i / 4].a, -this.accuracy);
            this.rays[i + 2].lookAt(walls[i / 4].b, this.accuracy);
            this.rays[i + 3].lookAt(walls[i / 4].b, -this.accuracy);
        }

        for (let j = 0; j < wallsIntersect.length; j++) {
            this.rays[i].lookAt(wallsIntersect[j]);
            i++;
        }
    }

    sortHitPoints(list) {
        let swapped
        let n = list.length - 1
        do {
            swapped = false
            for (let i = 0; i < n; i++) {
                if (this.compareAngles(list[i], list[i + 1])) {
                    const temp = list[i]
                    list[i] = list[i + 1]
                    list[i + 1] = temp
                    swapped = true
                }
            }
        }
        while (swapped)

        return list
    }

    compareAngles(a, b) {

        let angle1 = atan2(this.pos.y - a.y, this.pos.x - a.x);
        let angle2 = atan2(this.pos.y - b.y, this.pos.x - b.x);

        if (angle1 > angle2)
            return true;
        else
            return false;
    }

    draw() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 32);
    }
}