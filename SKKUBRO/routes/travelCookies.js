var express = require('express');
var ck = require('./ck.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies.travelForm){
		res.json({
			'code' : 1,
			'travelForm' : req.cookies.travelForm
		});
	}else{
		res.json({'code' : 0, 'err_msg' : 'coockie가 없습니다'});
	}
});

module.exports = router;