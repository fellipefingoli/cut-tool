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
			ctx.drawImage(img,0,0,canvas.width,canvas.height);
		}
		img.src = fileData;
	});

	var cutImage;
	//cut tool button
	var cutButton = document.getElementById("cut");
	cutButton.addEventListener("click",function(e){
		cutImage = cutTool.cutImage();
	})

	


	//paste tool button
	var pasteCanvas = document.getElementById("canvas2")	
	var pasteButton = document.getElementById("paste");
	var cropTool = new CropTool(pasteCanvas);
	pasteTool = new PasteTool(pasteCanvas);
	pasteButton.addEventListener("click",function(e){
		pasteTool.pasteImage(cutImage);
		cropTool.cropArea("transparence");
	})
	
});

