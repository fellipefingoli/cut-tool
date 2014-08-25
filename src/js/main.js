document.addEventListener("DOMContentLoaded", function(e){
	//init canvas
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var cutTool = new CutTool(canvas);
	cutTool.enableSelect();

	//init input file
	var file = document.getElementById("file");
	var fileManager = new FileManager(file)
	
	fileManager.upload(function(fileData){
		var img = new Image();
		img.onload = function(e){
			ctx.drawImage(img,0,0);
		}
		img.src = fileData;
	});

	//cut tool button
	var cutButton = document.getElementById("cut");
	cutButton.addEventListener("click",function(e){
		cutImage = cutTool.cutImage();
		//crop tool
		var cropTool = new CropTool(cutImage);
		cropTool.transparence();
	})

	


	//paste tool button
	var pasteCanvas = document.getElementById("canvas2")	
	var pasteButton = document.getElementById("paste");
	pasteTool = new PasteTool(pasteCanvas);
	pasteButton.addEventListener("click",function(e){
		cutTool.pasteImage(pasteCanvas);
	})
	
});

