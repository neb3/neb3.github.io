
var canvas =null;
var mode = "";

function drawMap()
{

	mode = "map";
	if(!canvas)
	{

      canvas =  new fabric.Canvas('canvas');
		
		  canvas.on('mouse:down', function(options) {
		  playSound('map')
		   
		   if(options.target)
		   {
			   	var type = options.target.get('type');
			   	var id = options.target.get('id');
                if(!id&&$('input#cbInitCity').prop('checked') && mode == "map") {
			    	var pointer = canvas.getPointer(event.e);
				    var posX = pointer.x;
				    var posY = pointer.y;

			  	   initCityModal(Math.round(posX),Math.round(posY));
		 		 }
			   	if(id && mode == "map")
			   	{
			   		var selfid = $('#txtWalletAddress').val();
			   		if(selfid==id)
			   		{
			   			if(!$('#cbInitCity').prop('checked'))
					    {
					      initInnerCity();
					    }
			   		}else{
			   			if($('#cbInitCity').prop('checked'))
			   			{
			   				toastr.remove();
							toastr['warning']('请选择其他地点')
			   			}else{
			   	            
			   				viewOtherCity(id);
			   			}
			   			
			   		}
			   	}


			   	if(id && mode == 'city')
			   	{
			   		//toastr["info"](id);
			   		if(id=='inn')
			   		{
			   			viewInn();
			   		}else if(id=='office')
			   		{
			   			viewOffice();	
			   		}else if(id=='market')
			   		{
			   			viewMarket();	
			   		}else if(id=='character')
			   		{
			   			viewCharacters();	
			   		}else if(id=='harvest')
			   		{
			   			viewHarvest();	
			   		}else if(id=='blacksmith')
			   		{
			   			toastr.remove();
						toastr['info']('技匠馆将在以后的游戏更新中发布')
			   		}else if(id=='farmland')
			   		{
			   			toastr.remove();
						toastr['info']('农场将在以后的游戏更新中发布')
			   		}else if(id=='mines')
			   		{
			   			toastr.remove();
						toastr['info']('铁矿将在以后的游戏更新中发布')
			   		}else if(id=='barrack')
			   		{
			   			toastr.remove();
						toastr['info']('兵营将在以后的游戏更新中发布')
			   		}

			   		
			   	}
		   }
		});
	
	}

	 canvas.setWidth(1280);
	 canvas.setHeight(1280);
	
	fabric.Image.fromURL('assets/img/map.png', function(oImg) {
		// oImg.set('width',1680);
		// oImg.set('height',1680);

	// oImg.scaleToHeight(720);
	// oImg.scaleToWidth(1280);
		// oImg.set('flip',true);
		oImg.set('selectable', false)

		canvas.add(oImg);


        getCities();
	});

	
}

function drawMapCity(city)
{

    // var canvas = document.getElementById("canvas").fabric;
	var src = 'assets/img/city1.png';
	if(city.faction==1)
	{
		src = 'assets/img/city1.png';
	}else if(city.faction==2)
	{
		src = 'assets/img/city2.png';
	}else if(city.faction==3)
	{
		src = 'assets/img/city3.png';
	}

	fabric.Image.fromURL(src, function(oImg) {

		oImg.set('left',city.x-20);
		oImg.set('top',city.y-20);
		oImg.set('width',50);
		oImg.set('height',31);
		oImg.set('flip',true);
		oImg.set('selectable', false)
		oImg.set('type','city');
		oImg.set('id',city.from);
		oImg.set('name',city.name);
		oImg.set('faction',city.faction);
		canvas.add(oImg);

		var name = new fabric.Text(city.name, 
				{
					left: city.x-10, 
					top:city.y-30,
				    fontFamily: 'serif, sans-serif, Arial, Helvetica, sans-serif;',
				    fontSize:12,
				    selectable:false
				});
	        canvas.add(name);

	});
}

function drawCityIndicator(city)
{

    // var canvas = document.getElementById("canvas").fabric;
	var src = 'assets/img/arrow.png';
	

	fabric.Image.fromURL(src, function(oImg) {

		oImg.set('left',city.x-10);
		oImg.set('top',city.y-50);
		oImg.set('width',23);
		oImg.set('height',28);
		oImg.set('flip',true);
		oImg.set('selectable', false)
		oImg.set('type','indicator');
		canvas.add(oImg);

	});
}


function resetCanvas()
{
	// var canvas = document.getElementById("canvas").fabric;
	canvas.clear();
}

function drawInnerCity(city)
{
   // var canvas = document.getElementById("canvas").fabric;
	
	mode="city"
	canvas.setWidth(1280);
	canvas.setHeight(728);
	

	fabric.Image.fromURL('assets/img/innercity.png', function(oImg) {
		oImg.set('width',1280);
		oImg.set('height',720);
		oImg.set('flip',true);
		oImg.set('selectable', false)
		canvas.add(oImg);

		fabric.Image.fromURL('assets/img/cityprofile.png', function(oImg1) {
			oImg1.set('left',0);
			oImg1.set('top',0);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','profile');
			oImg1.set('id','cityprofile');
			canvas.add(oImg1);


			var faction = city.faction;
    		var factionsrc = "assets/img/Countrywar_FLag_Wei_small.png";
    		if(faction == 1){
    			factionsrc = "assets/img/Countrywar_FLag_Wei_small.png";
    		}else if(faction == 2){
    			factionsrc = "assets/img/Countrywar_FLag_Shu_small.png";
    		}else if(faction == 3){
    			factionsrc = "assets/img/Countrywar_FLag_Wu_small.png";
    		}

	        fabric.Image.fromURL(factionsrc, function(oImgx) {
				oImgx.set('left',15);
				oImgx.set('top',15);
				oImgx.set('width',50);
				oImgx.set('height',50);
				oImgx.set('flip',true);
				oImgx.set('selectable', false)
				oImgx.set('type','profile');
				oImgx.set('id','cityprofile');
				canvas.add(oImgx);
		    });

			var name = new fabric.Text(city.name, 
				{
					left: 50, 
					top:25,
				    fontFamily: 'Arial, Helvetica, sans-serif;',
				    fontSize:20,
				    selectable:false
				});
	        canvas.add(name);

    		

	        var gold = new fabric.Text('黄金 ' + city.gold, 
				{
					left: 25, 
					top:60,
				    fontFamily: 'Arial, Helvetica, sans-serif;',
				    fontSize:14,
				    selectable:false
				});
	        canvas.add(gold);

	         var food = new fabric.Text('粮食 ' + city.food, 
				{
					left: 25, 
					top:90,
				    fontFamily: 'Arial, Helvetica, sans-serif;',
				    fontSize:14,
				    selectable:false
				});
	        canvas.add(food);

	        var rep = new fabric.Text('声望 ' + city.reputation, 
				{
					left: 25, 
					top:120,
				    fontFamily: 'Arial, Helvetica, sans-serif;',
				    fontSize:14,
				    selectable:false
				});
	        canvas.add(rep);

	        fabric.Image.fromURL('assets/img/generalinfo.png', function(oImgg) {
			oImgg.set('left',50);
			oImgg.set('top',140);
			oImgg.set('flip',true);
			oImgg.set('selectable', false)
			oImgg.set('type','construction');
			oImgg.set('id','character');
			canvas.add(oImgg);
		    });


		});
			
		

		fabric.Image.fromURL('assets/img/inn0.png', function(oImg1) {
			oImg1.set('left',427);
			oImg1.set('top',180);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','inn');
			canvas.add(oImg1);
		});

		fabric.Image.fromURL('assets/img/markets0.png', function(oImg1) {
			oImg1.set('left',600);
			oImg1.set('top',253);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','market');
			canvas.add(oImg1);
		});

		fabric.Image.fromURL('assets/img/official0.png', function(oImg1) {
			oImg1.set('left',85);
			oImg1.set('top',248);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','office');
			canvas.add(oImg1);
		});


		fabric.Image.fromURL('assets/img/weaponsShop0.png', function(oImg1) {
			oImg1.set('left',765);
			oImg1.set('top',368);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','blacksmith');
			canvas.add(oImg1);
		});


		fabric.Image.fromURL('assets/img/food.png', function(oImg1) {
			oImg1.set('left',190);
			oImg1.set('top',138);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','harvest');
			canvas.add(oImg1);
		});
		
		fabric.Image.fromURL('assets/img/manorFarmland0.png', function(oImg1) {
			oImg1.set('left',250);
			oImg1.set('top',98);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','farmland');
			canvas.add(oImg1);
		});

		fabric.Image.fromURL('assets/img/manorBarrack0.png', function(oImg1) {
			oImg1.set('left',510);
			oImg1.set('top',363);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','barrack');
			canvas.add(oImg1);
		});


		fabric.Image.fromURL('assets/img/manorMines0.png', function(oImg1) {
			oImg1.set('left',1120);
			oImg1.set('top',199);
			oImg1.set('flip',true);
			oImg1.set('selectable', false)
			oImg1.set('type','construction');
			oImg1.set('id','mines');
			canvas.add(oImg1);
		});

	});

    
}
