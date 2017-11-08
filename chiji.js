let mousedownflag = false;
//鼠标落点
let sx = 0;
let sy = 0; 
//屏幕宽高
let vw =  0;
let vh =  window.innerHeight - window.innerWidth;
 //position 位置
let xx = 0;
let yy = 0;



$("#map").mousedown(function(e){
	mousedownflag = true;
	sx = e.pageX;
	sy = e.pageY;
});
$("#map").mouseup(function(){
	mousedownflag = false
});
$("#map").mouseout(function(){
	mousedownflag = false
});
$("#map").bind("contextmenu",function(){return false;});

$(document).mousemove(function(e){
	if(mousedownflag){
		//移动的距离
		let x = e.pageX - sx;
		let y = e.pageY - sy;
		//重新赋值初始坐标
		sx = e.pageX;
		sy = e.pageY;
		//position 位置
		xx = xx+x;
		yy = yy+y;
		// 限制位置
		resetMap(xx,yy);
	}
});

let size = 1;
let scrollFunc = function(e){
	let flag =  e.deltaY>0 ? true:false; // true = down, false = up
	let org = size;
	flag ? size-- :size++;
	if(size < 1)  size = 1;
	if(size > 4)  size = 4;
	this.scaleView(size,org)
	$("#map").css("width",size+"00vw");
	$("#map").css("height",size+"00vh");
}
window.onmousewheel =  scrollFunc;

function scaleView(x,o){
	vw = window.innerWidth - window.innerWidth*x;
	vh = window.innerHeight - window.innerWidth*x;
	xx = xx/o * x;
	yy = yy/o * x;
	resetMap(xx,yy);
}

function resetMap(xx,yy){
	if(xx > 0)  xx = 0;
	if(xx < vw)  xx = vw;
	if(yy > 0)  yy = 0;
	if(yy < vh)  yy = vh;
	$("#map").css("background-position",xx+ "px " + yy+"px");
}
