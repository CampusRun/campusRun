function Object(spriteX, spriteY, spriteWidth, spriteHeight, proportion,
		heightPerc, offsetXPerc, offsetYPerc, speed){
	//settings
	this.ctx = objectsCtx;
	this.img = objectsSprite;
	this.speed = speed;
	
	this.spriteX = spriteX;
	this.spriteY = spriteY;
	this.spriteWidth = spriteWidth;
	this.spriteHeight = spriteHeight;
	this.proportion = proportion;
	this.heightPerc = heightPerc;
	this.offsetXPerc = offsetXPerc;
	this.offsetYPerc = offsetYPerc;
	Object.remainObjects = [];
	
	
	//OnCnvsProperties
	this.posX;
	this.posY;
	this.heightOnCnvs;
	this.widthOnCnvs;
	
	this.setOnCnvsProperties();
};

Object.prototype.setOnCnvsProperties = function(){
	this.posX = this.ctx.canvas.width*this.offsetXPerc;
	this.posY = this.ctx.canvas.height*this.offsetYPerc;
	this.heightOnCnvs = this.ctx.canvas.height*this.heightPerc*this.proportion[0];
	this.widthOnCnvs = this.ctx.canvas.height*this.heightPerc*this.proportion[1];		
};

Object.prototype.draw = function(){
	if(this.posX+this.widthOnCnvs > 0) this.addToRemainingObjects();
	else this.removeFromRemainingObjects();

	if(Object.remainObjects.length == 0) afterVictory();
	
	this.posX -= this.speed;
	this.ctx.drawImage(this.img, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight,
			  this.posX, this.posY, this.widthOnCnvs, this.heightOnCnvs);
};

Object.prototype.addToRemainingObjects = function (){
	  if(this.indexInRemainObjects() == -1) Object.remainObjects.push(this);
}

Object.prototype.removeFromRemainingObjects = function() {
  if(this.indexInRemainObjects() >= 0 ) Object.remainObjects.splice(this.indexInRemainObjects(), 1);
}

Object.prototype.indexInRemainObjects = function() {
  return $.inArray(this, Object.remainObjects)
}

Object.prototype.resize = function(){
	this.setOnCnvsProperties();
};


function clearCtxObject(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function Box(heightPerc, offsetXPerc, offsetYPerc, speed){
	//settings
	this.spriteX = 0;
	this.spriteY = 0;
	this.spriteWidth = 88;
	this.spriteHeight = 88;
	this.proportion = [1,1];
	
	this.heightPerc = heightPerc;
	this.offsetXPerc = offsetXPerc;
	this.offsetYPerc = offsetYPerc;

	this.speed = speed;
	
	return new Object(this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.proportion,
			this.heightPerc, this.offsetXPerc, this.offsetYPerc, this.speed);
};

function Block1(heightPerc, offsetXPerc, offsetYPerc, speed){
	//settings
	this.spriteX = 89;
	this.spriteY = 0;
	this.spriteWidth = 44;
	this.spriteHeight = 36;
	this.proportion = [1,1];

	this.speed = speed;
	
	return new Object(this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight,  this.proportion,
			this.heightPerc, this.offsetXPerc, this.offsetYPerc, this.speed);
};



function Block2(heightPerc, offsetXPerc, offsetYPerc, speed){
	//settings
	this.spriteX = 134;
	this.spriteY = 0;
	this.spriteWidth = 44;
	this.spriteHeight = 27;
	this.proportion = [3,2];
	
	this.heightPerc = heightPerc;
	this.offsetXPerc = offsetXPerc;
	this.offsetYPerc = offsetYPerc;
	this.speed = speed;
	
	return new Object(this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.proportion,
			this.heightPerc, this.offsetXPerc, this.offsetYPerc, this.speed);
};