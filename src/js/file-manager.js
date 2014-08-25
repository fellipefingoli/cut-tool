"use strict"
//constructor
var FileManager = function(input,callback){
	var that = this;
	this.input = input;
}

FileManager.prototype.upload = function(callback){
	this.input.addEventListener("change",function changeEvent (e){
		try{
			var reader = new FileReader();
			reader.onloadend = function(evt){
				callback(evt.target.result);
			}
			reader.readAsDataURL(this.files[0]);
		}catch(error){
			throw error
		}
	});
}
