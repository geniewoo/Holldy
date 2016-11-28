var express = require('express');
var fs = require('fs');
var router = express.Router();
var productsDao = require('./productsDao.js');
var session = require('./session.js');
var myCartDao = require('./myCartDao.js');
var async = require('async');
/* GET home page. */
router.post('/post_foodProducts', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            var cartCookiePush = function(nextfun) {
                cookies_cart_food.push(cart_food);
                nextfun(sendJson);
            }
            var putInCookie = function(nextfun) {
                res.cookie('cart_food', cookies_cart_food);
                nextfun();
            }
            var sendJson = function() {
                res.json({
                    'code': 1
                });
            }
            var cart_food = JSON.parse(req.body.cart_product);
            var cookies_cart_food;
            if (req.body.index) { //수정하는경우
                cookies_cart_food = req.cookies.cart_food;
                cookies_cart_food[req.body.index - 1] = cart_food;
                putInCookie(sendJson);
            } else { //새로 넣는 경우
                if (req.cookies.cart_food) {
                    cookies_cart_food = req.cookies.cart_food;
                } else {
                    cookies_cart_food = [];
                }
                cartCookiePush(putInCookie);
            }
        } else if (result === 1 || result === 2) {
            if (req.body.cart_food_ID) { //수정하는 경우
                myCartDao.updateMyCart(JSON.parse(req.body.cart_product), 'food', req.session, req.body.cart_food_ID, function(result) {
                    if (result) {
                        res.json({
                            'code': 1
                        });
                    } else {
                        res.json({
                            'code': 0
                        });
                    }
                });
            } else {
                myCartDao.insertMyCart([JSON.parse(req.body.cart_product)], 'food', req.session, function(result) {
                    if (result) {
                        res.json({
                            'code': 1
                        });
                    } else {
                        res.json({
                            'code': 0
                        });
                    }
                });
            }
        }
    });
});
router.get('/', function(req, res, next) {
    fs.readFile('views/myCart.html', function(error, data) {
        res.send(data.toString());
    });
});
router.get('/get_foodProducts', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            var cart_food = req.cookies.cart_food;
            if (cart_food) {
                makeFoodCartJsonAndSendToFront1(cart_food, res);
            } else {
                res.json({
                    'code': 0,
                    'err_msg': 'there is no food_selected coockies'
                });
            }
        } else {
            myCartDao.getMyCart(req.session.localLogin.local_ID, 'food', function(data) {
                if (data && data.length > 0) {
                    makeFoodCartJsonAndSendToFront2(data, res);
                } else {
                    res.json({
                        'code': 0,
                        'err_msg': 'there is no food_selected coockies'
                    });
                }
            });
        }
    });
});
router.get('/get_changeFoodCart', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            var index = Number(req.query.index);
            var cart_food = req.cookies.cart_food;
            if (index <= cart_food.length) {
                for (var i = index - 1; i < cart_food.length - 1; i++) {
                    cart_food[i] = cart_food[i + 1];
                }
                cart_food.pop();
                res.cookie('cart_food', cart_food);
                res.json({
                    'code': 1
                });
            } else {
                res.json({
                    'code': 0,
                    'err_msg': 'index is longer than cart'
                });
            }
        } else {
            var cart_food_ID = req.query.cart_food_ID;
            console.log('cart_food_ID', cart_food_ID);
            myCartDao.deleteMyCart(cart_food_ID, req.session, 'food', function(result) {
                if (result) {
                    res.json({
                        'code': 1
                    });
                } else {
                    res.json({
                        'code': 0,
                        'err_msg': 'index is longer than cart'
                    });
                }
            });
        }
    });
});
var makeFoodCartJsonAndSendToFront1 = function(cart_food, res) {
    var cart_food_Arr = [];
    var cart_food_Num = [];
    var index = 0;
    var getCartFood = function(cart_food, index) {
        var carts = cart_food[index];
        var carts_Arr = [];
        var carts_Num = [];
        carts.forEach(function(item) {
            carts_Arr.push({
                '_id': item._id
            });
            carts_Num.push(item.num);
        });
        productsDao.getProducts(carts_Arr, {
            category: 0,
            content: 0,
            default: 0,
            info: 0,
            url: 0,
            unit: 0
        }, {
            _id: 1
        }, function(data) {
            cart_food_Arr.push(data);
            cart_food_Num.push(carts_Num);
            if (index + 1 === cart_food.length) {
                res.json({
                    'code': 1,
                    'cart_food_Arr': JSON.stringify(cart_food_Arr),
                    'cart_food_Num': JSON.stringify(cart_food_Num)
                });
            } else {
                getCartFood(cart_food, index + 1);
            }
        });
    }
    getCartFood(cart_food, index);
}
var makeFoodCartJsonAndSendToFront2 = function(cart_food, res) {
    var cart_food_Arr = [];
    var cart_food_Num = [];
    var cart_food_ID = [];
    var getCartFood = function(cart_food, index) {
        var carts = cart_food[index].cartInfo;
        cart_food_ID.push(cart_food[index]._id);
        var carts_Arr = [];
        var carts_Num = [];
        carts.forEach(function(item) {
            carts_Arr.push({
                '_id': item._id
            });
            carts_Num.push(item.num);
        });
        productsDao.getProducts(carts_Arr, {
            category: 0,
            content: 0,
            default: 0,
            info: 0,
            url: 0,
            unit: 0
        }, {
            _id: 1
        }, function(data) {
            cart_food_Arr.push(data);
            cart_food_Num.push(carts_Num);
            if (index + 1 === cart_food.length) {
                res.json({
                    'code': 2,
                    'cart_food_Arr': JSON.stringify(cart_food_Arr),
                    'cart_food_Num': JSON.stringify(cart_food_Num),
                    'cart_food_ID': JSON.stringify(cart_food_ID)
                });
            } else {
                getCartFood(cart_food, index + 1);
            }
        });
    }
    var index = 0;
    getCartFood(cart_food, index);
}
module.exports = router;
