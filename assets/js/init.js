//Canvas
backgroundCnvs = document.getElementById('background');
objectsCnvs = document.getElementById('objects');
playerCnvs = document.getElementById('player');

//Context
backgroundCtx = backgroundCnvs.getContext('2d');
objectsCtx = objectsCnvs.getContext('2d');
playerCtx = playerCnvs.getContext('2d');

//Images
preloadArray = new Array();

backgroundImg = new Image();
backgroundImg.src = '../img/background.png';
playerImg = new Image();
playerImg.src = '../img/player.png';
objectsSprite = new Image();
objectsSprite.src = '../img/objectsSprite.png'
lifeImg = new Image();
lifeImg.src = '../img/life.png'

preloadArray.push(backgroundImg, playerImg, objectsSprite, lifeImg);

//Functions
function init()
{
	resizeCanvases();
	background = new Background(backgroundCtx, backgroundImg);
	
	level = ( (RegExp('level' + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] ) || 1;
	console.log(level);
	
	//level = 1;
	readXml(level);
	player = new Player(playerCtx, playerImg, 0.3, 0.2, 0.1, objects, 4);
	
	gameOn = false;
	background.draw();
	$("#start_dialog").dialog({
	    title: "Wilkommen im "+level+" Level",
	    buttons: {
	      Skip: function () {
	          $(this).dialog("close");
	          //startTime = new Date();
	          gameOn = true;
	          onlyBgFlag = false;
	          play();
	      } 
	    }
	  });
}

function readXml(level){
	objects = [];
	if(typeof xmlDoc != 'undefined'){
	    console.log("xml kann gelesen werden!")
		xmlLevel = $(xmlDoc).find("level#"+level)
	    $("#start_dialog").html(xmlLevel.find("description").text())
	    xmlLevel.find("enemylist").children().each(function(){
	      var xCord = $(this).attr("drawX")
	      var yCord = $(this).attr("drawY")
	      var heightPerc = $(this).attr("heightPerc")
	      var enemyType = $(this).attr("type")
	      eval("var obj = new "+enemyType+"("+heightPerc+","+xCord+","+yCord+")")
	      objects.push( obj );
	    });
	  }else{ //Development mode
		console.log("xml konnte nicht gelesen werden")
		  //$("#start_dialog").html("Lorem ipsum...!!")
		objects.push( new Block2(0.1, 0.8, 0.6) );
		objects.push( new Box(0.1, 0.5, 0.8) );
		objects.push( new Box(0.1, 0.53, 0.8) );
	  }
	
}

function resizeCanvases()
{
	var canvasList = document.getElementsByTagName('canvas');
	for (var i=0; i < canvasList.length; i++) 
	{	
		canvasList[i].width = canvasList[i].parentNode.clientWidth;
		canvasList[i].height = canvasList[i].parentNode.clientHeight;
	};
}

function play()
{
	if(gameOn){
		background.draw();
		player.draw();
		clearCtxObject(objectsCtx);
		for(i in objects){
			objects[i].draw();
		}
		requestAnimationFrame(play);
	}else if(onlyBgFlag){
		background.draw();
		requestAnimationFrame(play);
	}
}
function stopPlay(){
	gameOn = false;
}
function afterVictory(){
	gameOn = false;
	onlyBgFlag = true;
	//statistics
	remainingLifes = player.currentLifes();
	$("#finish_dialog #yourLifes").html(remainingLifes	)
	//get player Data
	$("#finish_dialog").dialog({
		title: "Du hast gewonnen!",
		buttons: { 
      Ok: function() {
          playername = $("#name").val()
          $(this).dialog("close");
          // Send Data only if Ok is cklicked  
          //build Json Object
          jsonData = {'playername': playername, 'lifes': remainingLifes, 'level': level};
          //request to Server
          var jqueryXHR = $.ajax({
        	type: "GET",
            url: "http://campusrun.connectiv.info/statistics.php",
            data: jsonData,
            dataType: "json",
            error: function(XHR, status, error){
              console.log("error")
              console.log(XHR)
              console.log(status)
              console.log(error)
            },
            success: function() {
              console.log("success")
            },
            complete: function() {
              console.log("complete")
              url = window.location.href
              if(url.search("level=") >= 0){
                //replace level parameter
                appearance = url.search("level=")
                url = url.replace(url.charAt(appearance+6), parseInt(level)+1)
              }else {
                //no level parameter given. Set one
                url += "?level="+ (parseInt(level)+1)
              }
              window.location.href = url
            }
          });
      },
      Cancel: function () {
          $(this).dialog("close");
      }
    }
  });
}

function preloadImages(images, callback)
{
	remaining = images.length;
	for (var i=0; i < remaining; i++) {
		images[i].onload = function() 
		{
			--remaining;
			if(remaining <= 0)
			{
				callback();
			}
		}
	};
}

//EventListener
window.onresize = function() 
{
	resizeCanvases();
	background.resize();
	//player.resize();
	for(i in objects){
		objects[i].resize();
	}
}

$(document).ready(function(){
	console.log("xml wird versucht zu lesen:")
	
//	xmlhttp = new XMLHttpRequest();
//  xmlhttp.open("GET","../xml/game.xml",false);
//  xmlhttp.send();
//  xmlDoc = xmlhttp.responseXML;
    //console.log(xmlDoc);
    preloadImages(preloadArray, init);
//    init();
}); 

//RequestAnimationFrame
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame)
	window.requestAnimationFrame = function(callback, element) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	timeToCall);
	lastTime = currTime + timeToCall;
	return id;
	};
	if (!window.cancelAnimationFrame)
	window.cancelAnimationFrame = function(id) {
	clearTimeout(id);
	};
	}());