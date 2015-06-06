/*
created by tormahiri
ttormahiri@hotmail.com

*/


//global namespace
  var tormahiri={}; 


// rasim yollash
  tormahiri.rasimyollash=function(){

$("#uzitish").click(function(){
Parse.initialize("hSNY3qCUgP6jYeb3dwG53huAGGd8YEHugCAjdgGR", "YQweurkNQQi0ZUrWVEzWgRcmLAzYmg1WDU2v2Sry");
var fileUploadControl = $("#profilePhotoFileUpload")[0];
if (fileUploadControl.files.length > 0) {
  var file = fileUploadControl.files[0];
  var name = "photo.jpg";

  var parseFile = new Parse.File(name, file);
  parseFile.save().then(function(succes) {

 var url=succes._url;

  var container=document.getElementById('container');
 var input = document.createElement("input");
input.type = "text";
input.value=url;
input.className = "photo"; // set the CSS class
container.appendChild(input); 
}, function(error) {
  alert(error)
});
}

});

  }

 // mezmun yollash 
  tormahiri.yollash=function(){

$("#sending").on("click",function(){
Parse.initialize("hSNY3qCUgP6jYeb3dwG53huAGGd8YEHugCAjdgGR", "YQweurkNQQi0ZUrWVEzWgRcmLAzYmg1WDU2v2Sry");
   var mawzusi=$("#title").val();

 
	var content1=$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html();
	if(mawzusi.length<10 && content1.length<10){

	alert("mazmunlar box kaldi");
}else{

	var TestObject = Parse.Object.extend("turlar");
var testObject = new TestObject();
testObject.save({title:mawzusi,desc: content1,img:"http://files.parsetfss.com/e1d6c0b6-befe-4767-b42f-b98b9e545b33/tfss-537c9c7c-16a1-4898-b133-2ec1d498b384-photo.jpg"}).then(function(object) {
  alert("مۇۋەپپىقيەتلىك بولدى");
});
	

}
})


  }
$(document).ready(function(){


tormahiri.yollash();// call yollash function
tormahiri.rasimyollash() // call rasim yollash
	


});




