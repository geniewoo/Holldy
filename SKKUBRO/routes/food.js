var express = require('express');
var fs = require('fs');
var ck = require('./ck.js');
var router = express.Router();
var productsDao = require('./productsDao.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	ck.saveCookie(req.query, res, function(){
		fs.readFile('views/food.html', function(error, data){
			res.send(data.toString());
		});
	});
});

router.get('/get_food_selected', function(req, res, next) {
	if(req.session.food_selected){
		var food_selected = JSON.parse(req.session.food_selected)
		var food_selected_Arr = [];
		food_selected.forEach(function(item, index){
			food_selected_Arr.push({'_id' : item._id});
		});
		productsDao.getProducts(food_selected_Arr, {}, {_id : 1}, function(data){
			res.json({'code' : 1, 'food_selected' : JSON.stringify(data)});
		});
	}else{
		res.json({'code' : 0, 'err_msg' : 'there is no food_selected session'});
	}
});

router.post('/post_selected', function(req, res, next){
	req.session.food_selected = req.body.products;
	res.json({'code' : 1});
});

router.get('/selected', function(req, res, next){
	fs.readFile('views/food_selected.html',function(error, data){
		res.send(data.toString());
	});
});

router.get('/get_products', function(req, res, next){
	productsDao.getProducts([],{},{_id : 1}, function(data){
		res.json({'products' : data});
	});
});

module.exports = router;