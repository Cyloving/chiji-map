let mousedownflag = false;
//鼠标落点
let sx = 0;
let sy = 0; 
//屏幕宽高
let vw = 2700 - window.innerWidth;
let vh = 2700 - window.innerHeight;

function scaleView(x){
	vw = 2700*x - window.innerWidth;
	vh = 2700*x - window.innerHeight;
}


$("#map").mousedown(function(e){
	mousedownflag = true;
	sx = e.pageX;
	sy = e.pageY;
});
$("#map").mouseup(function(){
	mousedownflag = false
});
 //position 位置
let xx = 0;
let yy = 0;
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
		if(xx > 0)  xx = 0;
		if(xx < -vw)  xx = -vw;
		if(yy > 0)  yy = 0;
		if(yy < -vh)  yy = -vh;
		$("#map").css("background-position",xx+ "px " + yy+"px");
		
	}
});

let size = 1;
let scrollFunc = function(e){
	let flag =  e.deltaY>0 ? true:false; // true = down, false = up
	flag ? size-- :size++;
	if(size < 1)  size = 1;
	if(size > 4)  size = 4;
	this.scaleView(size)
	$("#map").css("width",size+"00vw");
	$("#map").css("height",size+"00vh");
}
window.onmousewheel =  scrollFunc;

