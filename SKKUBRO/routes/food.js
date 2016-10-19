var express = require('express');
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['product']);
var ck = require('./ck.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	ck.saveCookie(req.query, res, function(){
		fs.readFile('views/food.html', function(error, data){
			res.send(data.toString());
		});
	});
});

router.get('/get_food_selected', function(req, res, next) {
	res.json({'food_selected' : req.session.food_selected});
});

router.post('/post_selected', function(req, res, next){
	console.log(JSON.parse(req.body.products));
	req.session.food_selected = req.body.products;
	res.json({'code' : 1});
});

router.get('/selected', function(req, res, next){
	fs.readFile('views/food_selected.html',function(error, data){
		res.send(data.toString());
	});
});

module.exports = router;