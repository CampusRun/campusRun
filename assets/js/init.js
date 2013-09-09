//Canvas Elements
canvasBg = document.getElementById('canvasBg');
canvasPlayer = document.getElementById('canvasPlayer');
canvasObject = document.getElementById('canvasObject');

//Canvas Context
ctxBg = canvasBg.getContext('2d');
ctxPlayer = canvasPlayer.getContext('2d');
ctxObject = canvasObject.getContext('2d');

//Images
//set Background
var background = new Image();
background.src = 'assets/img/sky.jpg';

//set menu 1200*1200px
var menu = new Image()
menu.src = 'assets/img/test.gif';

//set Player
var playerRight = new Image();
playerRight.src = 'assets/img/run_right.png'

var playerLeft = new Image();
playerLeft.src = 'assets/img/run_left.png'

//set object
var block = new Image();
block.src = 'assets/img/block.jpg';

//GameSettings
gameWidth = canvasBg.clientWidth;
gameHeight = canvasBg.clientHeight;

var gameOn;

var requestAnimFrame =  window.requestAnimationFrame ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame ||
                          window.msRequestAnimationFrame ||
                          window.oRequestAnimationFrame ||
                          function(callback){
                            window.setTimeout(callback, 1000/60);
                          };



function init() {
  drawMenu();
  player = new Player();
  gameOn = true;
  playGame();
  document.addEventListener('click', mouseClicked, false)
}


function drawMenu() {
  ctxBg.drawImage(menu, 0, 0, 414+200, 252, 0, 0, gameWidth, gameHeight);
}

function playGame() {
  ctxBg.drawImage(background, 0,0, 1680, 1050, 0, 0, 320, 200);
  object = new Object();
  gameLoopStart();

}

function gameLoopStart(){
  if(gameOn){//draw player
    player.draw();
    //draw objects
    object.draw();

    requestAnimFrame(gameLoopStart);
  }
}

function gameLoopStop(){
  gameOn = false
}

//Helpers

function checkKeyDown(e){
  //check keyCode
  if (e.keyCode == 37) { // 'arrowLeft'
    player.leftKeyPressed = true;
    e.preventDefault();
  }

  if (e.keyCode == 39) { // arrowRight
    player.rightKeyPressed = true;
    e.preventDefault();
  }

  if (e.keyCode == 32){ //spaceBar
    player.spaceBar = true;
    e.preventDefault();
  }
}


function checkKeyUp(e){
  //check keyCode
  if (e.keyCode == 37) { // 'arrowLeft'
    player.leftKeyPressed = false;
    e.preventDefault();
  }

  if (e.keyCode == 38) { // 'arrowUp'
    //player.isJumping = false;
    e.preventDefault();
  }

  if (e.keyCode == 39) { // arrowRight
    player.rightKeyPressed = false;
    e.preventDefault();
  }
}


//eventListener
window.onload = function() {
  init();
}

document.addEventListener('keydown', checkKeyDown, false);
document.addEventListener('keyup', checkKeyUp, false);


window.onresize = function(event) {
  gameWidth = canvasBg.clientWidth;
  gameHeight = canvasBg.clientHeight; 
}


function mouseClicked(e) {
  mouseX = e.pageX -canvasBg.offsetLeft;
  mouseY = e.pageY - canvasBg.offsetTop;
}