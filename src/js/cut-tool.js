var cutTool = function(canvas){
	this.canvasImg = canvas
	this.canvas = document.createElement('canvas');
	this.canvas.width = canvas.width;
	this.canvas.height = canvas.height;
	this.canvas.id = "cut-tool"
	this.canvas.style.position = "absolute";
	this.canvas.style.top = canvas.offsetTop+"px";
	this.canvas.style.left = canvas.offsetLeft+"px";
	canvas.parentElement.style.position = "relative";
	canvas.parentElement.appendChild(this.canvas);
	this.ctxImg = canvas.getContext('2d');
	this.ctx = 	this.canvas.getContext('2d');
}

cutTool.prototype.enableSelect = function(){
	var that = this;
	this.mouseDown = false;
	this.raf(this);
	this.canvas.addEventListener("mousedown",function(e){		
		that.ctx.beginPath();	
		that.ctx.lineWidth = 3;
		that.ctx.lineJoin = 'round';
		that.ctx.strokeStyle = "#0ff";		
		that.ctx.moveTo(e.offsetX,e.offsetY);
		that.mouseDown = true;
	});

	this.canvas.addEventListener("mousemove",function(e){
		that.x = e.offsetX;
		that.y = e.offsetY;
		that.mouseMove = true;
	});
	this.canvas.addEventListener("mouseup",function(e){
		that.mouseDown = false;
	});
}

cutTool.prototype.disableSelect = function(){
	
}

cutTool.prototype.cutImage = function(){
	var imgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
	var imgDataImg = this.ctxImg.getImageData(0,0,this.canvas.width,this.canvas.height);

	for(var i=0;i<imgData.data.length;i+=4){
		if(imgData.data[i] === 0 &&
		   imgData.data[i+1] === 255 &&
		   imgData.data[i+2] === 255){
			imgDataImg.data[i+10] = 0;
			imgDataImg.data[i+11] = 100;
			imgDataImg.data[i+12] = 0;
		}
	}
	this.ctxImg.putImageData(imgDataImg,0,0);
}

cutTool.prototype.raf = function(that){
	that.rafId = window.requestAnimationFrame(function(){
		that.raf(that);		
	});
	
	if(that.mouseDown && that.mouseMove){
		
		that.ctx.lineTo(that.x,that.y);
		that.ctx.stroke();
	}else if(that.mouseDown === false){
		that.ctx.fillStyle = "#0ff";	
		that.ctx.fill();
		that.ctx.closePath();
		that.cutImage();
	}	
}

