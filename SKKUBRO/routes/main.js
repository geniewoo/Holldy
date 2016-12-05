var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	visitorsController.countUpVisitors(req, res, '/main', function(result){
		if(result === true){
			fs.readFile('views/main.html',function(error, data){
				res.send(data.toString());
			});
		}else{
			res.send({code:0,err_msg:'visitor error'});
		}
	});
});

module.exports = router;