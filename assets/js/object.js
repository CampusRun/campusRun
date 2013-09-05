function Object(){
  //src from
  this.srcX = 0;
  this.srcY = 0;
  this.width = 1000;
  this.height = 1000;
  //draw to
  this.drawX = 280;
  this.drawY = 120;

  //settings
  this.speed = 1;
}


Object.prototype.draw = function(){
  clearCtxObject();
  this.drawX -= this.speed;
  ctxObject.drawImage(block, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 20, 20);
  this.recycle(); 
};

Object.prototype.recycle = function () {
  if (this.drawX < 0)  this.drawX = 300;
};

function clearCtxObject() {
  ctxObject.clearRect(0,0, 1000, 500);
}