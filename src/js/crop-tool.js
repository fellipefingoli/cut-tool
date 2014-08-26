"use strict"

//constructor
var CropTool = function(canvas){
	this.canvas = canvas;
	
}

//public
CropTool.prototype.cropArea = function(type){
	this.ctx = this.canvas.getContext('2d');
	var references = types[type](this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height));
	var width = references[1] - references[3];
	var height = references[2] - references[0];
	var ctxCrop = this.ctx.getImageData(references[3],references[0],width,height);
	this.canvas.width = width;
	this.canvas.height = height;
	this.ctx.putImageData(ctxCrop,0,0);
}

//private
var types = {
	transparence : function(image){
		var p1,p2,p3,p4 = null;
		p1 = p2 = p3 = p4;
		var data = image.data,
		    width = image.width,
		    height = image.height,
		    wline = 0,
		    hline = 0;

		for(var i=0; i<data.length; i+=4){

			if(++wline > width){
				wline = 1
				++hline;
			}

			if(data[i+3] !== 0){
				if(p1 === null)	p1 = hline;

				if(p2 === null || p2 < wline) p2 = wline;
				
				if(p3 === null || p3 < hline) p3 = hline;

				if(p4 === null || p4 > wline) p4 = wline;
			}
		}		
		return[p1,p2,p3,p4]
	}
}