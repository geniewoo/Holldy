var express = require('express');
var fs = require('fs');
var router = express.Router();
var async = require('async');
var productsDao = require('./productsDao.js');
/* GET home page. */

router.post('/post_foodProducts', function(req, res, next) {
	
	var cartCookiePush = function(nextfun){
		cookies_cart_food.push(cart_food);
		nextfun(sendJson);
	}
	var putInCookie = function(nextfun){
		res.cookie('cart_food', cookies_cart_food);
		nextfun();
	}
	var sendJson = function(){
		res.json({'code' : 1});
	}
	var cart_food = JSON.parse(req.body.cart_product);
	var cookies_cart_food;
	if(req.body.index){
		cookies_cart_food = req.cookies.cart_food;
		cookies_cart_food[req.body.index - 1] = cart_food;
		putInCookie(sendJson);
	}else{
		if(req.cookies.cart_food){
			cookies_cart_food = req.cookies.cart_food;
		}else{
			cookies_cart_food = [];
		}
		cartCookiePush(putInCookie);
	}
});
router.get('/', function(req, res, next){
	fs.readFile('views/myCart.html', function(error, data){
		res.send(data.toString());
	});
});
router.get('/get_foodProducts', function(req, res, next){
	var cart_food = req.cookies.cart_food;
	if(cart_food){
		var cart_food_Arr = [];
		var cart_food_Num = [];
		var index = 0;
		var getCartFood = function(cart_food, index){
			console.log('3');
			var carts = cart_food[index];
			var carts_Arr = [];
			var carts_Num = [];
			console.log('4');
			carts.forEach(function(item){
				carts_Arr.push({'_id' : item._id});
				carts_Num.push(item.num);
			});
			productsDao.getProducts(carts_Arr, {category : 0, content : 0, default : 0, info : 0, url : 0, unit : 0}, {_id : 1}, function(data){
				cart_food_Arr.push(data);
				cart_food_Num.push(carts_Num);
				if(index + 1 === cart_food.length){
					res.json({'code' : 1, 'cart_food_Arr' : JSON.stringify(cart_food_Arr), 'cart_food_Num' : JSON.stringify(cart_food_Num)});
				}else{
					getCartFood(cart_food, index + 1);
				}
			});
		}
		console.log('1');
		getCartFood(cart_food, index);
		console.log('2');
	}
	else{
		res.json({'code' : 0, 'err_msg' : 'there is no food_selected coockies'});
	}
});
router.get('/get_changeFoodCart', function(req, res, next){
	var index = Number(req.query.index);
	var cart_food = req.cookies.cart_food;
	if(index <= cart_food.length){
		for(var i = index - 1 ; i < cart_food.length - 1; i++){
			cart_food[i] = cart_food[i + 1];
		}
		cart_food.pop();
		res.cookie('cart_food', cart_food);
		res.json({'code' : 1});
	}else{
		res.json({'code' : 0, 'err_msg' : 'index is longer than cart'});
	}
});
module.exports = router;