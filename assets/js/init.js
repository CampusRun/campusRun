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

var lifeImg = new Image();
lifeImg.src = 'assets/img/Bier.png';

//set menu 1200*1200px
var menu = new Image()
menu.src = '';

//set Player
var playerImg = new Image();
playerImg.src = 'assets/img/player_right.png'

//set object
var objSprite = new Image();
objSprite.src = 'assets/img/e_1.png';

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
  level = 1;
  readXml(level);
  
  gameOn = true;
  startTime = new Date();
  gameLoopStart();
  //document.addEventListener('click', mouseClicked, false);
}

function readXml(level){
  objects = [];
  if(typeof xmlDoc != 'undefined'){
    xmlLevel = $(xmlDoc).find("level#"+level)
    lvlFinish = xmlLevel.attr("finish")
    xmlLevel.find("enemylist").children().each(function(){
      var xCord = $(this).attr("drawX")
      var yCord = $(this).attr("drawY")
      var enemyType = $(this).attr("type")
      eval("var obj = new "+enemyType+"("+xCord+","+yCord+")")
      objects.push( obj );
    });
  }else{ //Development mode
    lvlFinish = 300;
    objects.push( new Box(180, 120) );
    objects.push( new Block1(200, 100) );
    objects.push( new Block3(200, 120) );

    objects.push( new Block2(250, 100) );

    objects.push( new Fuenf0(300, 100) );  
  }
  
}

function afterVictory() {
  gameLoopStop();
  //Statistics
  passedTime = $("#clock").html();
  remainingLifes = player.lifes;
  //console.log("Congrats you won within "+passedTime+"seconds with "+remainingLifes+" Lifes left")
  //build Json Object
  jsonData = {'playername': 'Harald Kruel', 'time': passedTime, 'lifes': remainingLifes};
  //console.log(jsonData);
  //request to Server
  var jqueryXHR = $.ajax({
    type: "GET",
    url: "http://campusrun.connectiv.info/statistics.php",
    data: jsonData,//optional
    dataType: "json",
    error: function(XHR, status, error){
      console.log("error")
    },
    success: function() {
      console.log("success")
    }
  });
}


function drawMenu() {
  ctxBg.drawImage(menu, 0, 0, 414+200, 252, 0, 0, gameWidth, gameHeight);
}

function gameLoopStart(){
  if(gameOn){
    var timeNow = new Date();
    var totalSeconds = (timeNow - startTime) / 1000;
    $("#clock").html(totalSeconds)

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