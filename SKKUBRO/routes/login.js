var express = require('express');
var fs = require('fs');
var router = express.Router();
var clientDao = require('./clientDao.js');
var crypto = require('./crypto.js');
var session = require('./session.js');
var async = require('async');
var myCartDao = require('./myCartDao.js');

router.get('/modal', function(req, res, next) { //모달 띄울 html전달
    fs.readFile('views/login.html', function(error, data) {
        res.send(data.toString());
    });
});
router.get('/get_loginStatus', function(req, res, next) { //현재 로그인 되어있는지 확인 header를 쓰는 매 페이지마다 호출됨.
    session.loginStatus(req.session, function(result) {
        if (result === 1) {
            res.json({
                'code': result
            });
        } else {
            res.json({
                'code': result
            });
        }
    });
});
router.post('/post_checkLocal', function(req, res, next) { //로컬아이디가 있는지 확인.
    clientDao.checkLocal(req.body.fb_ID, function(result) {
        if (result) {
            cookieCartToDB(function(next) { // 함수에 함수 두개 들어감, 먼저 행할거, 콜백
                req.session.localLogin = {
                    fb_ID: req.body.fb_ID,
                    local_ID: result._id,
                    name: result.name
                };
                next();
            }, req, res, function() {
                res.json({
                    code: 1,
                    msg: "이미 회원가입 되어 있습니다."
                });
            });
        } else {
            res.json({
                code: 2,
                msg: "추가 회원가입이 필요합니다."
            });
        }
    });
});

router.get('/social_join', function(req, res, next) { //social_join 접속했을 때
    fs.readFile('views/social_join.html', function(error, data) {
        res.send(data.toString());
    });
});

router.get('/get_localLogout', function(req, res, next) { //로그아웃 눌렀을 때 session 삭제하기
    session.deleteLoginInfo(req.session, function(result) {
        res.json({
            'code': result
        });
    });
});

router.post('/post_social_join', function(req, res, next) { //social_join에서 가입하기 눌렀을 때 암호화해서 clientDao에 집어넣기
    if (req.body.type == 1) {
        crypto.fbTOlocal(req.body.fb_ID, crypto.getCrypto, function(local_ID) {
            clientDao.insertFBClient({
                'fb_ID': req.body.fb_ID,
                'local_ID': local_ID,
                'name': req.body.name
            }, function(result) {
                if (result) {
                    cookieCartToDB(function(next) {
                        req.session.localLogin = {
                            fb_ID: req.body.fb_ID,
                            local_ID: result.local_ID,
                            name: req.body.name
                        };
                    }, req, res, function() {
                        res.json({
                            code: 1
                        });
                    });
                } else {
                    res.json({
                        code: 0,
                        err_msg: '회원 추가에 실패했습니다.'
                    });
                }
            });
        });
    }
});
var cookieCartToDB = function(first, req, res, next) {
    async.waterfall([
        function(callback) {
            first(function() {
                callback(null);
            });
        },
        function(callback) {
            if (req.cookies.cart_food) {
                myCartDao.insertMyCart(req.cookies.cart_food, 'food', req.session, function(result) {
                    if (result) {
                        res.clearCookie('cart_food');
                        callback(null);
                    } else {
                        console.log('insertMyCart error');
                    }
                });
            } else {
                callback(null);
            }
        },
        function(callback) {
            if (req.cookies.cart_pension) {
                callback(null);
            } else {
                callback(null);
            }
        },
        function(callback) {
            if (req.cookies.cart_bus) {
                callback(null);
            } else {
                callback(null);
            }
        }
    ], function(err) {
        next();
    });
}
module.exports = router;
