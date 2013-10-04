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
background.src = 'assets/img/background03.jpg';

//set menu 1200*1200px
var menu = new Image()
menu.src = '';

//set Player
var playerImg = new Image();
playerImg.src = 'assets/img/player_right.png'

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
  bgLayers = new BgLayers();
  objects = initializeObjects();
  
  gameOn = true;
  gameLoopStart();
  //document.addEventListener('click', mouseClicked, false);
}

function initializeObjects(){
  objects = [];
  objects.push( new Object(180, 120) );
  objects.push( new Object(200, 100) );
  objects.push( new Object(200, 120) );
  objects.push( new Object(220, 120) );

  return objects;
}


function drawMenu() {
  ctxBg.drawImage(menu, 0, 0, 414+200, 252, 0, 0, gameWidth, gameHeight);
}

function gameLoopStart(){
  if(gameOn){
    //draw background
    bgLayers.draw();
    //draw player
    player.draw();
    //draw objects
    clearCtxObject();
    for(i in objects){
      objects[i].draw();
    }

    requestAnimFrame(gameLoopStart);
  }
}

function gameLoopStop(){
  gameOn = false
}

//Helpers

function checkKeyDown(e){
  //check keyCode
  if (e.keyCode == 32){ //spaceBar
    player.jumping = true;
    e.preventDefault();
  }
}


function checkKeyUp(e){
  //check keyCode
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
  mouseX = e.pageX - canvasBg.offsetLeft;
  mouseY = e.pageY - canvasBg.offsetTop;
}