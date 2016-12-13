var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');
var uploadDao = require('./uploadDao.js');

router.get('/', function(req, res, next) {
	visitorsController.countUpVisitors(req, res, '/community', function(result){
		if(result === true){
			fs.readFile('views/community.html', function(error, data){
				res.send(data.toString());
			});
		}else{
			res.send({code:0,err_msg:'visitor error'});
		}
	});
});
router.get('/readNotice', function(req, res, next){
	visitorsController.countUpVisitors(req, res, '/community/readNotice', function(result){
		if(result === true){
			fs.readFile('views/commReadNotice.html', function(error, data){
				res.send(data.toString());
			});
		}else{
			res.send({code:0,err_msg:'visitor error'});
		}
	});
});
router.get('/get_commNotice', function(req, res, next){
	noticeID = 'adminNotice' + req.query.noticeNum;
	uploadDao.findACommNotice({_id:noticeID},{_id:0}, function(data){
		if(data){
			res.json({
				code : 1,
				data : data

			});
		}
	});
});
module.exports = router;