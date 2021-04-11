//Canvas
var canvas = document.getElementById("gameCanvas");
var welcome = document.getElementById("starter");
var test = document.getElementById("test");
var ctx = canvas.getContext("2d");
var acc_available = true;
var canvas_height = 0;
var canvas_width = 0;



//Game Variables
var posx = canvas.width/2;
var posy = canvas.height-30;


//Get Page Size when Page is loaded
window.onload = getPageSize();

function getPageSize(){
	canvas_height = window.innerHeight - (window.innerHeight/10);
	canvas_width = canvas_height/2;
	document.getElementById("test").innerHTML = canvas_height;
}

// Start Game
function main() {
	welcome.hidden = true;
	canvas.height = canvas_height;
	canvas.width = canvas_width;
	testAcc();
  	window.ondeviceorientation = deviceOrientationController();
}


function drawMonkey(x, y){
	ctx.drawImage(x,y);
}

function testAcc(){
	if(window.DeviceOrientationEvent) {
			acc_available = true;
		}
}


function deviceOrientationController(){
	var gamma = Math.round(event.gamma);  //min -90 max 90
    var x = (gamma / 900) * screen_width;

    document.getElementById("acc").innerHTML = gamma;
    document.getElementById("x").innerHTML = x;

}