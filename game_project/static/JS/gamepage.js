var csrftoken = $.cookie('csrftoken');
console.log(csrftoken);
var app = angular.module("slither", []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});
var canvas = document.getElementById("world");
var context =canvas.getContext('2d');
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var mouseX = window.innerWidth - screenWidth;
var mouseY = window.innerHeight - screenHeight;
document.addEventListener('mousemove', documentMouseMoveHandler, false);


function documentMouseMoveHandler(event){
	mouseX = event.clientX - (window.innerWidth - screenWidth );
	mouseY = event.clientY - (window.innerHeight - screenHeight);

}

canvas.width=screenWidth;
canvas.height=screenHeight;	

app.controller("ctrl", function($scope , $interval) {

	$scope.playing = false;
	$scope.score = 0;
	$scope.time=0;
	$scope.level = 1;
	$scope.diffuculty = 0;
	$scope.particles = [];
	$scope.opacity=0.7;
	$scope.colors=["#0d0d0d","#808080",'#e60000','#000066','#00cc66','#ff6600'];		
	$scope.game_played=0;
	$scope.final_score=true;
	/*$scope.colors=[  'rgba(00, 77, 179,' +$scope.opacity + ')',       
              'rgba(255, 60, 26,' +$scope.opacity + ')',
              'rgba(241, 196, 15,' +$scope.opacity + ')',
              'rgba(89, 89, 89,' +$scope.opacity + ')',
              'rgba(0, 179, 60,' +$scope.opacity + ')',

			];
			*/
			$scope.slither={ x : screenWidth/10, y : screenHeight/1.5 };
			$scope.tail=[];
			$scope.vel={x:1,y:-1};
			$scope.start_time = 0;  	

			var start_game=function() {
				$scope.score = 0;
				$scope.points=0;
				$scope.time=0;
				$scope.level = 1;
				$scope.diffuculty =0;
				$scope.start_time=new Date().getTime();
				$scope.slither={ x : screenWidth/10, y : screenHeight/1.5 };
				$scope.tail=[];
				$scope.particles=[];
				context.clearRect(0,0,canvas.width,canvas.height);
			}

			var createParticles=function() {
				$scope.q=Math.random();
				$scope.dot={ x:Math.floor((Math.random()*screenWidth)+screenWidth/1.2), y:Math.floor((Math.random()*screenHeight/2)-screenHeight/1.8), 
					radius:Math.floor((Math.random()*3)+2),velx:(-2 ),vely: (0.5+Math.random())  };
					$scope.particles.push($scope.dot);
				}

				var delete_particles=function() {
					for(i=0;i<$scope.particles.length;i++){	
						if ($scope.particles[i].x < 0 || $scope.particles[i].y > canvas.height) {
							$scope.particles.splice(i,1);
						}
					}
				}

				var req = function() {
					$.post("http://127.0.0.1:8000/save/",{'score':$scope.score , 'csrfmiddlewaretoken':csrftoken });
				}

				var gameover=function() {
					$scope.playing=false; 
					if($scope.game_played > 0 )
					{
						$scope.final_score=false;
					}
					setTimeout(req,1000);							
				}


				var game=function() {
					$scope.diff=1;	
	// particles
	while($scope.particles.length<(100+(100*$scope.level/2))){
		createParticles();
	}
	context.clearRect(0,0,canvas.width,canvas.height);
	for(i=0;i<$scope.particles.length;i++) {
		$scope.particles[i].x+=$scope.particles[i].velx*$scope.diff;
		$scope.particles[i].y+=$scope.particles[i].vely*$scope.diff;
		context.beginPath();
		context.fillStyle = '#0d0d0d';
		context.strokeStyle = '#0d0d0d';
		context.arc($scope.particles[i].x,$scope.particles[i].y,$scope.particles[i].radius, 0, Math.PI*2, true);
		context.fill();
		context.stroke();	
	}
	delete_particles();
	//slither part
	
	if($scope.playing){
		$scope.svelocity={x:-1,y:1};
	//$scope.tvelocity={x:2,y:-2};	
	$scope.diffuculty+=0.0005/$scope.level;
	$scope.diff+=0.0005/$scope.level;
	//console.log($scope.diffuculty);
	$scope.slither.x+=$scope.svelocity.x*($scope.level/2);
	$scope.slither.y+=$scope.svelocity.y*($scope.level/2);
	$scope.slither.x+=(mouseX-$scope.slither.x)*0.1;
	$scope.slither.y+=(mouseY-$scope.slither.y)*0.1;
	
	$scope.tmp={x:$scope.slither.x,y:$scope.slither.y};
	$scope.tail.push($scope.tmp);
	context.beginPath();	

	for( i = 0; i < $scope.tail.length; i++ ) 
	{
		context.strokeStyle = "#666666";
		context.lineWidth = 2;
		context.lineTo( $scope.tail[i].x , $scope.tail[i].y );
		context.stroke();
		$scope.tail[i].x += $scope.svelocity.x;
		$scope.tail[i].y += $scope.svelocity.y;
	}

	if($scope.tail.length>(40*$scope.level)){
		$scope.tail.shift();
	}
	context.beginPath();
	context.fillStyle = $scope.colors[Math.floor(Math.random()*$scope.colors.length)];
	context.arc($scope.slither.x, $scope.slither.y, 6, 0, Math.PI*2, true);
	context.fill();

	
	if($scope.slither.x > screenWidth ) {
		gameover();	
	}
	if ($scope.slither.x < 0) {
		gameover();
	}
	if($scope.slither.y > screenHeight ) {
		gameover();
	} 
	if($scope.slither.y < 0) {
		gameover();
	}
	
	for( i=0;i<$scope.particles.length;i++){
		if(Math.abs($scope.particles[i].x-$scope.slither.x) < $scope.particles[i].radius+6){
			if(Math.abs($scope.particles[i].y-$scope.slither.y) < $scope.particles[i].radius+6){
				gameover();
			}
		}
	}

	$scope.distance_moved=Math.sqrt((mouseX-$scope.slither.x)*(mouseX-$scope.slither.x)+(mouseY-$scope.slither.y)*(mouseY-$scope.slither.y));
	$scope.score += Math.floor(( $scope.distance_moved )*0.01);
	$scope.points+=0.5;
	if($scope.points>1){
		$scope.points=0;
	}
	$scope.score += Math.floor($scope.points);
	$scope.time = Math.floor((new Date().getTime()-$scope.start_time)/100);
	$scope.diffuculty+=0.0005;
		//console.log($scope.score);
		if($scope.diffuculty-$scope.level >= 0.5*$scope.level){
			$scope.level+=1;
			$scope.diffuculty=$scope.level;	
		}	

	}

}
$interval(game,1000/60);

$scope.gamebegin = function() {
	$scope.playing=true;
	$scope.game_played++;
	start_game();
}


});
