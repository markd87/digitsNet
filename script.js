function makeInput(data){
	var newarr=new Array(28*28);
	var j=0;
	tot=data.length;
	for (var i=3;  i<tot; i+=4){
		newarr[j]=data[i]/255*0.99+0.01;
		j+=1;
	}
	return newarr;
};

function sigmoid(v){
	return 1.0/(1+Math.exp(-v));
}

function softmax(arr){
	tot=arr.length;
	newarr=new Array(tot);
	var sum=arr.reduce(function(acc,val){return acc+Math.exp(val)})
	for (var i=0; i<tot; i++){
		newarr[i]=Math.exp(arr[i])/sum
	}
	return newarr;
}
var test='0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,159,253,159,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,238,252,252,252,237,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,54,227,253,252,239,233,252,57,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,60,224,252,253,252,202,84,252,253,122,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,252,252,252,253,252,252,96,189,253,167,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,238,253,253,190,114,253,228,47,79,255,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,238,252,252,179,12,75,121,21,0,0,253,243,50,0,0,0,0,0,0,0,0,0,0,0,0,0,38,165,253,233,208,84,0,0,0,0,0,0,253,252,165,0,0,0,0,0,0,0,0,0,0,0,0,7,178,252,240,71,19,28,0,0,0,0,0,0,253,252,195,0,0,0,0,0,0,0,0,0,0,0,0,57,252,252,63,0,0,0,0,0,0,0,0,0,253,252,195,0,0,0,0,0,0,0,0,0,0,0,0,198,253,190,0,0,0,0,0,0,0,0,0,0,255,253,196,0,0,0,0,0,0,0,0,0,0,0,76,246,252,112,0,0,0,0,0,0,0,0,0,0,253,252,148,0,0,0,0,0,0,0,0,0,0,0,85,252,230,25,0,0,0,0,0,0,0,0,7,135,253,186,12,0,0,0,0,0,0,0,0,0,0,0,85,252,223,0,0,0,0,0,0,0,0,7,131,252,225,71,0,0,0,0,0,0,0,0,0,0,0,0,85,252,145,0,0,0,0,0,0,0,48,165,252,173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,86,253,225,0,0,0,0,0,0,114,238,253,162,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,85,252,249,146,48,29,85,178,225,253,223,167,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,85,252,252,252,229,215,252,252,252,196,130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,199,252,252,253,252,252,233,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,128,252,253,252,141,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'
var tt=test.split(/,/).map(parseFloat);

tt=tt.map(function(val){return val/255*0.99+0.01});
//console.log(tt);

function getMaxInd(arr){
	var max=arr[0];
	var len=arr.length;
	var ind=0;
	for (var i=1; i<len; i++){
		if (arr[i]>max){
			ind=i;
			max=arr[i];
		}
	}
	return ind;
}


function show_load(){
	$("div#img_loading").show();
}

function hide_load(){
	$("div#img_loading").hide();
}


function predict(input,wih,who){
	//alert('predicting tt2');
	//console.log(input.toString());
	var inarr=math.matrix(input);
	//console.log(inarr);
	var inmat=math.transpose(inarr);
	//console.log(wih);
	var w1=math.matrix(wih);
	//console.log(w1);
	w1=math.reshape(w1,[200,784]);
	var w2=math.matrix(who);
	w2=math.reshape(w2,[10,200]);

	var hid_in=math.multiply(w1,inmat);
	var hid_out=math.map(hid_in, function(value){return sigmoid(value)});
	var fin=math.multiply(w2,hid_out);
	var fin_out=math.map(fin, function(value){return sigmoid(value)});


	var arrdigits=fin_out.valueOf()
	var digit=getMaxInd(arrdigits);


	var sum=arrdigits.reduce(function(acc,val){return acc+val})
	//console.log(sf);
	for (var i=0; i<10; i++){
		//var val =Math.exp(arrdigits[i])/sf;
		var val =arrdigits[i]/sum;
		var s=i.toString();
		if (val <0.001){
			val=0;
		}
		$('#v'+s).html(val.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]);
	}


	$('li').removeClass('list-group-item-success');

	$("#v"+digit.toString()).parent('li').addClass('list-group-item-success');

	$("span#predres").html(digit.toString());
	//hide_load();
	//console.log('digit: ', digit);
	//console.log(fin_out);
	//console.log(sum)
}



var wih=new Array();
var who=new Array();

$(document).ready(function(){

	$("div#img_loading").hide();

$.ajax({
  url: 'wih2.csv',
  dataType: 'text',
  async: true,
}).done(function(data){
	//weights=Array.from(data)
	wih=data.split(/,/).map(parseFloat);
	//console.log('get');
	//console.log(wih);
});

$.ajax({
  url: 'who2.csv',
  dataType: 'text',
  async: true,
}).done(function(data){
	//weights=Array.from(data)
	who=data.split(/,/).map(parseFloat);
	//console.log(who);
	//predict(tt,wih,who);

});


var canvas=document.getElementById('canvas');

var canvas_test=document.getElementById('canvas_test');


if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
var context = canvas.getContext("2d");
var destCtx = canvas_test.getContext("2d");
destCtx.scale(0.2,0.2);


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

 var img;

$('#canvas').mouseup(function(e){
  paint = false;

destCtx.clearRect(0, 0, canvas.width, canvas.height);

  img=context.getImageData(0,0,140,140);
  //console.log(img);

$("#predict").removeAttr('disabled');
 

});

$('#canvas').mouseleave(function(e){
  paint = false;
  $("#predict").removeAttr('disabled');

});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;


$('#clear').mousedown(function(e){
clickX=[];
clickY=[];
clickDrag = [];
img=0;
destCtx.clearRect(0, 0, canvas.width, canvas.height);
context.clearRect(0, 0, canvas.width, canvas.height);
$("#predict").attr('disabled','disabled');
});


$('#predict').click(function(e){

	//show_load();

	destCtx.clearRect(0, 0, canvas.width, canvas.height);

  destCtx.drawImage(canvas, 0, 0);
  
  digitdata=destCtx.getImageData(0,0,28,28).data;

  digitArr=makeInput(digitdata);

  var dig=predict(digitArr,wih,who);
});


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
  context.lineCap = 'round';
  context.lineWidth = 9;
			
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
