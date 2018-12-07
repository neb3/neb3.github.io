
"use strict";

var dappAddress = "n21ecdFU6evmmRcnzpG1CUEmJnBY5tYkVQp";

//here we use neb.js to call the "get" function to search from the Dictionary
var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();
var serialNumber



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
                $(".walletRequired").addClass("d-none");
                callback();

            }
        }
    });
}


$(document).ready(function() {
      // planetarium = new VirtualSky({id:'starmapper',callback:{geo:geoIP}});


      var planetarium = $.virtualsky({
        id:"starmapper", 
        projection:"stereo",
        showgalaxy:true,
        magnitude:100000000000000,
        scalestars:2,
        showstars:true,
        showstarlabels:true,
        constellations: true,
        constellationlabels: true,
        fullscreen:true,
        live:false,
          lang:'cn'});

        var size_x = 100;
        var size_y = 10;
      starmapper_inner.addEventListener('click', function(e) { 
               //console.log(planetarium.positions)

               var p = getMousePos(e);
               //console.log(p.x + " | " + p.y)

               for(i = 0; i < planetarium.positions.length; i++){
          if (p.x >= planetarium.positions[i].x && p.x <= (planetarium.positions[i].x + size_x) &&
                

                p.y <= (planetarium.positions[i].y + size_y) &&
                p.y >= (planetarium.positions[i].y - size_y)

                ) {
               
                openStarModal(planetarium.positions[i].label);
                break;
            }
        }



      }, false);




      function getMousePos(e) {
          var r = starmapper_inner.getBoundingClientRect();
          return {
              x: e.clientX - r.left,
              y: e.clientY - r.top
          };
      }

      
      getWallectInfo(function(){
          console.log("wallet loaded")
          RegisterEvents();
          CalculateTotal();
      });

      
});

function cbPush(resp) {

        if(resp)
        {
          closeStarModal();
        }
        
     }

function openStarModal(star)
      {
        $('.lblStar').html(star);
        $('#txtStar').val(star);

        var from = $("#txtWalletAddress").val();


        $('.divWishText').html("");
        $('#txtWish').val("");
        $('#starModal').modal('show');

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getWish";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[\"" + star + "\"]" //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
           

            if(resp.result)
            {
              var wish = JSON.parse(resp.result)
              if(wish)
              {
                var d = new Date(wish.ts);
                d = d.toDateString();

                $('.divWishText').html("<p><small class='text-muted'>" + wish.words + "</small></p><p><small class='text-muted'><em>" + d + "</em></small></p>");
                $('.divWishText').show();
                $('.divWishAdd').hide();
                $('.btn-submit').hide();
              }else{
                $('.divWishAdd').show();
                $('.divWishText').html("");
                $('.divWishText').hide();
                $('.btn-submit').show();
              }

            }else{
              $('.divWishAdd').show();
              $('.divWishText').html("");
              $('.divWishText').hide();
              $('.btn-submit').show();
            }
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
        


      }
      function closeStarModal()
      {

        $('.lblStar').html("");
        $('#txtStar').val("");
        $('#txtWish').val("");
        $('#starModal').modal('hide');
      }

function CalculateTotal()
{

        var from = $("#txtWalletAddress").val();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "countTotalWishes";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var callArgs = "[]" //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
           
             $('.totalWishes').html(resp.result);

            
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })

}


function RegisterEvents()
{

  

$(".btn-submit").click(function() {

    var star = $('#txtStar').val();
    var words = $('#txtWish').val();

    var to = dappAddress;
    var value = "0";
    var callFunction = "AddWish"
    var callArgs = "[\"" + star + "\",\"" + words + "\"]"
    
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush        //设置listener, 处理交易返回信息
    });

    // intervalQuery = setInterval(function () {
    //     funcIntervalQuery();
    // }, 5000);
});




}





