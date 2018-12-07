
var canvas = document.getElementById("canvas");
var hotspots=[];
var canvasListenToEvent = false;

canvas.addEventListener('click', function(e) {

 	canvasListenToEvent = true;
 	//console.log("click")

 	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	if ($('input#cbCity').prop('checked')) {
		setCity(x,y);
    }else{


    	for(var i=0;i<hotspots.length;i++)
    	{
    		var hotspot = hotspots[i];
    		if(x>=hotspot.x && x<= (hotspot.x+50)
    			&& y>=hotspot.y && y<=(hotspot.y+50))
    		{
    			attackCity(hotspot.name);
    			// var name = hotspot.name.substring(0, 4) + "..." + hotspot.name.substring(hotspot.name.length - 4);
    			// toastr.remove();
    			// toastr["info"]("玩家 " + name + "<br/><br/><a href='#' class='btn btn-sm btn-warning btn-viewplayer'>查看</a>")
    		}
    	}
    }


	}, false);
			
function drawMapCanvas()
{
	$("#canvas").fadeOut(function(){


	var elemLeft = canvas.offsetLeft;
    var elemTop = canvas.offsetTop;

    var ctx = canvas.getContext('2d');

    //Loading of the home test image - img1
    var img1 = new Image();
    img1.src = 'assets/img/map.png';
    //drawing of the test image - img1
    img1.onload = function () {
        //draw background image

	    canvas.width = img1.width;
	    canvas.height = img1.height;
        ctx.drawImage(img1, 0, 0,canvas.width, canvas.height);
        $("#canvas").fadeIn(function(){

        	var img2 = new Image();
			img2.src = 'assets/img/city.png';
			img2.onload = function () {


			}
        });
        
    };

	

   });
}

function selectInnerCity()
{
	hotspots = [];
	$("#canvas").fadeOut(function(){
		var elemLeft = canvas.offsetLeft;
	    var elemTop = canvas.offsetTop;

	    var ctx = canvas.getContext('2d');
	    //Loading of the home test image - img1
	    var img1 = new Image();
	    img1.src = 'assets/img/innercity.png';
	    //drawing of the test image - img1
	    img1.onload = function () {
	        //draw inner city background image
 
		    canvas.width = img1.width;
		    canvas.height = img1.height;
	        ctx.drawImage(img1, 0, 0,canvas.width, canvas.height);  

			getPlayerCity();

	        $("#canvas").fadeIn();
    	};

	});
	
}

function drawMapCity(city)
{
	var elemLeft = canvas.offsetLeft;
	var elemTop = canvas.offsetTop;

	var ctx = canvas.getContext('2d');

	var img2 = new Image();
	img2.src = city.isowner?'assets/img/cityplayer.png':'assets/img/city.png';
	img2.onload = function () {
		ctx.drawImage(img2, city.x-20, city.y-20,50,31);

		if(city)
		{

		var hotspot = {}; 
		hotspot.x = city.x-20;	
		hotspot.y = city.y-20;
		hotspot.w = 50;	
		hotspot.h = 31;
		hotspot.name = city.from;
		hotspot.food = city.food;
		hotspot.gold = city.gold;
		hotspot.army = city.army;
		hotspots.push(hotspot);
		}
	}
}

function drawInnerCity(city)
{
	var elemLeft = canvas.offsetLeft;
	var elemTop = canvas.offsetTop;

	var ctx = canvas.getContext('2d');
    if(city)
	{
	ctx.font="20px Georgia";

    ctx.fillText("粮：" + city.food,10,50);
    ctx.fillText("金：" + city.gold,10,100);
    ctx.fillText("兵：" + city.army,10,150);
 
    }

}

function resetCanvas()
{
	hotspots = [];
}



    

   
