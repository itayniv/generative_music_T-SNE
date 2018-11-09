//d3 is a framework essentially to quick select and creat DOM elemnt

let body = d3.select("body");
console.log(body);

body.append("h1").text ("friday");

//these chains always return a selection
//on line 4 the chainreturns the body selection
//when we append element to a selection
//whatever we appended becomes the new selection that is returned
//body.append ("div");
let thediv = body.append ("div");

thediv.append("p").text("this is div");

//d3 also style element let's make a div with a color

let container = body.append("div");

container.style("width", "100px")
.style("height", "50px")
.style("background-color" , "black")

;

body.append("div")
.style("width", "100px")
.style("height", "50px")
.style("background-color" , "red")

;

d3.select("body")
.append("div").style("width", "100px")
.style("height", "50px")
.style("background-color" , "green")
.append("p").text("this is a green box")

;

d3.selectAll("div").style("background-color", "blue")

;

//d3 chains always return a selection(1 or more elements)

let redBox = body.append("div")
.style("width", "100px")
.style("height", "50px")
.style("background-color" , "red")

;


body = d3.select("body")
  body.append("p").text ("first paragraph")
  body.append("p").text ("second paragraph")
  body.append("p").text ("third paragraph")
  body.append("p").text ("fourth paragraph")
  ;

  // lets do svg's
