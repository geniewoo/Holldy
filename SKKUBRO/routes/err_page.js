var express = require('express');
var router = express.Router();
var visitorsController = require('./visitorsController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	visitorsController.countUpVisitors(req, res, '/err_page', function(result){
		if(result === true){
			res.send('없는 페이지거나 잘못된 접근입니다.');
		}else{
			res.send({code:0,err_msg:'visitor error'});
		}
	});
});

module.exports = router;
