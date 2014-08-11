document.addEventListener("DOMContentLoaded", function(e){
	var canvas = document.getElementById("canvas");
	var cuttool = new cutTool(canvas);
	cuttool.enableSelect();
});

