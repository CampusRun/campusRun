//Canvas Elements
canvasBg = document.getElementById('canvasBg');
canvasObject = document.getElementById('canvasObject');

//Canvas Context
ctxBg = canvasBg.getContext('2d');
ctxObject = canvasObject.getContext('2d');

//Images
//set Background
var background = new Image();
background.src = 'assets/img/sky.jpg';

//set menu 1200*1200px
var menu = new Image()
menu.src = 'assets/img/test.gif';

//set object
var block = new Image();
block.src = 'assets/img/block.jpg';

//GameSettings
gameWidth = canvasBg.clientWidth;
gameHeight = canvasBg.clientHeight;

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
  playGame();
  document.addEventListener('click', mouseClicked, false)
}


function drawMenu() {
  ctxBg.drawImage(menu, 0, 0, 414+200, 252, 0, 0, gameWidth, gameHeight);
}

function playGame() {
  ctxBg.drawImage(background, 0,0, 1680, 1050, 0, 0, 320, 200);
  object = new Object();
  gameLoop();

}

function gameLoop(){
  //draw player
  //draw objects
  object.draw();

  requestAnimFrame(gameLoop);
}


//eventListener
window.onload = function() {
  init();
}


window.onresize = function(event) {
  gameWidth = canvasBg.clientWidth;
  gameHeight = canvasBg.clientHeight; 
}


function mouseClicked(e) {
  mouseX = e.pageX -canvasBG.offsetLeft;
  mouseY = e.pageY - canvasBG.offsetTop;
}