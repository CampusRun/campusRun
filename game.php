<!DOCTYPE HTML>
<html>
<head>
<title>HTML5 Game Tryout</title>

<link rel='stylesheet' href='assets/css/init.css'>

<?php 
//Laden aller .js
	foreach(glob("assets/js/*.js") as $file)
	{
     echo '<script type="text/javascript" src="'.$file.'"></script>'."n"; 
 	}
?>

<script type="text/javascript" src='assets/js/button.js'></script>
<script type="text/javascript" src='assets/js/object.js'></script>
<script type="text/javascript" src='assets/js/player.js'></script>
<script type="text/javascript" src='assets/js/bglayers.js'></script>

</head>
<body>
  <button onclick="gameOn=true; gameLoopStart()">Start</button>
  <button onclick="gameLoopStop()">Stop</button>

  <canvas id='canvasBg'></canvas>
  <canvas id='canvasPlayer'></canvas>
  <canvas id='canvasObject'></canvas> 
  
  <script src= 'assets/js/init.js'></script>
</body>
</html>