//Canvas
var canvas = document.getElementById("gameCanvas");
var welcome = document.getElementById("starter");
var ctx = canvas.getContext("2d");
var acc_available = true;
var canvas_height = 0;
var canvas_width = 0;
var refreshIntervalId = 0;
var topmargin = 0;

//Game Variables
var posx = 0;
var posy = 0;
var width = 0;
var height = 0;
var difficulty = 0;
var score = 0;

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


//Load Pictures and get Page Size when loading
window.onload = loadInputs();

function loadInputs(){
  	bananaImg.src = "media/banana.png";
  	monkeyImg.src = "media/happy_monkey.png";
	canvas_height = Math.round(window.innerHeight - (window.innerHeight/10));
	canvas_width = Math.round(canvas_height/2);
	width = Math.round(canvas_width/5);
	height = 10;
	topmargin = Math.round(canvas_height/35);
}

// Start Game
function main() {
	if(refreshIntervalId != 0){
		clearInterval(refreshIntervalId);
	}
	welcome.hidden = true;
	document.getElementById("start").innerHTML = "Restart";
	canvas.height = canvas_height;
	canvas.width = canvas_width;

	window.addEventListener("deviceorientation", function(event) {
		gamma = event.gamma;
	}, true);

	score = 0;
	setupRound(10);
}

//Resetting Objects and Starting Round
function setupRound(diff){
	posx = Math.round((canvas_width/2) - (width/2));
	posy = Math.round(canvas_height - 20);
	for (var i = 0; i < monkeys.length; i++) {
  		var randomPlacement = Math.floor((Math.random() * (canvas_width-width)) + 1);
  		monkeys[i][0] = randomPlacement;
  		monkeys[i][1] = (i*width)+topmargin+10;
  		monkeyShow[i] = true;
	}
	bananax = posx;
	bananay = posy;
	difficulty = diff;
	refreshIntervalId = setInterval(draw, 10);
}


//Checks if each monkey has been shot
function checkWinCondition(){
	for (var i = 0; i < monkeys.length; i++) {
		if(monkeyShow[i]){
			return false;
		}
	}
	return true;
}

//Checks if monkey touched the ground
function checkLossCondition(){
	for (var i = 0; i < monkeys.length; i++) {
		if(monkeyShow[i] && monkeys[i][1]+width > posy){
			return true;
		}
	}
	return false;
}


// Drawing Part
function draw() {

    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawScore();
    drawLead();
    drawBananas();
    drawMonkeys();

    checkCollision();
    detectMovement();
    if(checkWinCondition()){
		clearInterval(refreshIntervalId);
		setupRound(Math.round(difficulty/2));
    }
    if(checkLossCondition()){
    	drawGameOver();
    	clearInterval(refreshIntervalId);
    }

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

function drawScore(){
	ctx.fillStyle = "black";
	ctx.font = "bold " + topmargin + "px Helvetica";
	ctx.fillText("Score:" + score, topmargin, topmargin);
}

function drawGameOver(){
	ctx.clearRect(0, 0, canvas_width, canvas_height);
	ctx.fillStyle = "black";
	ctx.font = "bold " + Math.round(topmargin*2.7) + "px Helvetica";
	ctx.fillText("Game Over!", topmargin, canvas_height/2);
	ctx.fillText("Score: " + score, topmargin, (canvas_height/2 + (Math.round(topmargin*2.7))));

}

function checkCollision(){
	for (var i = 0; i < monkeys.length; i++) {
		middlex = bananax+(width/2);
		middley = bananay+(width/2);
		if(monkeyShow[i] && inBetween(middlex, monkeys[i][0], width) &&  inBetween(middley, monkeys[i][1], width)){
			monkeyShow[i] = false;
			bananaOnScreen = false;
			score += 1;
		}
	}
}


function inBetween(item, edge, length){
	if((item > edge) && (item < (edge+length))){
		return true;
	}
	return false;
}


// File Upload Handler
const file_uploader = document.getElementById("fileupload");
document.getElementById("btnfileupload").addEventListener("click", getPicture);

function getPicture() {
	file_uploader.click();
}

file_uploader.addEventListener('change', (e) => changeImage(e.target.files));

function changeImage(fileList) {
	var start_picture = document.getElementById("monkeyStart");
	let file = null;

	for (let i = 0; i < fileList.length; i++) {
	  if (fileList[i].type.match(/^image\//)) {
	    file = fileList[i];
	    break;
	  }
	}

	if (file !== null) {
		newImage = URL.createObjectURL(file);
		start_picture.src = newImage;
		monkeyImg.src = newImage;
	}
}


// Input Event Handler
function detectMovement(){
	if(gamma < 0){
		leftPressed = true;
		rightPressed = false;
	}else if(gamma > 0){
		rightPressed = true;
		leftPressed = false;
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