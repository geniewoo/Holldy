var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.get('/post_foodProducts', function(req, res, next) {
	cart_product = req.body.cart_product;
	res.cookie('cart_product', cart_product);
	console.log(res.cookie.cart_product);
});

module.exports = router;