function Player(){
  //src from
  this.srcX = 0;
  this.srcY = 0;
  this.width = 48;
  this.height = 48;
  //draw to
  this.drawX = 80;
  this.drawY = 95;

  //settings
  this.speed = 2;
  this.jumpHeight = 30;
  this.jumpHangTime = 0.5;
  this.fallMultiplyer = 1.5;
  this.jumpSinWavePos = 0;
  this.jumpSinWaveSpeed = 20;

  this.spaceBar = false;
  this.leftKeyPressed = false;
  this.rightKeyPressed = false;

  this.frames = 0;
}

Player.prototype.draw = function(drawX, drawY){
  clearCtxPlayer();
  this.frames += 1;
  var playerImg = playerRight;
  var dt = 0.004;
  if(this.spaceBar){ //jump Animation
    // the last position on the sine wave
    var lastHeight = this.jumpSinWavePos;
    // the new position on the sine wave
    this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;

    // we have fallen off the bottom of the sine wave, so continue falling
    // at a predetermined speed
    if (this.jumpSinWavePos >= Math.PI){
      this.drawY = 95;
      this.jumpSinWavePos = 0;
      this.spaceBar = false;//this.jumpHeight / this.jumpHangTime * this.fallMultiplyer * dt;
    }
    // otherwise move along the sine wave
    else
      this.drawY -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
  }

  if (this.leftKeyPressed){
    playerImg = playerLeft;
    if(this.frames > 3){ this.srcX += 48; this.frames = 0; }
    if(this.srcX >=  576) this.srcX = 0;
    player.drawX -= player.speed;
  }

  if (this.rightKeyPressed){
    playerImg = playerRight;
    if(this.frames > 3){ this.srcX += 48; this.frames = 0; }
    if(this.srcX >=  576) this.srcX = 0;
    player.drawX += player.speed;
  }

  //collision
  //console.log(this.drawX+this.width, this.drawY+this.height)
  //console.log(object.drawX, object.drawY)


  //drawing
  ctxPlayer.drawImage(playerImg, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
  //ctxPlayer.drawImage(playerImg, this.srcX, this.srcY, 43, 48, 100, 104, 43, 48);
};


function clearCtxPlayer() {
  ctxPlayer.clearRect(0,0, 1000, 500);
}