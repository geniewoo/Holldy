var express = require('express');
var fs = require('fs');
var router = express.Router();
var async = require('async');
var productsDao = require('./productsDao.js');
/* GET home page. */
router.post('/post_foodProducts', function(req, res, next) {
	var cart_food = JSON.parse(req.body.cart_product);
	var cookies_cart_food;
	if(req.cookies.cart_food){
		cookies_cart_food = req.cookies.cart_food;
	}else{
		cookies_cart_food = [];
	}
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
	cartCookiePush(putInCookie);
});
router.get('/', function(req, res, next){
	fs.readFile('views/myCart.html', function(error, data){
		res.send(data.toString());
	});
});
router.get('/get_foodProducts', function(req, res, next){
	var cart_food = req.cookies.cart_food;
	console.log('get_foodProducts1');
	if(cart_food){
		console.log('get_foodProducts2');
		var cart_food_Arr = [];
		cart_food.forEach(function(carts, index1){
			console.log('get_foodProducts3');
			var carts_Arr = [];
			carts.forEach(function(item){
				console.log('get_foodProducts4');
				carts_Arr.push({'_id' : item._id});
			});
			console.log('get_foodProducts5');
			productsDao.getProducts(carts_Arr, {}, {_id : 1}, function(data){
				console.log('get_foodProducts6');
				cart_food_Arr.push(data);
				if(index1 + 1 === cart_food.length){
					res.json({'code' : 1, 'cart_food' : JSON.stringify(cart_food_Arr)});
				}
			});
		});
	}
	else{
		res.json({'code' : 0, 'err_msg' : 'there is no food_selected session'});
	}
});
module.exports = router;