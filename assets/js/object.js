function Object(srcX, srcY, width, height, drawX, drawY, drawWidth, drawHeight, speed, evil){
  //src from
  this.srcX = srcX;
  this.srcY = srcY;
  this.width = width;
  this.height = height;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = drawWidth;
  this.drawHeight = drawHeight;
  //settings
  this.speed = speed;
  this.evil = evil || false;
}


Object.prototype.draw = function(){
  this.drawX -= this.speed;
  ctxObject.drawImage(objSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight); 
};

function clearCtxObject() {
  ctxObject.clearRect(0,0, 1000, 500);
}

function Box(drawX, drawY){
  this.srcX = 0;
  this.srcY = 0;
  this.width = 88;
  this.height = 88;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 20;
  //settings
  this.speed = 2;

  return new Object(this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight, this.speed)
}



function Block1(drawX, drawY){
  this.srcX = 89;
  this.srcY = 0;
  this.width = 44;
  this.height = 36;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 20;
  //settings
  this.speed = 2;

  return new Object(this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight, this.speed)
}



function Block2(drawX, drawY){
  this.srcX = 134;
  this.srcY = 0;
  this.width = 44;
  this.height = 72;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 40;
  //settings
  this.speed = 2;

  return new Object(this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight, this.speed)
}


function Block3(drawX, drawY){
  this.srcX = 179;
  this.srcY = 0;
  this.width = 72;
  this.height = 44;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 20;
  //settings
  this.speed = 2;

  return new Object(this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight, this.speed)
}


function Fuenf0(drawX, drawY){
  this.srcX = 89;
  this.srcY = 37;
  this.width = 37;
  this.height = 45;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 40;
  //settings
  this.speed = 2;
  this.evil = true;

  return new Object(this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight, this.speed, this.evil)
}