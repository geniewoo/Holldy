var express = require('express');
var session = require('./session.js');
var fs = require('fs');
var router = express.Router();
var async = require('async');
var visitorsController = require('./visitorsController.js');

router.post('/post_pensionOptions', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        console.log('options1');
        if (result === 0) { //비로그인경우
            console.log('options2');
            var pensionOptions = JSON.parse(req.body.pensionOptions);
            var cookies_cart_pension;
            async.waterfall([
                function(callback) {
                    if (req.cookies.cart_pension) {
                        cookies_cart_pension = req.cookies.cart_pension;
                    } else {
                        cookies_cart_pension = [];
                    }
                    callback(null);
                },
                function(callback) {
                    cookies_cart_pension.push(pensionOptions);
                    callback(null);
                },
                function(callback) {
                    res.cookie('cart_pension', cookies_cart_pension);
                    callback(null);
                }
                ],
                function(err) {
                    if (err) {} else {
                        res.json({
                            code: 1
                        });
                    }
                }
                );
        }
        console.log('options3');
    });
});
router.get('/', function(req, res, next) {
    visitorsController.countUpVisitors(req, res, '/pension', function(result){
        if(result === true){
            fs.readFile('views/pension.html', function(error, data) {
                res.send(data.toString());
            });
        }else{
            res.send({code:0,err_msg:'visitor error'});
        }
    });
});
module.exports = router;
