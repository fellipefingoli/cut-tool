"use strict"

//constructor
var CutTool = function(canvas){
	this.canvasImg = canvas
	canvas.parentElement.style.position = "relative";	
	this.ctxImg = canvas.getContext('2d');
}

//public
CutTool.prototype.enableSelect = function(){
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.canvasImg.width;
	this.canvas.height = this.canvasImg.height;
	this.canvas.id = "cut-tool"
	this.canvas.style.position = "absolute";
	this.canvas.style.top = this.canvasImg.offsetTop+"px";
	this.canvas.style.left = this.canvasImg.offsetLeft+"px";
	this.ctx = 	this.canvas.getContext('2d');
	this.canvasImg.parentElement.appendChild(this.canvas);

	this.mouseDown = false;
	this.raf(this);
	var that = this;
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

CutTool.prototype.disableSelect = function(){
	this.canvas.removeEventListener("mousedown");
	this.canvas.removeEventListener("mousemove");
	this.canvas.removeEventListener("mouseup");
	window.cancelAnimationFrame(this.rafId);
	this.canvas.parentElement.removeChild(this.canvas);
	this.canvas = null;
}

CutTool.prototype.cutImage = function(){
	var imgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
	var imgDataImg = this.ctxImg.getImageData(0,0,this.canvasImg.width,this.canvasImg.height);
	this.cutImg = { height: this.canvasImg.height, width: this.canvasImg.width, data: [] };
	for(var i=0;i<imgData.data.length;i+=4){
		if(imgData.data[i] === 0 &&
		   imgData.data[i+1] === 255 &&
		   imgData.data[i+2] === 255){
			this.cutImg.data.push(imgDataImg.data[i],
							 imgDataImg.data[i+1],
							 imgDataImg.data[i+2],
							 imgDataImg.data[i+3]);
			imgDataImg.data[i] = 0;
			imgDataImg.data[i+1] = 0;
			imgDataImg.data[i+2] = 0;
			imgDataImg.data[i+3] = 0;			
		}else{
			this.cutImg.data.push(0,0,0,0);
		}
	}
	this.ctxImg.putImageData(imgDataImg,0,0);
	this.disableSelect();
	return this.cutImg;
}

CutTool.prototype.raf = function(that){
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
	}	
}

