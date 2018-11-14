
let tsneData = {};
let width = window.innerWidth;
let height = window.innerHeight;
// let sample = new Audio();
let mouseThreshold = 10;
let circleSize = 6;
let color = [116,122,220,200];
let colorPlay = [100, 100, 220, 200];
let hovercolor = [204, 102, 0];
let pauseBetweenPlay = 1;
let stopThresh = 1.0;
let currModel = '';
let modelArr = ['/data/randomPoints.json', '/data/favoritethings.json', '/data/edenahbez.json','/data/tomorrow.json'];
let animvar = 0;
let flock;
let mouseDown = false;
let dataArray = [];




function normalize(){
  for (var x in tsneData){
    dataArray.push(  {x: (tsneData[x].point[0] * width) , y: (tsneData[x].point[1] * height), l: tsneData[x].path, r: circleSize} );
  }

}

window.onload = function() {


setTimeout(function(){
  document.getElementById('model01').click();
  console.log("welcome!")
}, 1000);
};


window.addEventListener('resize', function(){
  width = window.innerWidth;
  height = window.innerHeight;
})

////// --->

let soundCircleArr = [];


function fetchJson(url){
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(tsneJson) {
    tsneData = tsneJson;
    // console.log(tsneData);
  })
  .then(function(){
    normalize(tsneData);
  })
  .then(function(){
    var size = Object.keys(tsneData).length;
    if (dataArray){
      for (var i = 0; i < size; i++) {
        soundCircleArr.push(new SoundEllipse(i));
      }
    }
  });
}


function setup() {

  var canvas = createCanvas(width, height);
  canvas.parent('sketch-holder');

  fetchJson('/data/randomPoints.json');

  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 1; i++) {
    var b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function highlightPlayed(ellipseNumber){
  soundCircleArr[ellipseNumber].display = function() {

    var c = map(ellipseNumber, 0, 2000, 0, 100);
    fill(30+c,60+c,150+c, 130);

    ellipse(this.x,this.y,20);

    noFill();
    strokeWeight(2); // Beastly
    stroke(30+c,60+c,150+c, 130,100);
    ellipse(this.x,this.y,25);
  };

  setTimeout(function(){
    soundCircleArr[ellipseNumber].display = function() {
      var c = map(ellipseNumber, 0, 2000, 0, 100);
      fill(30+c,60+c,150+c, 200);

      var m = map(ellipseNumber, 0, 1000, 0, 2);
      ellipse(this.x,this.y,circleSize+m);
    };
  }, 300);
}



function draw() {

  background(240, 239, 238);
  noStroke();
  //Run Boids
  flock.run();


  //update boids distance test
  var flockSize = Object.keys(flock.boids).length;
  for (var j = 0; j < flockSize; j++) {

    //check location and play
    if ((soundCircleArr)){
      for (var i = 0; i < soundCircleArr.length; i++) {
        var d = int(dist(flock.boids[j].position.x, flock.boids[j].position.y, soundCircleArr[i].x,soundCircleArr[i].y));

        if (d < mouseThreshold){
          let link = soundCircleArr[i].link;
          let sample = new Audio();


          highlightPlayed(i);
          sample.src = link;

          if (soundCircleArr[i].playing == false){
            sample.play();
            soundCircleArr[i].playing = true;
            let thisSound = i;
            turnPlayingToFalse(thisSound);
            // stop sample after x seconds
            sample.addEventListener('timeupdate', function() {
              var t = sample.currentTime;
              if (t > stopThresh) {
                sample.pause();
              }
            });
          }
        }
      }
    }
  }

  for (var i=0; i<soundCircleArr.length; i++) {
    soundCircleArr[i].display(circleSize+i/1000);
  }
}



function SoundEllipse(i) {
  this.x = dataArray[i]['x'];
  this.y = dataArray[i]['y'];
  this.diameter = dataArray[i]['r'];
  this.link = dataArray[i]['l'];
  this.playing = false;
  //change Color

  this.display = function(circleDiameter) {
    var c = map(i, 0, 2000, 0, 100);
    fill(30+c,60+c,150+c ,200);

    noStroke();
    var m = map(i, 0, 1000, 0, 2);
    ellipse(this.x,this.y,circleDiameter+m);
    // console.log(circleDiameter)
  };
}


function mousePressed() {
  flock.addBoid(new Boid(mouseX,mouseY));

  // Check if mouse is inside the circle
  // console.log("mouse Down");
  // console.log(mouseX, mouseY);
  // mouseDown = true;
}


function keyPressed() {

  if (keyCode === LEFT_ARROW){
    // console.log("hi");
    flock.popBoid(new Boid(mouseX,mouseY));

  }
}



function mouseReleased(){
  console.log("mouse Released")
  mouseDown= false;

}

function mouseMoved(){
}


function turnPlayingToFalse(currentSound){
  setTimeout(function() {
    soundCircleArr[currentSound].playing = false
  }, 1000);

}



function reply_click(clicked_id)
{
  switch (clicked_id) {
    case "model01":
    dataArray = [];
    soundCircleArr = [];
    currModel = modelArr[0];
    console.log("model01", currModel);
    fetchJson(currModel);
    break;
    case "model02":
    dataArray = [];
    soundCircleArr = [];
    currModel = modelArr[1];
    console.log("model02")
    fetchJson(currModel);
    break;
    case "model03":
    dataArray = [];
    soundCircleArr = [];
    currModel = modelArr[3];
    console.log("model03")
    fetchJson(currModel);
    console.log("03")
    break;
    case "about":
    currModel = modelArr[0];
    console.log("about")
  }
  //
  // console.log("button",clicked_id)
  // if(clicked_id == 'model01'){
  //
  //   console.log(currModel)
  // }

}





/////Flocking

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}


Flock.prototype.popBoid = function(b) {
  this.boids.pop(b);
}





// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.position = createVector(x,y);
  this.r = 3.8;
  this.maxspeed = 5;    // Maximum speed
  this.maxforce = 0.2; // Maximum steering force
}



Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();

}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(3.7);
  ali.mult(1.78);
  coh.mult(0.45);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(220,90,120);
  noStroke();
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*3);
  vertex(-this.r, this.r*1);
  vertex(this.r, this.r*1);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position,boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum,this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0,0);
  }
}
