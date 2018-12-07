"use strict";

var dappAddress = "n1eW4XJdJf7kz44dPVYCkSJis7bMwgMChg6";  //n1t8ZE9Z7SXZUtsgR4yXasFZjgXEksPCATQ
//n1eW4XJdJf7kz44dPVYCkSJis7bMwgMChg6

//here we use neb.js to call the "get" function to search from the Dictionary
var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();
var serialNumber

var intervalQuery
var warsnd
var mapsnd

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "5000",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function initEnv()
{

  warsnd = new Audio("assets/audio/2.mp3");
  warsnd.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
  var r = getRandom(9,4);
  mapsnd = new Audio("assets/audio/" + r + ".mp3");
  mapsnd.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
  }, false);
}

function initOutCity(){

  drawMap();
  RegisterEvents();

  getWallectInfo(function(){
    checkPlayerCity()
  });
}
function initInnerCity(){
resetCanvas();
getPlayerCity();
}

function getRandom(max,min)
{
  var r = Math.floor(Math.random()*(max-min+1)+min); 
  return r
}

function playSound(obj)
{
  if(obj == 'war')
  {
    if(warsnd)
    {
      mapsnd.pause();
      mapsnd.currentTime = 0;
      warsnd.play();
    }else{
      console.log('warsnd is null')
    }
  }else if(obj == 'map'){
    if(mapsnd)
    {
      warsnd.pause();
      warsnd.currentTime = 0;
      if(mapsnd.currentTime > 0)
      {
      }else{
        mapsnd.play();
      }

    }else{
      console.log('map is null')
    }

  }
  

}

// Check if browser has loaded user wallet details

function getWallectInfo(callback) {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");

    window.addEventListener('message', function (e) {
        if (e.data && e.data.data) {
            if (e.data.data.account) {//这就是当前钱包中的地址
                document.getElementById("txtWalletAddress").value = e.data.data.account;
                callback();
            }
        }
    });
}
function searchCharacter(){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0.01";
        var callFunction = "search"
        var args =[];

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: searchCharacternebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function updateGuards(IDs){

        var from = $("#txtWalletAddress").val();

       
        var Args = [];
        Args.push(JSON.stringify(IDs)); 

        var to = dappAddress;
        var value = "0";
        var callFunction = "updateGuards"
        var callArgs = JSON.stringify(Args);

        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: updateGuardsnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function initCity(x,y,name,faction){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "initCity"
        var args =[];
        args.push(x);
        args.push(y);
        args.push(name);
        args.push(faction);

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: initCitynebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function setCity(x,y){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "setCity"
        var args =[];
        args.push(x);
        args.push(y);

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: setCitynebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function buyGood(cid){


        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "buyGood"
        var args =[];
        args.push(cid);

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: buyGoodnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}


function equipGear(id,characterid){


        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "equipGear"
        var args =[];
        args.push(id.toString());
        args.push(characterid.toString());

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: equipGearnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function attackCity(eid){


        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "attackCity"
        var args =[];
        args.push(eid);

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: attackCitynebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function harvestCity(){


        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0";
        var callFunction = "harvestCity"
        var args =[];

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: harvestCitynebPayCallBack       //设置listener, 处理交易返回信息
        }); 
}

function getCity(eid){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getCity";
        var args =[];
        args.push(eid);
        
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs =JSON.stringify(args); //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            if(resp.result)
            {
              // console.log()
            }
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getClasses(){

        var from = $("#txtWalletAddress").val();
        if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getCharacterClasses";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            nebQueryCallBack(resp, "getCharacterClasses")
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function ImportCities(str){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0.01";
        var callFunction = "importCities"
        var args =[];
        args.push(JSON.stringify(str))

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: importCitiesnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function ImportCharacters(str){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0.01";
        var callFunction = "importCharacters"
        var args =[];
        args.push(JSON.stringify(str))

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: importCharactersnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}


function withdrawFund(){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "4";
        var callFunction = "out"
        var args =[];

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: withdrawFundnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}


function updateCityCount(n){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0.01";
        var callFunction = "updateCityCount"
        var args =[];
        args.push(n)

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: updateCityCountnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}

function updateCharacterCount(n){

        var from = $("#txtWalletAddress").val();
        var to = dappAddress;
        var value = "0.01";
        var callFunction = "updateCharacterCount"
        var args =[];
        args.push(n)

        var callArgs = JSON.stringify(args);
        
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: updateCharacterCountnebPayCallBack        //设置listener, 处理交易返回信息
        }); 
}


function getGoodClasses(){

        var from = $("#txtWalletAddress").val();
        if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getGoodClasses";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            nebQueryCallBack(resp, "getGoodClasses")
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function getLeaderboard(){

        var from = $("#txtWalletAddress").val();
        if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getLeaders";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            nebQueryCallBack(resp, "getLeaderboard")
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function getInn()
{
  
}
function getPlayerLog(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerLog";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getPlayerLog")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getPlayerGuards(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerGuards";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getPlayerGuards")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function getPlayerGoods(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerGoods";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
             nebQueryCallBack(resp, "getPlayerGoods")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getCharacters(){

        var from = $("#txtWalletAddress").val();
        if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerCharacter";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getCharacters")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getCharacter(id){

        var from = $("#txtWalletAddress").val();
         if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }


        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getCharacter";
        var args = [];
        args.push(id);
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = JSON.stringify(args) //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getCharacter")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getPlayerCharacter(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerCharacter";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getPlayerCharacter")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function checkPlayerCity(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "checkPlayerCity";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "checkPlayerCity")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function checkHarvest(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "checkPlayerCity";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "checkHarvest")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}
function getPlayerCity(){

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getPlayerCity";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getPlayerCity")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function getCities(){

        var from = $("#txtWalletAddress").val();
        if(!from)
        {
        	from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getCities";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getCities")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
}

function getCity(eid)
{
        var from = $("#txtWalletAddress").val();
        if(!from)
        {
          from = Account.NewAccount().getAddressString();
        }

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getCity";
        var args = [];
        args.push(eid);
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = JSON.stringify(args); //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            
            
             nebQueryCallBack(resp, "getCity")
            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
   
}

function nebQueryCallBack(resp, action){
  if(resp.result)
  {
  	if(action == "getCities")
  	{
	  	var cities = JSON.parse(resp.result);
        console.log(cities.length + ' cities')
        $('#txtCities').val(JSON.stringify(cities));
	  	for(var i=0;i<cities.length;i++)
	  	{
	  		var city = cities[i];
	  		drawMapCity(city)
	  	}
  	}else if(action == "checkPlayerCity")
    {
      var city = JSON.parse(resp.result);
      if(!city)
      {
        setInit(true);
      }else{
        setInit(false);
        drawCityIndicator(city);
      }
      
    }else if(action == "getPlayerCity")
  	{
	  	var city = JSON.parse(resp.result);
	  	drawInnerCity(city)
      
  	}else if(action == "getCity")
    {
      var city = JSON.parse(resp.result);
      getCityStats(city)
      
    }else if(action == "getPlayerCharacter")
  	{
  		
	  	var characters = JSON.parse(resp.result);
	  	listCharacters(characters)
      RegisterOfficeEvents()
  	}else if(action == "getCharacters")
    {
      
      var characters = JSON.parse(resp.result);
      listCharacterSelection(characters)
      RegisterCharacterEvents()
    }else if(action == "getCharacter")
    {
      
      var character = JSON.parse(resp.result);

      var exp_char = character;
      exp_char.goods = [];

      $('#spanCharacters').append(', '+ JSON.stringify(exp_char))
      //$('#txtCharacter').val(JSON.stringify(exp_char) + ',');

      listCharacterDetails(character)
      RegisterCharacterEvents()
      RegisterTooltips();
    }
    else if(action == "getCharacterClasses")
    {
      
      var characters = JSON.parse(resp.result);
      listCharacterClasses(characters)
    }else if(action == "getGoodClasses")
    {
      
      var goods = JSON.parse(resp.result);
      listGoodClasses(goods)
    }else if(action == "getPlayerGoods")
    {
      
      var goods = JSON.parse(resp.result);
      listPlayerGoods(goods)
    }else if(action == "checkHarvest")
    {
      var city = JSON.parse(resp.result);
      listHarvest(city)
      RegisterHarvestEvents();
    }
    else if(action == "getPlayerGuards")
    {
      
      var guards = JSON.parse(resp.result);
      listPlayerGuards(guards)
    }else if(action == "getPlayerLog")
    {
      
      var logs = JSON.parse(resp.result);
      listPlayerLog(logs)
    }else if(action == "getLeaderboard")
    {
      
      var logs = JSON.parse(resp.result);
      listLeaderboard(logs)
    }

  }
}

function nebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('开始进行');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initOutCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function receiptTransaction(txhash, initObject)
{
   neb.api.getTransactionReceipt(txhash).then(function (resp) {

      if(resp.status == 1)
      {
        toastr.remove();
        toastr.options.showDuration = "5000";
        toastr.options.timeOut = "5000";
        var r = JSON.parse(resp.execute_result);
        if(r)
        {
          if(r.msg)
          {
              if(r.success)
              {

              toastr["success"](r.msg);
              }else{

              toastr["warning"](r.msg);
              }
          }
        }
        clearInterval(intervalQuery);

        if(initObject=="initOutCity")
        {
          initOutCity();
        }else if(initObject=="initInnerCity")
        {
          initInnerCity();
        }

      }else if(resp.status == 0){ // error 
        toastr.remove();
        toastr.options.showDuration = "5000";
        toastr.options.timeOut = "5000";
        toastr["warning"](resp.execute_error);
        clearInterval(intervalQuery);
      }
    }).catch(function (err) {
        //cbSearch(err)
        console.log("error:" + err.message)
    })
}

function harvestCitynebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('征收中');
      hideAllModals('harvestCity');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function updateCityCountnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('Update');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "updateCityCount")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function updateCharacterCountnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('Update');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "updateCharacterCount")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}



function importCitiesnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('Import！');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "importCities")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function importCharactersnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('Import！');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "importCharacters")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function withdrawFundnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('Import！');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "withdrawFund")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}


function attackCitynebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('部队出征！');
      hideAllModals('attackCity');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initOutCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function equipGearnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('开始装备');
      hideAllModals('equipGear');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function buyGoodnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('开始购买');
      hideAllModals('buyGood');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function setCitynebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('开始迁移城市');
      hideAllModals('setCity');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initOutCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function initCitynebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('开始为主公招兵买马');
      $('#cbInitCity').prop('checked', false);
      hideAllModals('initCity');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function updateGuardsnebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('设置部队中');
      hideAllModals('updateGuards');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}
function searchCharacternebPayCallBack(resp){

  if(resp)
  {
    if(resp.txhash)
    {
      toastr.remove();
      toastr.options.showDuration = "30000";
      toastr.options.timeOut = "30000";
      toastr["info"]('招募武将中');
      hideAllModals('searchCharacter');
      intervalQuery = setInterval(function () {
          receiptTransaction(resp.txhash, "initInnerCity")
      }, 3000);
    }else{
      toastr["warning"]("行动取消");
    }
  }
}

function hideAllModals(action)
{
  $('.modal').modal('hide');
}

function getCityStats(city)
{
   var canAttack = true;
    var ageObj;
    var protection_lbl = "";
    if(city.protected)
    {
      if(city.protection_endts)
      {
          var now = new Date().getTime();
          if((now - city.protection_endts) < 0) 
          {
              canAttack = false;

              ageObj = retureTimeDifferenceInDays(now - city.protection_endts)

          }
      }
    }
  if(canAttack)
    {
      $('#attackCity').show();
    }else{
       $('#attackCity').hide();
       protection_lbl = "玩家还在保护时间：还剩" + ageObj.number + " " + ageObj.type;
    }

  $('#lblOtherCityName').html('<span class="text-info"><strong>' + city.name + '</strong></span>')
  $('#lblProtectionLabel').html(protection_lbl);
   var img = '<img src="assets/img/city1.png" /> <img src="assets/img/Countrywar_FLag_Wei_small.png" />'; 
    if(city.faction==1)
    {
      img = '<img src="assets/img/city1.png" /> <img src="assets/img/Countrywar_FLag_Wei_small.png" />';
    }else if(city.faction==2)
    {
      img = '<img src="assets/img/city2.png" /> <img src="assets/img/Countrywar_FLag_Shu_small.png" />';
    }else if(city.faction==3)
    {
      img = '<img src="assets/img/city3.png" /> <img src="assets/img/Countrywar_FLag_Wu_small.png" />';
    }
    $('#spanOtherCityFlag').html(img);

   


    var html="<h5>对方武将</h5>";
    html += "<div class='row mx-auto d-flex justify-content-center flex-wr'>";
    $.each(city.guards,function(i){
    var character = city.guards[i];
    
    html += "<div class='col-md-3'>";
    html += "<div class='card mb-1 box-shadow bg-dark' >";
    html +="<div class='row mx-auto d-flex justify-content-center flex-wr'>"
   
    html += "<img class='card-img-top character-image' src='assets/img/characters/" + character.code + ".png' alt='" + character.name + "'>";
    html += "</div>"
    html +="<div class='row mx-auto d-flex justify-content-center flex-wr'>"
    html += "<p class='text-center text-info character-name'>" + character.name + "</p>"
    html += "</div>"
    html += "</div>"
    html += "</div>"

  })
  html += "</div>"

  $('.cityguards-placeholder').html(html);

}

function resetCityStats()
{
    $('#spanOtherCityFlag').html('');
    $('.cityguards-placeholder').html('');

     $('#lblOtherCityName').html('')
      $('#lblProtectionLabel').html('');
}

function listCharacterSelection(characters)
{
  var html="";
  html += "<div class='row'>";
  $.each(characters,function(i){
    var character = characters[i];
    var goods = character.goods;

    var power = character.power;
    var intellect = character.intellect;
    var leadership = character.leadership;

    var goods_power = 0;
    var goods_intellect = 0;
    var goods_leadership = 0;
    if(goods)
    {
      for(var i=0;i<goods.length;i++)
      {
        goods_power+=goods[i].power;
        goods_intellect+=goods[i].intellect;
        goods_leadership+=goods[i].leadership;
      }
    }
    html += "<div class='col-md-4'>";
    html += "<div class='card mb-1 box-shadow bg-dark character-plate-selection' data-id='" + character.id + "'>";
    html +="<div class='row row-no-padding'>";
    html += "<div class='col-md-5 col-sm-6 p0'>";
    html += "<img class='card-img-top character-image' src='assets/img/characters/" + character.code + ".png' alt='" + character.name + "'>";
    html += "</div>"
    html += "<div class='col-md-7 col-sm-6 p0'>";
    // zhtml += "<div class='card mb-0 box-shadow bg-light'>";
    html += "<p class='text-center text-info character-name'>" + character.name + "</p>"
    if(goods_power>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + (power + goods_power) + " (+" + goods_power + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + power + "</span></small></div></div>";
    }

    if(goods_intellect>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + (intellect + goods_intellect) + " (+" + goods_intellect + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + intellect + "</span></small></div></div>";
    }

     if(goods_leadership>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + (leadership + goods_leadership) + " (+" + goods_leadership + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + leadership + "</span></small></div></div>";
    }// html += "</div>" //box-shadow 
    html += "</div>" // card-body
    html += "</div>"
    html += "</div>"
    html += "</div>"

  })
  html += "</div>"

  $('.characterdetails-placeholder').html(html);
}

function listCharacterDetails(character)
{
  var html="";
  html += "<div class='row'>";
    html += "<div class='col-md-12'>";
    html += "<div class='card mb-1 bg-transparent character-details-plate' data-id='" + character.id + "'>";
    
    html += "<img class='character-details-image' src='assets/img/characters/" + character.code + ".png' alt='" + character.name + "'>";
    if(character.skillclasss)
    {
      html += "<img class='character-details-skill' src='assets/img/skills/" + character.skillclasss.code + ".png' data-toggle='tooltip' title='" + character.skillclasss.name + "' alt='" + character.skillclasss.name + "'>";
   
    }
    
    if(character.goods)
    {
      $.each(character.goods,function(i){
        var good = character.goods[i];
        if(good.type == 1)
        {
          html += "<img class='character-details-good-1' src='assets/img/goods/" + good.code + ".png' data-toggle='tooltip' title='" + good.name + "' alt='" + good.name + "'>";
        }else if(good.type == 2)
        {
          html += "<img class='character-details-good-2' src='assets/img/goods/" + good.code + ".png' data-toggle='tooltip' title='" + good.name + "' alt='" + good.name + "'>";
        }else if(good.type == 3)
        {
          html += "<img class='character-details-good-3' src='assets/img/goods/" + good.code + ".png' data-toggle='tooltip' title='" + good.name + "' alt='" + good.name + "'>";
        }

      });

    }

    // html += "<img class='character-details-good-1' src='assets/img/goods/goods15.png' alt='" + character.name + "'>";
    // html += "<img class='character-details-good-2' src='assets/img/goods/goods103.png' alt='" + character.name + "'>";
    // html += "<img class='character-details-good-3' src='assets/img/goods/goods215.png' alt='" + character.name + "'>";
    
    html += "</div>"
    html += "</div>"
  html += "</div>"

  $('.characterdetails-placeholder').html(html);
}

function listCharacters(characters)
{
  var html="";
  html += "<div class='row'>";
  $.each(characters,function(i){
    var character = characters[i];
    var goods = character.goods;

    var power = character.power;
    var intellect = character.intellect;
    var leadership = character.leadership;

    var goods_power = 0;
    var goods_intellect = 0;
    var goods_leadership = 0;
    if(goods)
    {
      for(var i=0;i<goods.length;i++)
      {
        goods_power+=goods[i].power;
        goods_intellect+=goods[i].intellect;
        goods_leadership+=goods[i].leadership;
      }
    }
    html += "<div class='col-md-4'>";
    html += "<div class='card mb-1 box-shadow bg-dark character-plate' data-id='" + character.id + "'>";
    html +="<div class='row row-no-padding'>";
    html += "<div class='col-md-5 col-sm-6 p0'>";
    html += "<img class='card-img-top character-image' src='assets/img/characters/" + character.code + ".png' alt='" + character.name + "'>";
    html += "</div>"
    html += "<div class='col-md-7 col-sm-6 p0'>";
    // zhtml += "<div class='card mb-0 box-shadow bg-light'>";
    html += "<p class='text-center text-info character-name'>" + character.name + "</p>"
    if(goods_power>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + (power + goods_power) + " (+" + goods_power + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + power + "</span></small></div></div>";
    }

    if(goods_intellect>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + (intellect + goods_intellect) + " (+" + goods_intellect + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + intellect + "</span></small></div></div>";
    }

     if(goods_leadership>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + (leadership + goods_leadership) + " (+" + goods_leadership + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + leadership + "</span></small></div></div>";
    }
    html += "</div>" // card-body
    html += "</div>"
    html += "</div>"
    html += "</div>"

  })
  html += "</div>"

  $('.characters-placeholder').html(html);
}
function listCharacterClasses(characters)
{
  renderCharactersGrid(characters, $('.characterclasses-placeholder'))
}

function listPlayerGuards(characters)
{
  renderCharactersGrid(characters, $('.guards-placeholder'))
}

function listGoodClasses(goods)
{
  renderGoodGrid(goods, $('.goodclasses-placeholder'))
  RegisterMarketEvents();
}

function listPlayerGoods(goods)
{
  renderPlayerGoodGrid(goods, $('.goods-placeholder'))
  RegisterCharacterEvents();
  RegisterTooltips();
}
function listHarvest(city)
{
  var html="";
  html += "<div class='row'>";
  html += "<div class='col-md-4'>";
  var canHarvest = true;
  var ageObj;
  if(city.harvested)
  {
    if(city.harvest_endts)
    {
        var now = new Date().getTime();
        if((now - city.harvest_endts) < 0) 
        {
            canHarvest = false;

            ageObj = retureTimeDifferenceInDays(now - city.harvest_endts)

        }
    }
  }
  if(canHarvest)
  {
     html += "可以进行征收 <img class='btn-harvest' src='assets/img/getEquipBt1.png'>";
  }else{
     html += "<span class='text-warning'>请等待" + ageObj.number + " " + ageObj.type + "再征收</span>";
  }

  html += "</div>";
  html += "</div>";

  $('.harvest-placeholder').html(html);
}
function renderCharactersGrid(characters,placeholder)
{
  var html="";
  html += "<div class='row'>";
  $.each(characters,function(i){
    var character = characters[i];
    var goods = character.goods;

    var power = character.power;
    var intellect = character.intellect;
    var leadership = character.leadership;

    var goods_power = 0;
    var goods_intellect = 0;
    var goods_leadership = 0;
    if(goods)
    {
      for(var i=0;i<goods.length;i++)
      {
        goods_power+=goods[i].power;
        goods_intellect+=goods[i].intellect;
        goods_leadership+=goods[i].leadership;
      }
    }
    

    html += "<div class='col-md-4'>";
    html += "<div class='card mb-1 box-shadow bg-dark pet-bg-0'>";
    html +="<div class='row row-no-padding '>";
    html += "<div class='col-md-5 col-sm-6 p0'>";
    html += "<img class='card-img-top character-image' src='assets/img/characters/" + character.code + ".png' alt='" + character.name + "'>";
    html += "</div>"
    html += "<div class='col-md-7 col-sm-6 p0 '>";
    // zhtml += "<div class='card mb-0 box-shadow bg-light'>";
    html += "<p class='text-center text-info character-name'>" + character.name + "</p>"

    if(goods_power>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + (power + goods_power) + " (+" + goods_power + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 " + power + "</span></small></div></div>";
    }

    if(goods_intellect>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + (intellect + goods_intellect) + " (+" + goods_intellect + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 " + intellect + "</span></small></div></div>";
    }

     if(goods_leadership>0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + (leadership + goods_leadership) + " (+" + goods_leadership + ")</span></small></div></div>";
    }else{
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 " + leadership + "</span></small></div></div>";
    }
    
    // html += "</div>" //box-shadow 
    html += "</div>" // card-body
    html += "</div>"
    html += "</div>"
    html += "</div>"

  })
  html += "</div>"
  $(placeholder).html(html);
}

function renderPlayerGoodGrid(goods,placeholder)
{
  var html="";
  html += "<div class='row'>"; 
  html += "<div class='col-md-12'>";
  html += "<small><span class='text-normal'>点击以下宝物装配</span></small>";
  html += "</div>"
  html += "<div class='col-md-12'>";
  $.each(goods,function(i){
    var good = goods[i];
    html += "<img class='m-2 good-image-small btn-equipgear' data-id='" + good.id + "' src='assets/img/goods/" + good.code + ".png' alt='" + good.name + "' data-toggle='tooltip' title='" + good.name + "'>";  
  })
  html += "</div>"
  html += "</div>"
  $(placeholder).html(html);
}
function renderGoodGrid(goods,placeholder)
{
  var html="";
  html += "<div class='row'>";
  $.each(goods,function(i){
    var good = goods[i];
        html += "<div class='col-md-4'>";
    html += "<div class='card mb-1 box-shadow bg-dark pet-bg-0'>";
    html +="<div class='row row-no-padding '>";
    html += "<div class='col-md-6 col-sm-6 p0'>";
    html += "<img class='card-img-top character-image' src='assets/img/goods/" + good.code + ".png' alt='" + good.name + "'>";
    html += "</div>"
    html += "<div class='col-md-6 col-sm-6 p0 '>";
    // zhtml += "<div class='card mb-0 box-shadow bg-light'>";
    html += "<p class='text-center text-info character-name'>" + good.name + "</p>"
    if(good.power > 0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>武力 +" + good.power + "</span></small></div></div>";
    
    }
    if(good.intellect > 0)
    {
      html += "<div class='row mt-0 ml-1 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>智力 +" + good.intellect + "</span></small></div></div>";
    
    }
    if(good.leadership > 0)
    {
       html += "<div class='row mt-0 ml-1 mb-2 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><span class='text-normal'>统帅 +" + good.leadership + "</span></small></div></div>";
   
    }
    html += "<div class='row mt-0 ml-1 mb-2 text-info'><div class='col-md-12 col-sm-12 col-xs-12'><small>" + good.gold + " 黄金</small></div></div>"

    if(good.sold)
    {
      html += "<div class='row mt-2 ml-3 mb-0 text-muted text-center'>已购买</small></div>";
   

    }else{
      html += "<div class='row mt-2 ml-1 mb-0 text-normal'><div class='col-md-12 col-sm-12 col-xs-12'><small><img src='assets/img/buyBt2.png' class='btn-buygood' data-id='" + good.id + "' alt='" + good.gold + "'></small></div></div>";
   
    }
     

    html += "</div>" // card-body
    html += "</div>"
    html += "</div>"
    html += "</div>"

  })
  html += "</div>"
  $(placeholder).html(html);
}

function listPlayerLog(logs)
{
  var html="";
  html += "<div class='row'>";
  $.each(logs,function(i){
    var log = logs[i];

    var now = new Date().getTime();
      var diff = now - log.ts;
      var ageObj = retureTimeDifferenceInDays(diff);

      html += "";
      html += "<div class='col-md-12'>";
      html += "<p class='text-normal'>" + ageObj.number + " " + ageObj.type + "前: " + log.msg + "</p>";
      
      html += "</div>";


  })
  html += "</div>"
  $('.logs-placeholder').html(html);
}

function listLeaderboard(leaders)
{
  var html="";
  html += "<div class='row'>";
  var leaders1 = leaders[0];
  var leaders2 = leaders[1];
  var leaders3 = leaders[2];

  
  html += fetchLeaderboardItem(leaders1,'魏王', 'text-primary')
  html += fetchLeaderboardItem(leaders2,'蜀王','text-danger')
  html += fetchLeaderboardItem(leaders3,'吴王','text-success')


  html += "</div>"
  $('.leaderboard-placeholder').html(html);
}

function fetchLeaderboardItem(leaders, title, textstyle)
{
   var html = "";
   if(leaders)
  {
    html += "<div class='col-md-4'>";
    if(leaders.length>0)
    {
    html += "<h5 class='card-header text-center " + textstyle + "'>" + title + "</h5>"
    html += "<div class='card bg-transparent'>"
    html += "<div class='card-body bg-transparent leaderboard-placeholder'>"
    html += "<h5 class='text-dark text-center'>" + leaders[0].name + "</h5>";
    html += "<p class='text-dark text-center'>" + retureShortAddress(leaders[0].from) + "</p>";
    html += "<p class='text-dark text-center'>声望 " + leaders[0].reputation + "</p>";
    html += "</div>";
    html += "</div>";
    }

    if(leaders.length>1)
    {
    html += "<p class='mt-2 mb-0 text-center text-dark'> <span class='" + textstyle + "'>丞相</span> " + leaders[1].name + " 声望 " + leaders[1].reputation + "</p>";
    
    }

    if(leaders.length>2)
    {
    html += "<p class='mt-0 mb-0 text-center text-dark'><span class='" + textstyle + "'>都督</span> " + leaders[2].name + " 声望 " + leaders[2].reputation + "</p>";
   
    }



    html += "</div>";

  }
  return html;
}

function openViewPlayerModal(id)
{

	$('#viewPlayerModal').modal('show')
}
function viewLogs()
{
  
  $('#viewLogsModal').modal('show');
  getPlayerLog();
}

function viewOffice()
{
  
  $('#viewOfficeModal').modal('show');
  $('#txtSelectedGuards').val('');
  getPlayerGuards();
  getPlayerCharacter();
}
function viewInn()
{
   $('#viewInnModal').modal('show');
}

function viewMarket()
{
 $('#viewGoodClassesModal').modal('show')
 getGoodClasses();
}

function viewCharacters()
{
  
  $('#viewCharacters').modal('show');
  $('#txtSelectedCharacter').val('');
  $('.characters-placeholder').html('');
  $('.goods-placeholder').html('');
  getCharacters();
}

function viewHarvest()
{
  $('#viewHarvestModal').modal('show');
  checkHarvest()
}

function viewLeaderboard()
{
  $('#viewLeaderboardModal').modal('show');
}
function viewOtherCity(address)
{
   resetCityStats();
   $('#viewOtherCityModal').modal('show');
   $('#txtOtherCityAddress').val(address);
   getCity(address);


}



function viewInitModal()
{
  $('#initModal').modal('show');
}

function initCityModal(x,y)
{
  //toastr.remove();
  $('#txtInitX').val(x);
  $('#txtInitY').val(y);
  $('#lblXY').html('<span class="text-info">[' + x + ',' + y + ']</span>');
  var name= $('#txtWalletAddress').val();
  $('#txtCityName').val(name);
  $('#initCityModal').modal('show');
}

function setInit(init)
{
  if(init)
  {
    $('#cbInitCity').prop('checked', true);
    toastr.options.timeOut = "30000";
    toastr["info"]("请在地图上选择主公的城市位置");
  }else{
    $('#cbInitCity').prop('checked', false)

  }
}



function toggleFactionSelection(obj)
{
  $(".faction-flag").removeClass('border-selected');
  $(obj).addClass('border-selected');
  var id = $(obj).data('id')
  $('#txtInitFaction').val(id);
}

function toggleGuardSelection(obj)
{
  var arr = $('#txtSelectedGuards').val()
  var guards =JSON.parse("[" + arr + "]");
  var id = parseInt($(obj).data('id'));

  if(guards.indexOf(id) > -1) // contain, to be removed
  {
   $(obj).removeClass('border-selected');
    var index = guards.indexOf(id);
    if (index > -1) {
      guards.splice(index, 1);
    }
  }else{ // not contain, add to array
    if(guards.length<6)
    {
      $(obj).addClass('border-selected');
      guards.push(id);
    }
  }
  $('#txtSelectedGuards').val(guards.join());
}
function retureShortAddress(str)
{
    var r=str
    if(str.length>8)
    {
      r= str.substr(0, 4) + '...' + str.substr(str.length-4, 4)
    }
    return r;
}
function retureTimeDifferenceInDays(diff)
{

  var r = {};

  // get total seconds between the times
  var delta = Math.abs(diff) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);

  // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;

  // what's left is seconds
  var seconds = Math.floor(delta % 60); 

  if(days>0)
  {
      r.number = days;
      r.type = "天";
  }else{
    if(hours>0)
    {
        r.number = hours;
        r.type = "小时";
    }else{
      if(minutes>0)
      {
          r.number = minutes;
          r.type = "分钟";
      }else{
        if(seconds>0)
        {
            r.number = seconds;
            r.type = "秒";
        }else{

          r.number = 0;
            r.type = "";
        }
        
      }
      
    }

  }

  return r;
}

function RegisterTooltips()
{
  $('[data-toggle="tooltip"]').tooltip(); 
}

function RegisterHarvestEvents()
{
  $('.btn-harvest').unbind("click");
  $('.btn-harvest').click(function(){
    harvestCity();
  });

}


function RegisterMarketEvents()
{
  $('.btn-buygood').unbind("click");
  $('.btn-buygood').click(function(){
    var id= $(this).data('id');
    buyGood(id);
  });

}

function RegisterOfficeEvents()
{
  $('.character-plate').unbind("click");
  $('.characters-placeholder .character-plate').click(function(){
    toggleGuardSelection(this);
  });

}

function RegisterCharacterEvents()
{
  $('.character-plate-selection').unbind("click");
  $('.character-plate-selection').click(function(){
    var id = $(this).data('id');
    getCharacter(id);
    $('#txtSelectedCharacter').val(id);
    getPlayerGoods();
  });

  $('.btn-equipgear').unbind("click");
  $('.btn-equipgear').click(function(){

    var id = $(this).data('id');
    var characterid = parseInt($('#txtSelectedCharacter').val());
    equipGear(parseInt(id),parseInt(characterid));
  });



}



function RegisterEvents()
{
  $(".faction-flag").click(function(){
    toggleFactionSelection(this);
  });

  
  $('#getLogs').unbind("click");
  $('#getLogs').click(function(){
    viewLogs();
  })

  

  $('#selectInnerCity').unbind("click");
  $('#selectInnerCity').click(function(){
    if(!$('#cbInitCity').prop('checked'))
    {
      initInnerCity();
    }else{
      toastr.options.timeOut = "30000";
      toastr["info"]("请在地图上选择主公的城市位置");
    }
  })
  $('#selectWorldMap').unbind("click");
  $('#selectWorldMap').click(function(){
  	initOutCity();
  })
  $('.btn-viewplayer').unbind("click");
  $('.btn-viewplayer').click(function(){
  	$('#viewPlayerModal').modal('show')
  })


   $('#getPlayerLog').unbind("click");
  $('#getPlayerLog').click(function(){
    getPlayerLog();
  })

   $('#searchCharacter').unbind("click");
  $('#searchCharacter').click(function(){
    searchCharacter();
  })


 $('#attackCity').unbind("click");
  $('#attackCity').click(function(){
    var address = $('#txtOtherCityAddress').val();
    playSound('war');
    attackCity(address);
  })

  

  $('#getClasses').unbind("click");
  $('#getClasses').click(function(){
    $('#viewClassModal').modal('show')
  	getClasses();
  })

  

   $('#getRanks').unbind("click");
  $('#getRanks').click(function(){
    $('#viewLeaderboardModal').modal('show')
    getLeaderboard();

  })


 $('.btn-updateguards').unbind("click");
 $('.btn-updateguards').click(function(){

      var ids = $('#txtSelectedGuards').val();
      ids = JSON.parse("[" + ids + "]");
      if(ids.length<=0)
      {
        toastr["warning"]("部队需要最少选择一名武将");
      }else{
        if(ids.length>6)
        {
          toastr["warning"]("部队最多只能选择六名武将");
        }else{
          updateGuards(ids);
        }

      }
      

 });

 $('.btn-initcity').unbind("click");
  $('.btn-initcity').click(function(){
    var x= $('#txtInitX').val();
    var y= $('#txtInitY').val();
    var n= $.trim($('#txtCityName').val());
    var f= $('#txtInitFaction').val();
      if(n=="")
      {
        toastr.remove();
        toastr.options.timeOut = "5000";
        toastr["warning"]("请填写名称");
        return false;

      }else{
        if(n.length>10||n.length<1)
        {
          toastr["warning"]("名称需为1到10个字");
          return false;
        }else{
          if(f=="")
          {
            toastr.remove();
            toastr.options.timeOut = "5000";
            toastr["warning"]("请选择势力");
            return false;
          }
        }
      }
      
     initCity(x,y,n,f);
  })
$('#getCities').unbind("click");
  $('#getCities').click(function(){

    getCities();

  })

$('#getCharacter').unbind("click");
  $('#getCharacter').click(function(){
    var id = parseInt($('#txtCharacterID').val())
    $('#txtCharacter').val('')
    getCharacter(id);

  })



  $('#updateCityCount').unbind("click");
  $('#updateCityCount').click(function(){
    
    updateCityCount(74);

  })

  $('#updateCharacterCount').unbind("click");
  $('#updateCharacterCount').click(function(){
    
    updateCharacterCount(193);

  })

  var indexC = 0;

  $('#loopGetCharacter').unbind("click");
  $('#loopGetCharacter').click(function(){
    
    scrapeCharacter()
  })


  function scrapeCharacter()
  {
    getCharacter(indexC);
    indexC++;
    if(indexC<194)
    {
     setTimeout(scrapeCharacter, 5000)
    }
  }


$('#importCities').unbind("click");
  $('#importCities').click(function(){
    var str = JSON.parse($('#txtImportCities').val());
    ImportCities(str);

  })



$('#importCharacters').unbind("click");
  $('#importCharacters').click(function(){
    var str = JSON.parse($('#txtImportCharacters').val());
    ImportCharacters(str);

  })

  $('#withdraw').unbind("click");
  $('#withdraw').click(function(){
    withdrawFund();

  })


  $('#validate').unbind("click");
  $('#validate').click(function(){
   for(var i=-5;i<200;i++)
     {
        var find = false;
         for(var j=0;j<chars.length;j++)
         {
            if(chars[j].id == i)
            {
                find = true;
                break;
            }
         }
         if(!find)
         {
            console.log('NO:' + i.toString());
         }
         
     }

  })
}




