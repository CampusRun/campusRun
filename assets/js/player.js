function Player(){
  
  //anfang bei x=´0 y=33
  //19px breit
  //32 px hoch

  //2te 32px anfang

  //3te 64px

  //src from
  this.srcX = 0;
  this.srcY = 0;
  this.width = 24;
  this.height = 60;
  //draw to
  this.drawX = 80;
  this.drawY = 80;

  //settings
  this.baseLine = this.drawY+this.height;
  this.speed = 2;
  this.grounded = true;
  this.jumpHeight = 30;
  this.spaceBar = false;

  this.frames = 0;
}

Player.prototype.draw = function(drawX, drawY){
  clearCtxPlayer();
  /*this.frames += 1;
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
  }*/


  /*if (this.leftKeyPressed){
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
  }*/

  //collision
  //console.log(this.drawX+this.width, this.drawY+this.height)
  //console.log(object.drawX, object.drawY)

  //Jumping Animation
  if(this.spaceBar){
    this.grounded = false;
    if(this.isFalling){
      this.drawY += this.speed;
      
      //grounded
      if(this.drawY + this.height >= this.baseLine) {
        this.grounded = true;
        this.isFalling = false;
        this.spaceBar = false;
      }
    }
    else{
      if(this.drawY <= this.jumpHeight) this.isFalling = true;
      else this.drawY -= this.speed;        
    }
  }

  //Runnung Animation
  this.frames += 1;
  if(this.frames > 7){ this.srcX += 24; this.frames = 0; }
  if(this.srcX >=  96) this.srcX = 0;

  //Collision
  collision(this, object);

  ctxPlayer.drawImage(playerImg, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

function collision(playerObj, otherObj){
  if(playerCollisionX(playerObj, otherObj) && playerCollisionY(playerObj, otherObj)){
    if(!playerObj.grounded){ 
      player.drawY = otherObj.drawY - player.height;
      player.grounded = true;
    }
    else player.drawX = otherObj.drawX - player.width;
  }
}

function playerCollisionX(playerObj, otherObj) {
  if( playerObj.drawX+playerObj.width >= otherObj.drawX){
    if( !(playerObj.drawX >= otherObj.drawX+otherObj.drawWidth) ){    
      return true
    }
  }
  return false
}

function playerCollisionY(playerObj, otherObj){
  //console.log( playerCollisionX(playerObj, otherObj) )
  if( playerCollisionX(playerObj, otherObj) ){
    if( playerObj.drawY+playerObj.height >= otherObj.drawY ){
      return true
    }
  }
  return false
}

function clearCtxPlayer() {
  ctxPlayer.clearRect(0,0, 1000, 500);
}