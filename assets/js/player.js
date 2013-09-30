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
  this.baseLineY = 140;
  this.falling = false;
  this.jumping = false;
  this.jumpSpeed = 1;
  this.jumpHeight = 100;

  this.frames = 0;
}

Player.prototype.draw = function(drawX, drawY){
  clearCtxPlayer();

  //Jumping Animation
  if(this.jumping){

    if( (this.falling && !playerCollisionY(this, object) ) || (this.drawY <= this.baseLineY - this.jumpHeight)){ //falling
      if(this.drawY + this.height >= this.baseLineY){ //landed on the ground
        this.falling = false;
        this.jumping = false; 
      } else { //still falling
        this.falling = true;
        this.drawY += this.jumpSpeed;
      }
    } else if (!this.falling) { //jumping
      this.drawY -= this.jumpSpeed;
    } else { //Y Collision
      this.jumping = false;
      this.falling = false;
    }
  }else if( !playerCollisionY(player, object) ) {
    if(this.drawY+this.height < this.baseLineY){
      this.drawY += this.jumpSpeed;
    }
  } 
  
  //X Collision
  if( playerCollisionX(player, object) ){
    this.drawX = object.drawX - player.width; 
  }

  //Runnung Animation
  this.frames += 1;
  if(this.frames > 7){ this.srcX += 24; this.frames = 0; }
  if(this.srcX >=  96) this.srcX = 0;

  ctxPlayer.drawImage(playerImg, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

function playerCollisionX(playerObj, otherObj) {
  if( player.drawY+player.height > otherObj.drawY ){
    if( playerObj.drawX+playerObj.width >= otherObj.drawX){
      if( !(playerObj.drawX >= otherObj.drawX+otherObj.drawWidth) ){    
        return true
      }
    }
  }
  return false
}

function playerCollisionY(playerObj, otherObj){
  if( (playerObj.drawX >= otherObj.drawX &&
        !(player.drawX >= otherObj.drawX+otherObj.drawWidth ) 
      ) 
    || (playerObj.drawX+playerObj.width >= otherObj.drawX &&
        !(player.drawX >= otherObj.drawX+otherObj.drawWidth ) 
      ) 
    ){
    
    if( playerObj.drawY+playerObj.height >= otherObj.drawY ){
      return true
    }
  }
  return false
}

function clearCtxPlayer() {
  ctxPlayer.clearRect(0,0, 1000, 500);
}