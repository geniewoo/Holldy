var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('/order');
    fs.readFile('views/order.html', function(error, data) {
        console.log('data', data);
        res.send(data.toString());
    });
});
router.get('/get_tempSave', function(req, res, next){
    console.log('/get_tempSave');
    var orderTemp = req.session.order;
    console.log(orderTemp);
    if(orderTemp){
        var foodCart = orderTemp.foodCart;
        var busCart = orderTemp.foodCart;
        var pension = orderTemp.pensionCart;
        console.log('foodCart', foodCart);
        req.session.order = undefined;
        console.log('undefineded');
        res.json({cart_food : foodCart});
    }
});
router.post('/post_tempSave', function(req, res, next) {
    if (req.body.type == 1) {
        var index = req.body.food_index - 1;
        console.log('index', index);
        var cart_food = req.cookies.cart_food;
        console.log('cart_food', cart_food);
        if (cart_food) {
            var foodCart = cart_food[index];
            console.log('foodCart', foodCart);
            req.session.order = {
                "foodCart": foodCart
            }; //나중에 이런식으로 bus, pension 추가.
            res.json({code : 1});
        }
    }else{
        res.json({code : 0, err_msg : "선택된 항목이 없습니다"});
    }
});
module.exports = router;
