//Canvas
var canvas = document.getElementById("gameCanvas");
var welcome = document.getElementById("starter");
var ctx = canvas.getContext("2d");
var acc_available = false;
var margins = 0;
var screen_width = 0;
var screen_height = 0;



//Game Variables
var posx = canvas.width/2;
var posy = canvas.height-30;

function main() {
	welcome.hidden = true;
	testMobile();
	setupCanvas();
	drawMonkey(0,0);
}

function setupCanvas() {

	screen_width = 300;
	screen_height = 500;

	canvas.height = screen_height;
	canvas.width = screen_width;
}

function drawMonkey(x, y){
	ctx.drawImage(x,y);
}

function testMobile(){
	
	if(window.DeviceOrientationEvent) {
			acc_available = true;
		}
}

window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
}

window.addEventListener("deviceorientation", function(event) {
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
}, true);

