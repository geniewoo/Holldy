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
            var fb_ID = req.body.fb_ID;
            var name = req.body.name;
            var phoneNum = req.body.phoneNum;
            var email = req.body.email;
            var address = req.body.address;
            if (!fb_ID || !name) {
                res.json({
                    code: 0,
                    err_msg: '페이스북 정보 오류'
                });
                return;
            }
            console.log('디버깅1');
            if (!fb_ID || !name) {
                res.json({
                    code: 0,
                    err_msg: '페이스북 정보 오류'
                });
                return;
                console.log('디버깅2');
            }
            if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(email)) {} else {
                res.json({
                    code: 0,
                    err_msg: '이메일 형식 오류'
                });
                return;
            }
            console.log('디버깅3');
            if ((/^[0-9]{10,11}$/).test(phoneNum)) {} else {
                res.json({
                    code: 0,
                    err_msg: '전화번호 형식 오류'
                });
                return;
            }
            console.log('디버깅4');
            if ((/^[가-힣]{1,3}시-[가-힣]{1,3}[구군]$/).test(address)) {} else {
                res.json({
                    code: 0,
                    err_msg: '주소 형식 오류'
                });
                return;
            }
            console.log('디버깅5');
            clientDao.insertFBClient({
                'fb_ID': req.body.fb_ID,
                'local_ID': local_ID,
                'name': req.body.name,
                'phoneNum': req.body.phoneNum,
                'email': req.body.email,
                'address': req.body.address
            }, function(result) {
                console.log('디버깅6');
                if (result) {
                    console.log('디버깅7');
                    cookieCartToDB(function(next) {
                        console.log('디버깅10');
                        req.session.localLogin = {
                            fb_ID: req.body.fb_ID,
                            local_ID: result.local_ID,
                            name: req.body.name
                        };
                        next();
                    }, req, res, function() {
                        console.log('디버깅8');
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
            console.log('디버깅11');
        },
        function(callback) {
            console.log('디버깅12');
            if (req.cookies.cart_food) {
                myCartDao.insertMyCart(req.cookies.cart_food, 'food', req.session, function(result) {
                    if (result) {
                        res.clearCookie('cart_food');
                        callback(null);
                    } else {
                        console.log('insertMyCart error');
                        callback(true);
                    }
                });
            } else {
                callback(null);
            }
        },
        function(callback) {
            console.log('디버깅13');
            if (req.cookies.cart_pension) {
                callback(null);
            } else {
                callback(null);
            }
        },
        function(callback) {
            console.log('디버깅14');
            if (req.cookies.cart_bus) {
                callback(null);
            } else {
                callback(null);
            }
        }
    ], function(err) {
        console.log('디버깅15');
        if (err) {
            console('오류오류');
        } else {
            next();
        }
    });
}
module.exports = router;
