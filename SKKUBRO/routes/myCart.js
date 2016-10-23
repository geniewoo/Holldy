var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['products']);
var async = require('async');
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
	console.log('1');
	var cart_food_Arr = [];
	async.waterfall([
		function(callback){
			console.log('2');
			if(req.cookies.cart_food){
				console.log('3');
				var cart_food = req.cookies.cart_food;
				cart_food.forEach(function(carts, index1){
					console.log('4', carts);
					var carts_Arr = [];
					console.log('5');
					carts.forEach(function(item, index2){
						console.log('item', item);
						db.products.findOne({'_id' : item._id}, function(error, data){
							console.log('item._id' , item._id);
							if(error){
								res.json({'code' : 0, 'err_msg' : 'get_foodProducts_db_error'});
							}
							data.num = item.num;
							carts_Arr.push(data);
							console.log('carts_Arr._id' , carts_Arr);
							if(index1 + 1 === cart_food.length && index2 + 1 === carts.length){
								callback();
							}
						});
					});
					cart_food_Arr.push(carts_Arr);
					console.log('cart_food_Arr' , cart_food_Arr);
				});
			}else{
				res.json({'code' : 0, 'err_msg' : 'there is no food_selected session'});
			}
		},
		function(callback){
			console.log('6');
			res.json({'code' : 1, 'cart_food' : JSON.stringify(cart_food_Arr)});
			console.log('7');
			callback(null, '끝');
		}
		], function(err, result){
			console.log(result);
		});
});
module.exports = router;