var express = require('express');
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['product']);
var ck = require('./ck.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	ck.saveCookie(req.query, res, function(){
		fs.readFile('views/food.html',function(error, data){
			res.send(data.toString());
		});
	});
});

router.get('/get_product', function(req, res, next) {
	db.product.find(){
		
	}
});

module.exports = router;