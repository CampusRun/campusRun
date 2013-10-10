function Player(ctx, img, heightPerc, posXPerc, posYPerc, objects, spriteNum)
{
	this.ctx = ctx;
	this.img = img;
	this.objects = objects;
	this.spriteNum = spriteNum;
	this.posXPerc = posXPerc;
	this.posYPerc = posYPerc;
	this.heightPerc = heightPerc;
	
	//SpriteProperties
	this.framesPerSprite = 8;
	this.spriteCnt = 0;
	this.spriteX = 0;
	this.spriteWidth = this.img.width/this.spriteNum;
	
	
	this.imgWidth = this.img.width;
	this.imgHeight = this.img.height;
	this.cnvsWidth = this.ctx.canvas.width;
	this.cnvsHeight = this.ctx.canvas.height;
	
	//Set initial position
	this.posX = this.cnvsWidth*posXPerc;
	this.posY = this.cnvsHeight-(this.cnvsHeight*(heightPerc+posYPerc));
	this.height = this.cnvsHeight*heightPerc;
	this.width = ((this.height/this.imgHeight)*this.imgWidth)/spriteNum;
	
	//Jump and fall settings
	this.baseLine = this.posY;
	
	this.isJumping = false;
	this.framesPerJump = 40;
	this.jmpFrame = 0;
	this.maxJmpHeight = this.cnvsHeight*0.3 ;
	this.fallRef;
	
	this.isFalling = false;
	this.framesPerFall = 40;
	this.fallFrame = 0;
	this.maxFallHeight;
	this.jmpRef;
	this.lifes = 3;
	this.initialStartX = this.posX;
	this.rebornStartY = this.posY/2;
	
	this.afterYCollision = false;
	this.yCollisionStarted = false;

	
	Player.prototype.draw = function()
	{
		this.ctx.clearRect(0, 0, this.cnvsWidth, this.cnvsHeight);

		//Lifes
		if(this.posX <= 0){
		    if(this.lifes <= 1){ 
		      stopPlay();
		      alert("You Loose :D");
		      location.reload();
		    }
		    else {
		      this.lifes -= 1;
		      this.posX = this.initialStartX;
		      this.posY = this.rebornStartY;
		      this.isFalling = true;
		    }
		  }
		
		//Choose sprite
		if(this.spriteCnt >= this.framesPerSprite)
		{
			this.spriteX = (this.spriteX+this.spriteWidth)%this.img.width;
			this.spriteCnt = 0;
		}
		this.spriteCnt++;
		
		this.reposition();
		if(this.isJumping){this.jump();}
		if(this.isFalling){this.fall();}

		if(this.yCollisionStarted){
			if(!this.collisionY() && !this.isJumping){
				this.afterYCollision = false;
				this.isFalling = true;
				this.yCollisionStarted = false;
			}	
		}
		this.ctx.drawImage(this.img, this.spriteX, 0, this.spriteWidth, this.imgHeight,
			this.posX, this.posY, this.width, this.height);
	}
	
	Player.prototype.jump = function()
	{
		if(this.jmpFrame == 0){this.jmpRef = this.posY;}
		var jmpCnt = ((Math.PI/2)/this.framesPerJump)*this.jmpFrame;
		var jmpHeight = Math.sin(jmpCnt)*this.maxJmpHeight;
		this.posY = this.jmpRef-jmpHeight;
		this.jmpFrame++;
		if(this.jmpFrame > this.framesPerJump)
		{
			this.jmpFrame = 0;
			this.isJumping = false;
			this.isFalling = true;
		}	
	}
	
	Player.prototype.fall = function()
	{
		if(this.fallFrame == 0)
		{
			this.fallRef = this.posY; 
			this.maxFallHeight = this.baseLine-this.posY;
		}
		var fallCnt = ((Math.PI/2)/this.framesPerFall)*this.fallFrame;
		var fallHeight = (Math.cos(fallCnt)-1)*this.maxFallHeight;
		this.posY = this.fallRef-fallHeight;
		this.fallFrame++;
		if((this.fallFrame > this.framesPerFall) || this.collisionY())
		{ 
			this.fallFrame = 0;
			this.isFalling = false;
		}
	}
	
	Player.prototype.collisionX = function()
	{
		for (var i = 0; i < this.objects.length; i++) 
		{
			if(this.posY+this.height-5 > this.objects[i].posY)
			{
				if(this.posX+this.width >= this.objects[i].posX)
				{
					if(!(this.posX >= this.objects[i].posX+this.objects[i].widthOnCnvs))
					{
						return this.objects[i];					
					}
				}
			}
		}
		return false;
	}
	
	Player.prototype.collisionY = function()
	{
		for (var i = 0; i < this.objects.length; i++) 
		{
			if((this.posX >= this.objects[i].posX) && (!(this.posX >= this.objects[i].posX+this.objects[i].widthOnCnvs))
				||
			  (( this.posX+this.width-5 >= this.objects[i].posX) && (!(this.posX >= this.objects[i].posX+this.objects[i].widthOnCnvs))))
			{
				if(this.posY+this.height > this.objects[i].posY)
				{
					this.yCollisionStarted = true;
					return this.objects[i];
				}
			}
		}
		return false;
	}
	
	Player.prototype.reposition = function()
	{
		var collidingObject = this.collisionX();
		this.posX = collidingObject ? (collidingObject.posX-this.width) : this.posX;
	}
	
	Player.prototype.currentLifes = function() {
		return this.lifes;
	}

	Player.prototype.resize = function()
	{
		var cnvsHeight = this.ctx.canvas.height;
		var cnvsWidth = this.ctx.canvas.width;

		//reposition Player
		this.posX = this.ctx.canvas.width*this.posXPerc;
		this.posY = cnvsHeight-(cnvsHeight*(this.heightPerc+this.posYPerc));
		this.height = cnvsHeight*this.heightPerc;
		this.width = ((this.height/this.imgHeight)*this.imgWidth)/this.spriteNum;

		//Reinitialize Settings
		this.baseLine = this.posY;
		this.cnvsWidth = this.ctx.canvas.width;
		this.cnvsHeight = this.ctx.canvas.height;
		this.maxJmpHeight = cnvsHeight*0.3;
	};		
	
	
	//EventListener
	window.onclick = function()
	{
		if(!player.isFalling) player.isJumping = true;
	}

	
//	document.addEventListener('touchstart',function() 
//	{
//		if(!player.isFalling) player.isJumping = true;
//	}, false);

}
