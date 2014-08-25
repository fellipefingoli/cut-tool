"use strict"

//constructor

var CropTool = function(image){
	this.image = image;
}

CropTool.prototype.transparence = function(){
	var p1,p2,p3,p4 = null;
	p1 = p2 = p3 = p4;
	var data = this.image.data,
	    width = this.image.width,
	    height = this.image.height,
	    wline = 0,
	    hline = 0;

	for(var i=0; i<data.length; i+=4){

		if(++wline > width){
			wline = 1
			++hline;
		}

		if(data[i+3] !== 0){

			if(p1 === null)
				p1 = hline;

			if(p2 === null || p2 < wline)
				p2 = wline;
			
			if(p3 === null || p3 < hline)
				p3 = hline;

			if(p4 === null || p4 > wline)
				p4 = wline;

		}		
	}
	
	console.log(p1,p2,p3,p4);
}