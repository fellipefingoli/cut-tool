"use strict"

var PasteTool = function(canvas){
	this.ctxPaste = canvas.getContext('2d');
}

PasteTool.prototype.pasteImage = function(copy) {
	this.copyData = this.ctxPaste.createImageData(copy.width,copy.height);
	this.copyData.data.set(copy.data);	
	this.ctxPaste.putImageData(this.copyData,0,0);
}
