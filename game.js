//Canvas
var canvas = document.getElementById("gameCanvas");
var welcome = document.getElementById("starter");
var ctx = canvas.getContext("2d");
var acc_available = true;
var canvas_height = 0;
var canvas_width = 0;
var refreshIntervalId = 0;

//Game Variables
var posx = 0;
var posy = 0;
var width = 0;
var height = 0;
var difficulty = 0;

var clockCounter = 0;
var rightPressed = false;
var leftPressed = false;
var gamma = 0;

var bananaImg = new Image();
var bananax = 0;
var bananay = 0;
var bananaOnScreen = true;

var monkeyImg = new Image();
var monkeys = [[0,0],[0,0],[0,0],[0,0],[0,0]];
var monkeyShow = [true, true, true, true, true];


//Get Page Size when Page is loaded
window.onload = loadInputs();

function loadInputs(){
  	bananaImg.src = "media/banana.png";
  	monkeyImg.src = "media/happy_monkey.png";
	canvas_height = Math.round(window.innerHeight - (window.innerHeight/10));
	canvas_width = Math.round(canvas_height/2);
	width = Math.round(canvas_width/6);
	height = 10;
}

// Start Game
function main() {
	welcome.hidden = true;
	canvas.height = canvas_height;
	canvas.width = canvas_width;
	testAcc();

	window.addEventListener("deviceorientation", function(event) {
		document.getElementById("acc").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
		gamma = event.gamma;
	}, true);

	setupRound(10);
  	refreshIntervalId = setInterval(draw, 10);
}

function restart() {
	clearInterval(refreshIntervalId);
	setupRound(10);
	refreshIntervalId = setInterval(draw, 10);
}

//Resetting Objects
function setupRound(diff){
	posx = Math.round((canvas_width/2) - (width/2));
	posy = Math.round(canvas_height - 20);
	for (var i = 0; i < monkeys.length; i++) {
  		var randomPlacement = Math.floor((Math.random() * (canvas_width-width)) + 1);
  		monkeys[i][0] = randomPlacement;
  		monkeys[i][1] = (i*width);
  		monkeyShow[i] = true;
	} 
	bananax = posx;
	bananay = posy;
	difficulty = diff;

}


// Drawing Part
function draw() {

    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawLead();
    drawBananas();
    drawMonkeys();

    checkCollision();
    detectMovement();

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
	if(!bananaOnScreen){
		bananax = posx;
		bananay = posy;
		bananaOnScreen = true;
	}

	if(bananay+width < 0){
		bananaOnScreen = false;
	}

	bananay -= 5;
	ctx.drawImage(bananaImg, bananax, bananay, width, width);
}


function drawMonkeys(){
	for (var i = 0; i < monkeys.length; i++) {
		if(monkeyShow[i]){
			if(clockCounter % difficulty == 0){
				monkeys[i][1] += 1;
			}
			ctx.drawImage(monkeyImg, monkeys[i][0], monkeys[i][1], width, width);
		}
	}
}


function checkCollision(){
	for (var i = 0; i < monkeys.length; i++) {
		middlex = bananax+(width/2);
		middley = bananay+(width/2);
		if(monkeyShow[i] && (middlex > monkeys[i][0] && middlex < monkeys[i][0]+width) &&  (middley > monkeys[i][1]) && (middley < monkeys[i][1]+width)){
			monkeyShow[i] = false;
			bananaOnScreen = false;
		}
	}
}
// Event Handlers
function testAcc(){
	if(window.DeviceOrientationEvent) {
			acc_available = true;
		}
}

function detectMovement(){
	if(0 > gamma){
		rightPressed = true;
	}else{
		leftPressed = true;
	}
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