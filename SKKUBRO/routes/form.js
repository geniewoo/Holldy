var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/post_travelInfo', function(req, res, next) {
	var travel = JSON.parse(req.body.travelForm);
	res.cookie('travelForm', travel);
	res.json({'code' : 1});
});

module.exports = router;