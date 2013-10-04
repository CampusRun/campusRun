function Player(){
  
  //anfang bei x=´0 y=33
  //19px breit
  //32 px hoch

  //2te 32px anfang

  //3te 64px

  //src from
  this.srcX = 0;
  this.srcY = 0;
  this.width = 18;
  this.height = 44;
  //draw to
  this.drawX = 80;
  this.drawY = 80;

  //settings
  this.lifes = 3;

  this.baseLineY = 140;
  this.falling = false;
  this.jumping = false;
  this.jumpSpeed = 2;
  this.jumpPower = 25;

  this.jumpHeight = this.baseLineY - 80;

  this.frames = 0;
}

Player.prototype.draw = function(drawX, drawY){
  clearCtxPlayer();

  if(this.drawX <= 0){
    if(this.lifes <= 1){ 
      gameLoopStop();
      alert("You Loose, you Suck! :D");
      location.reload();
    }
    else {
      this.lifes -= 1;
      this.drawX = 80;
    }
  }

  //Jumping Animation
  if(this.jumping){

    if( (this.falling && !playerCollisionY(this) ) || (this.drawY <= this.jumpHeight)){ //falling
      if(this.drawY + this.height >= this.baseLineY){ //landed on the ground
        this.falling = false;
        this.jumping = false;
        this.jumpHeight = this.baseLineY - 80; 
      } else { //still falling
        this.falling = true;
        this.drawY += this.jumpSpeed;
      }
    } else if (!this.falling) { //jumping
      this.drawY -= this.jumpSpeed;
    } else { //Y Collision
      this.jumping = false;
      this.falling = false;
      this.jumpHeight = this.drawY - this.jumpPower;
    }
  }else if( !playerCollisionY(player) ) {
    if(this.drawY+this.height < this.baseLineY){
      this.drawY += this.jumpSpeed;
    } else if (this.drawY+this.height == this.baseLineY) this.jumpHeight = this.baseLineY - 80;
  } 
  
  //X Collision
  if( hittedObj = playerCollisionX(player) ){
    this.drawX = hittedObj.drawX - player.width; 
  }

  //Runnung Animation
  this.frames += 1;
  if(this.frames > 4){ this.srcX += 18; this.frames = 0; }
  if(this.srcX >=  72) this.srcX = 0;

  ctxPlayer.drawImage(playerImg, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.currentLifes = function() {
  return this.lifes;  
}

function playerCollisionX(playerObj) {
  for(i in objects){
    otherObj = objects[i];
    if( player.drawY+player.height > otherObj.drawY ){
      if( playerObj.drawX+playerObj.width >= otherObj.drawX){
        if( !(playerObj.drawX >= otherObj.drawX+otherObj.drawWidth) ){    
          return otherObj;
        }
      }
    }
  }
  return false
}

function playerCollisionY(playerObj){
  for(i in objects){
    otherObj = objects[i];
    if( (playerObj.drawX >= otherObj.drawX &&
          !(player.drawX >= otherObj.drawX+otherObj.drawWidth ) 
        ) 
      || (playerObj.drawX+playerObj.width >= otherObj.drawX &&
          !(player.drawX >= otherObj.drawX+otherObj.drawWidth ) 
        ) 
      ){
      
      if( playerObj.drawY+playerObj.height >= otherObj.drawY ){
        return otherObj;
      }
    }
  }
  return false
}

function clearCtxPlayer() {
  ctxPlayer.clearRect(0,0, 1000, 500);
}