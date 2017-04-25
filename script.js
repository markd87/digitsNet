$(document).ready(function(){

var canvas=document.getElementById('canvas');

var canvas_test=document.getElementById('canvas_test');

if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
var context = canvas.getContext("2d");
var destCtx = canvas_test.getContext("2d");


$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();	
});


$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});


$('#canvas').mouseup(function(e){
  paint = false;
  var img=context.getImageData(0,0,84,84);

	var newCanvas = $("<canvas>")
	    .attr("width", img.width)
	    .attr("height", img.height)[0];

	newCanvas.getContext("2d").putImageData(img, 0, 0);

	destCtx.drawImage(newCanvas, 0, 0);
	destCtx.scale(1/3, 1/3);

});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 1;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

});