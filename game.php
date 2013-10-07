<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<title>HTML5 Game Tryout</title>

<link rel='stylesheet' href='assets/css/init.css'>

<?php 
//Laden aller .js
	foreach(glob("assets/js/game/*.js") as $file)
	{
    echo '<script type="text/javascript" src="'.$file.'"></script>'."\n"; 
 	}
?>

</head>
<body>
  <button onclick="gameOn=true; gameLoopStart()">Start</button>
  <button onclick="gameLoopStop()">Stop</button>


  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <div id="start_dialog" style="display: none"></div>

  <div id="finish_dialog" style="display: none">
    <p>Glückwunsch!</p>
    <p>Deine Zeit: <span id="yourTime">0:00</span></p>
    <p>verbleibende Leben in diesem Level: <span id="yourLifes">3</span></p>
    <p>Gib deinen Namen an:</p>
    <input id="name"></input>
  </div>



  <div id='clock'>0:00</div>
  <canvas id='canvasBg'></canvas>
  <canvas id='canvasPlayer'></canvas>
  <canvas id='canvasObject'></canvas> 
  
  <script src= 'assets/js/init.js'></script>


  <script type="text/javascript">
    
   $(document).ready(function()
   {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","assets/xml/game.xml",false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML; 
   });                
   </script>

</body>
</html>