function Object(drawX, drawY){
  //src from
  this.srcX = 0;
  this.srcY = 0;
  this.width = 1000;
  this.height = 1000;
  //draw to
  this.drawX = drawX;
  this.drawY = drawY;

  this.drawWidth = 20;
  this.drawHeight = 20;
  //settings
  this.speed = 2;
}


Object.prototype.draw = function(){
  this.drawX -= this.speed;
  ctxObject.drawImage(block, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.drawWidth, this.drawHeight);
  this.recycle(); 
};

Object.prototype.recycle = function () {
  if (this.drawX < 0)  this.drawX = 300;
};

function clearCtxObject() {
  ctxObject.clearRect(0,0, 1000, 500);
}