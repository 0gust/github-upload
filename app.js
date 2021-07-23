var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

class Coordinates {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  get xpoint(){
    return this.x;
  }
  get ypoint(){
    return this.y
  }
  set xpoint(point){
    this.x = point;
  }
  set ypoint(point){
    this.y = point;
  }
}

const points = new Coordinates;
/*new Coordinates(0,0), new Coordinates(0.1,0), new Coordinates(0.2,0.1), new Coordinates(0.2,0.2)]*/
points[0].xpoint = 0;
points[0].ypoint = 0;
points[1].xpoint = 0.1;
points[1].ypoint = 0
points[2].xpoint = 0.2
points[2].ypoint = 0.1
points[3].xpoint = 0.2
points[3].ypoint = 0.2


function animatedBSpline(context, points, t) {

  // Draw curve segment
  var ax = (-points[0].x + 3 * points[1].x - 3 * points[2].x + points[3].x) / 6;
  var ay = (-points[0].y + 3 * points[1].y - 3 * points[2].y + points[3].y) / 6;
  var bx = (points[0].x - 2 * points[1].x + points[2].x) / 2;
  var by = (points[0].y - 2 * points[1].y + points[2].y) / 2;
  var cx = (-points[0].x + points[2].x) / 2;
  var cy = (-points[0].y + points[2].y) / 2;
  var dx = (points[0].x + 4 * points[1].x + points[2].x) / 6;
  var dy = (points[0].y + 4 * points[1].y + points[2].y) / 6;
  context.beginPath();
  context.moveTo(
    ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
    ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
  );
  context.lineTo(
    ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx,
    ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy
  );
  context.stroke();

  // Keep going until t = 1
  if (t < 1) requestAnimationFrame(function() {
    animatedBSpline(context, points, t + 0.1);
  });
}

// Kick things off at t = 0
animatedBSpline(context, points, 0);
