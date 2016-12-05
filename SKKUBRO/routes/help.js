module.exports = function(io) {
	var express = require('express');
	var fs = require('fs');
	var router = express.Router();
	var visitorsController = require('./visitorsController.js');

	router.get('/', function(req, res, next) {
		visitorsController.countUpVisitors(req, res, '/help', function(result){
			if(result === true){
				fs.readFile('views/help.html', function(error, data) {
					res.send(data.toString());
				});
			}else{
				res.send({code:0,err_msg:'visitor error'});
			}
		});
	});
	return router;
}
