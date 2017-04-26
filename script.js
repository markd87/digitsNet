function makeInput(data){
	var newarr=new Array(28*28);
	var j=0;
	tot=data.length;
	for (var i=3;  i<tot; i+=4){
		newarr[j]=data[i]/255+0.01;
		j+=1;
	}
	return newarr;
};

function sigmoid(v){
	return 1/(1+Math.exp(-v));
}

function softmax(arr){
	tot=arr.length;
	newarr=new Array(tot);
	var sum=arr.reduce(function(acc,val){acc+Math.exp(val)})
	for (var i=0; i<arr; i++){
		arr[i]=Math.exp(arr[i])/sum
	}
	return newarr;
}

function predict(input){
	var inarr=math.matrix(input).transpose();
	var w1=math.matrix(wih).resize([200,784]);
	var w2=math.matrix(who).resize([10,200]);

	hid_in=math.dot(w1,inarr);
	hid_out=math.map(hid_in, sigmoid(value));
	fin=math.dot(w2,hid_out);
	fin_out=math.map(fin, sigmoid(value));

	console.log(fin_out);
}

$(document).ready(function(){

var canvas=document.getElementById('canvas');

var canvas_test=document.getElementById('canvas_test');

var wih=new Array();
var who=new Array();

$.ajax({
  url: 'wih.csv',
  dataType: 'text',
}).done(function(data){
	//weights=Array.from(data)
	wih=data.split(/,/).map(parseFloat);
});

$.ajax({
  url: 'who.csv',
  dataType: 'text',
}).done(function(data){
	//weights=Array.from(data)
	who=data.split(/,/).map(parseFloat);
});


if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
var context = canvas.getContext("2d");
var destCtx = canvas_test.getContext("2d");
destCtx.scale(1/3,1/3);


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

destCtx.clearRect(0, 0, canvas_test.width, canvas.height);

  var img=context.getImageData(0,0,84,84);
  destCtx.drawImage(canvas, 0, 0);
  
  digitdata=destCtx.getImageData(0,0,28,28).data;

  digitArr=makeInput(digitdata);
  //console.log(digitArr);

  var dig=predict(digitArr,wih,who)


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
  context.lineWidth = 3;
			
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