function Background(ctx, imgSpeed, spriteY, spriteCnt)
{
	//Default settings
	this.ctx = ctx;
	this.frames = 500; //number of frames for scrolling canvas-width

	this.img = backgroundSprite;
	this.imgSpeed = (this.ctx.canvas.width/this.frames) * imgSpeed;
	this.spriteY = spriteY;
	this.spriteCnt = spriteCnt;
		
	this.offset = 0;

	this.lifeImg = lifeImg;
	
	//OnCnvsProperties
	this.widthOnCnvs;
	this.heightOnCnvs;
	this.noImages;
	
	Background.prototype.draw = function()
	{
		for (var i=0; i <= this.noImages; i++) 
		{
			this.ctx.drawImage(this.img, 0, this.spriteY, this.img.width, this.img.height/this.spriteCnt,
						 (i*this.widthOnCnvs)-this.offset, 0, this.widthOnCnvs, this.heightOnCnvs);	
		};
		this.offset = (this.offset > this.widthOnCnvs) ? 0 : this.offset + this.imgSpeed;

		//refactoren
		for(var i=1; i < player.currentLifes() + 1; i++){
			this.ctx.drawImage(this.lifeImg, 0, 0, this.lifeImg.width, this.lifeImg.height, 10*i+i*40, 5,
					0.05*this.widthOnCnvs, 0.25*this.heightOnCnvs);
		}
	}

	Background.prototype.resize = function (){
		this.widthOnCnvs = (this.ctx.canvas.height/(this.img.height/this.spriteCnt) )*this.img.width;
		this.heightOnCnvs = this.ctx.canvas.height;
		this.noImages = Math.ceil(this.img.width/this.ctx.canvas.width);	
	}
}

function clearCtxBackground(){
	backgroundCtx.clearRect(0, 0, backgroundCtx.canvas.width, backgroundCtx.canvas.height);
}

function drawAllBackground(bgs){
	clearCtxBackground();
	for(i in bgs){
    bgs[i].draw();
  };
}

function resizeAllBackgrounds(bgs){
	for(i in bgs){
		bgs[i].resize();
	}
}
