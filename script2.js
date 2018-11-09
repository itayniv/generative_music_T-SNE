
let tsneData = {};
let width = window.innerWidth;
let height = window.innerHeight;
let sample = new Audio();
let mouseThreshold = 20;

// d3.json("data/audiotsne.json", function(data) {
//
// });

sample.src = './data/newLiveRan4.wav'

let dataArray = [];

// let ranX = d3.randomUniform(0,width);



function normalize(){
  for (var x in tsneData){
    dataArray.push(  {x: (tsneData[x].point[0] * width) , y: (tsneData[x].point[1] * height), l: tsneData[x].path, r: 5} );

  }
  // console.log('data array is ', dataArray[i]);
}






// let svg = d3.select ("body ").append("svg");
//
// svg.attr("width", width).attr("height", height);
//
// let chartGroup = svg.append("g");
//
// chartGroup.selectAll("circle")
// .data(dataArray)
// .enter()
// .append("circle")
// .attr("cx", dataArray['x'])
// .attr("cy", dataArray['y'])
// .attr("r", dataArray['r'])
// .on('mouseover',handleMouseOver)
// .transition()
// .attr("cx", function (d){
//   return d.x
// })
// .attr("cy", function (d){
//   return d.y
// })
// .attr("r", function (d){
//   return d.r
// })


function handleMouseOver() {  // Add interactivity
  console.log('mouseOver');
  sample.play();
  // Use D3 to select element, change color and size
  // d3.select(this).attr({
  //   r: r*5
  // });
}





//
// fetch('data/audiotsne.json')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(tsneJson) {
//     // console.log(JSON.stringify(tsneJson));
//     // console.log(tsneJson);
//     tsneData = tsneJson;
//   })
//   .then(function(){
//     normalize(tsneData);
//     console.log("here");
//   })
//   .then(function(){
//     draw();
//   });



function setup() {
  createCanvas(width, height);
  background(255);
  // capture = createCapture(VIDEO);
  // capture.size(320, 240);
  // capture.hide();
}
//
// function draw() {
//   fill(90,90, 200,200);
//   noStroke();
//   console.log("draw the things!")
//
//   if (dataArray){
//     for (var i in dataArray){
//       ellipse(dataArray[i]['x'],dataArray[i]['y'],dataArray[i]['r']);
//     }
//   }
//
//   noLoop();
//
// }




window.addEventListener('resize', function(){
  width = window.innerWidth;
  height = window.innerHeight;
})

////// --->

let soundCircleArr = [];
// var bugs = []; // array of SoundEllipse objects

function setup() {
  createCanvas(width, height);


  // fetch and
  fetch('data/audiotsne.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(tsneJson) {
    // console.log(JSON.stringify(tsneJson));
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
        console.log("push!");
      }
    }
  });
}

function draw() {
  background(255, 255, 255);

  fill(90,90, 200,200);
  noStroke();
  // noLoop();

  for (var i=0; i<soundCircleArr.length; i++) {
    // soundCircleArr[i].move();
    soundCircleArr[i].display();
    // soundCircleArr[i].hover();


  }
}

// SoundEllipse class
function SoundEllipse(i) {

  this.x = dataArray[i]['x'];
  this.y = dataArray[i]['y'];
  this.diameter = dataArray[i]['r'];
  this.link = dataArray[i]['l'] ;

  // this.move = function() {
  //   this.x += random(-this.speed, this.speed);
  //   this.y += random(-this.speed, this.speed);
  // };
  //
  // this.hover = function(){
  //   if()
  // }

  this.display = function() {
    ellipse(this.x,this.y,this.diameter);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function mouseMoved(){

  for (var i = 0; i < soundCircleArr.length; i++) {
    var d = int(dist(mouseX, mouseY, soundCircleArr[i].x,soundCircleArr[i].y));

    if (d < mouseThreshold){
      // console.log("trigger " , i)
      let link = soundCircleArr[i].link;
      let sample = new Audio();
      sample.src = link;
      sample.play();

    }
  }

}
