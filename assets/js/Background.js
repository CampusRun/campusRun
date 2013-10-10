function Background(ctx, img)
{
	//Default settings
	this.ctx = ctx;
	this.img = img;
	this.frames = 500; //number of frames for scrolling canvas-width
	this.lifeImg = lifeImg;
	
	this.speed = this.ctx.canvas.width/this.frames;	
	this.offset = 0;
	
	//OnCnvsProperties
	this.widthOnCnvs;
	this.heightOnCnvs;
	this.noImages;
	
	Background.prototype.draw = function()
	{
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (var i=0; i <= this.noImages; i++) 
		{
			this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,
						 (i*this.widthOnCnvs)-this.offset, 0, this.widthOnCnvs, this.heightOnCnvs);			
		};
		this.offset = (this.offset > this.widthOnCnvs) ? 0 : this.offset+this.speed;
		
		for(var i=1; i < player.currentLifes() + 1; i++){
			this.ctx.drawImage(this.lifeImg, 0, 0, this.lifeImg.width, this.lifeImg.height, 10*i+i*40, 5,
					0.05*this.widthOnCnvs, 0.25*this.heightOnCnvs);
		}
	}

	Background.prototype.resize = function (){
		this.widthOnCnvs = (this.ctx.canvas.height/this.img.height)*this.img.width;
		this.heightOnCnvs = this.ctx.canvas.height;
		this.noImages = Math.ceil(this.img.width/this.ctx.canvas.width);	
	}
}