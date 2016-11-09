var express = require('express');
var fs = require('fs');
var router = express.Router();
var productsDao = require('./productsDao.js');
var myCartDao = require('./myCartDao.js');
var session = require('./session.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readFile('views/food.html', function(error, data) {
        res.send(data.toString());
    });
});

router.get('/get_food_selected', function(req, res, next) {
    if (req.session.food_selected || req.query.cart) {
        var food_selected;
        if (req.query.cart === 'true') { //비로그인 상태
            findSelectedAndSendToFront(req.cookies.cart_food[req.query.index - 1]);
        } else if (req.query.cart_food_ID) { //로그인 상태
            session.loginStatus(req.session, function(result) {
                if (result === 0) {
                    res.send({
                        'code': 0,
                        'err_msg': 'notLogined'
                    });
                } else {
                    myCartDao.getMyCartOne('food', req.session, req.query.cart_food_ID, function(data) {
                        findSelectedAndSendToFront(data.cartInfo, req.query.cart_food_ID);
                    });
                }
            });
        } else {
            findSelectedAndSendToFront(JSON.parse(req.session.food_selected));
        }
    } else {
        res.json({
            'code': 0,
            'err_msg': 'there is no food_selected session'
        });
    }
});

router.post('/post_selected', function(req, res, next) {
    req.session.food_selected = req.body.products;
    res.json({
        'code': 1
    });
});

router.get('/selected', function(req, res, next) {
    fs.readFile('views/food_selected.html', function(error, data) {
        res.send(data.toString());
    });
});

router.get('/get_products', function(req, res, next) {
    productsDao.getProducts([], {}, {
        _id: 1
    }, function(data) {
        res.json({
            'products': data
        });
    });
});
var findSelectedAndSendToFront = function(food_selected, cart_food_ID) {
    var food_selected_Arr = [];
    var food_selected_Num = [];
    food_selected.forEach(function(item, index) {
        food_selected_Arr.push({
            '_id': item._id
        });
        food_selected_Num.push(item.num);
    });
    productsDao.getProducts(food_selected_Arr, {
        category: 0,
        default: 0,
        info: 0
    }, {
        _id: 1
    }, function(data) {
        if(cart_food_ID){
        res.json({
            'code': 1,
            'food_selected_Arr': JSON.stringify(data),
            'food_selected_Num': JSON.stringify(food_selected_Num),
            'cart_food_ID': cart_food_ID
        });
        }else{
        res.json({
            'code': 1,
            'food_selected_Arr': JSON.stringify(data),
            'food_selected_Num': JSON.stringify(food_selected_Num)
        });
        }
    });
}

module.exports = router;
