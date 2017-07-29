var canvas=document.getElementById("background");
var context=canvas.getContext('2d');

var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') != -1) || (navigator.userAgent.toLowerCase().indexOf('iphone') != -1);

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var frames=150;
var current_frames=0;

var opacity=0.7;
colors=[  'rgba(00, 77, 179,' + opacity + ')',       
              'rgba(255, 60, 26,' + opacity + ')',
              'rgba(241, 196, 15,' + opacity + ')',
              'rgba(89, 89, 89,' + opacity + ')',
              'rgba(0, 179, 60,' + opacity + ')',
		]
var particles=[];
function drawDot(){
	var q=Math.random();
var dot={
	x:Math.random()*SCREEN_WIDTH, y:Math.random()*SCREEN_WIDTH, radius:3,velx:(Math.sin(q)-0.5)*2,vely:(Math.sin(q)-0.2)*2, 
	color:colors[Math.floor(Math.random()*colors.length)] };
particles.push(dot);

};

canvas.width=SCREEN_WIDTH;
canvas.height=SCREEN_HEIGHT;

function moveDot(){

if(particles.length<150){
	drawDot();
}
 context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

for( i=0;i<particles.length;i++){
 particles[i].x+=particles[i].velx;
 particles[i].y+=particles[i].vely;
 var dot=particles[i];
 context.beginPath(); 
 context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
 context.fillStyle = dot.color; 
 context.fill();

 console.log(dot.velx);
if(particles[i].x>=SCREEN_WIDTH)
	particles[i].velx=-particles[i].velx;
if(particles[i].x<=0)
	particles[i].velx=-particles[i].velx;
if(particles[i].y>=SCREEN_HEIGHT)
	particles[i].vely=-particles[i].vely;
if(particles[i].y<=0)
	particles[i].vely=-particles[i].vely;
}

}


//setInterval(function(){ 
//	window.requestAnimationFrame(moveDot); }, 100)
setInterval(moveDot,1000/60);