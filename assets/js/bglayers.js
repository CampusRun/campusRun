function BgLayers(){
  this.commonSrcX = 0;

  this.topSrcY = 0;
  this.topSrcWidth = 5000;
  this.topSrcHeight = 217;
  this.topDrawWidth = 1000;
  this.topDrawHeight = 40;
  this.topDrawX = 0;
  this.topDrawY = 0; 
  this.topSpeed = 0.3;

  this.middleSrcY = 218;
  this.middleSrcWidth = 3000;
  this.middleSrcHeight = 258;
  this.middleDrawWidth = 1024;
  this.middleDrawHeight = 95;
  this.middleDrawX = 0;
  this.middleDrawY = 40; 
  this.middleSpeed = 2;

  this.bottomSrcY = 476;
  this.bottomSrcWidth = 5000;
  this.bottomSrcHeight = 100;
  this.bottomDrawWidth = 1000;
  this.bottomDrawHeight = 15;
  this.bottomDrawX = 0;
  this.bottomDrawY = 135; 
  this.bottomSpeed = 1;

  this.distance = 0;
}

BgLayers.prototype.draw = function() {
  clearCtxBgLayers();
  
  this.distance += 1;
  if (this.distance >= lvlFinish){ //victory
    afterVictory();
  }
  
  this.topDrawX -= this.topSpeed;
  this.middleDrawX -= this.middleSpeed;

  if(this.middleDrawX <= -700) this.middleDrawX = 0;

  ctxBg.drawImage(background, this.commonSrcX, this.topSrcY, this.topSrcWidth, this.topSrcHeight, this.topDrawX, this.topDrawY, this.topDrawWidth, this.topDrawHeight);
  ctxBg.drawImage(background, this.commonSrcX, this.middleSrcY, this.middleSrcWidth, this.middleSrcHeight, this.middleDrawX, this.middleDrawY, this.middleDrawWidth, this.middleDrawHeight);
  ctxBg.drawImage(background, this.commonSrcX, this.bottomSrcY, this.bottomSrcWidth, this.bottomSrcHeight, this.bottomDrawX, this.bottomDrawY, this.bottomDrawWidth, this.bottomDrawHeight);

  for(var i=1; i < currentLifes() + 1; i++){
    ctxBg.drawImage(lifeImg, 0, 0, 600, 600, 10*i+i*5, 5, 30, 30);
  }
};

function currentLifes() {
  return player.currentLifes();
}

function clearCtxBgLayers() {
  ctxBg.clearRect(0,0,1000,500);
}

