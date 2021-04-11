//Canvas
var canvas = document.getElementById("gameCanvas");
var welcome = document.getElementById("starter");
document.getElementById("test").innerHTML = false;
var ctx = canvas.getContext("2d");
var acc_available = true;
var canvas_height = 0;
var canvas_width = 0;

//Game Variables
var posx = 0;
var posy = 0;
var width = 0;
var height = 0;
var rightPressed = false;
var leftPressed = false;
var bananaImg = new Image();
var monkeyImg = new Image();
var bananax = 0;
var bananay = 0;
var clockCounter = 0;


//Get Page Size when Page is loaded
window.onload = loadInputs();

function loadInputs(){
	  
  	bananaImg.src = "media/banana.png";
  	monkeyImg.src = "media/happy_monkey.png";
	canvas_height = window.innerHeight - (window.innerHeight/10);
	canvas_width = canvas_height/2;
	width = canvas_width/6;
	height = 10;
	posx = (canvas_width/2) - (width/2);
	posy = canvas_height - 20;
}

// Start Game
function main() {
	welcome.hidden = true;
	canvas.height = canvas_height;
	canvas.width = canvas_width;
	testAcc();
  	window.ondeviceorientation = deviceOrientationController();
  	setInterval(draw, 10);
}


// Drawing Part
function draw() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawLead();
    drawBananas();

    if(rightPressed) {
        posx += 1;
        if (posx + width > canvas_width){
            posx = canvas_width - width;
        }
    }
    else if(leftPressed) {
        posx -= 1;
        if (posx < 0){
            posx = 0;
        }
    }

  	clockCounter += 1;
}


function drawLead() {
    ctx.beginPath();
    ctx.rect(posx, posy, width, height);
    ctx.fillStyle = "#323232";
    ctx.fill();
    ctx.closePath();
}

function drawBananas() {
	if(clockCounter == 100){
		bananax = posx;
		bananay = posy;
		clockCounter = 0;
	}

	bananay -= 5;
	ctx.drawImage(bananaImg, bananax, bananay, width, width);
	
	
}


function drawMonkey(x, y){
	ctx.drawImage(x,y);
}







// Event Handlers
function testAcc(){
	if(window.DeviceOrientationEvent) {
			acc_available = true;
		}
}

function deviceOrientationController(){
	var gamma = Math.round(event.gamma);  //min -90 max 90
    var x = (gamma / 900) * canvas_width;

    document.getElementById("acc").innerHTML = gamma;
    document.getElementById("x").innerHTML = x;

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false;
    }
}