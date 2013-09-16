//Layer of Sky Background
function BgLayers(){
  //boden
  //100px höhe
  //5000px breit

  //berge 5000breit
  //258 hoch

  //himmel 5000breit
  //217 hoch

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
  this.middleSrcWidth = 5000;
  this.middleSrcHeight = 258;
  this.middleDrawWidth = 1000;
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
}

BgLayers.prototype.draw = function() {
  clearCtxBgLayers();
  
  this.topDrawX -= this.topSpeed;
  this.middleDrawX -= this.middleSpeed;

  if(this.middleDrawX <= -700) this.middleDrawX = 0;

  ctxBg.drawImage(background, this.commonSrcX, this.topSrcY, this.topSrcWidth, this.topSrcHeight, this.topDrawX, this.topDrawY, this.topDrawWidth, this.topDrawHeight);
  ctxBg.drawImage(background, this.commonSrcX, this.middleSrcY, this.middleSrcWidth, this.middleSrcHeight, this.middleDrawX, this.middleDrawY, this.middleDrawWidth, this.middleDrawHeight);
  ctxBg.drawImage(background, this.commonSrcX, this.bottomSrcY, this.bottomSrcWidth, this.bottomSrcHeight, this.bottomDrawX, this.bottomDrawY, this.bottomDrawWidth, this.bottomDrawHeight);
};

function clearCtxBgLayers() {
  ctxBg.clearRect(0,0,1000,500);
}