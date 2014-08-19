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
	
});

