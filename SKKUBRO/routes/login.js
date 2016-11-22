var express = require('express');
var fs = require('fs');
var router = express.Router();
var clientDao = require('./clientDao.js');
var crypto = require('./crypto.js');
var session = require('./session.js');
var async = require('async');
var myCartDao = require('./myCartDao.js');
var request = require('request');

router.get('/modal', function(req, res, next) { //모달 띄울 html전달
    fs.readFile('views/login.html', function(error, data) {
        res.send(data.toString());
    });
});
router.get('/get_loginStatus', function(req, res, next) { //현재 로그인 되어있는지 확인 header를 쓰는 매 페이지마다 호출됨.
    session.loginStatus(req.session, function(result) { //1은 페북 2는 로컬
        if (result === 1 || result === 2) {
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
router.post('/post_localLogin', function(req, res, next) { //자체로그인 시도했을 때
    var password = crypto.getCrypto(req.body.password);
    clientDao.findAClient({
        _id: req.body.id,
        hPassword: password
    }, {}, function(result) {
        if (result) {
            cookieCartToDB(function(next) {
                req.session.localLogin = {
                    type: 'local',
                    local_ID: req.body.id,
                    local_password: password,
                    name: result.name
                };
                next();
            }, req, res, function() {
                res.json({
                    code: 1,
                    msg: "자체 로그인 성공."
                });
            });
        } else {
            res.json({
                code: 0,
                msg: "로그인 오류"
            });
        }
    });
});
router.post('/post_checkLocal', function(req, res, next) { //페북으로 로그인하기 눌렀을 시 로컬아이디가 있는지 확인.
    clientDao.findAClient({
        fb_ID: req.body.fb_ID
    }, {}, function(result) {
        if (result) {
            cookieCartToDB(function(next) { // 함수에 함수 두개 들어감, 먼저 행할거, 콜백
                req.session.localLogin = {
                    type: 'fb',
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
router.post('/post_duplicateID', function(req, res, next) {
    clientDao.findAClient({
        _id: req.body.join_id
    }, {}, function(result) {
        if (result) {
            res.json({
                code: 0,
                msg: "이미 존재하는 아이디입니다"
            });
        } else {
            res.json({
                code: 1
            });
        }
    });
});
router.post('/post_duplicatePhone', function(req, res, next) {
    clientDao.findAClient({
        phoneNum: req.body.join_phone
    }, {}, function(result) {
        if (result) {
            res.json({
                code: 0,
                msg: "이미 존재하는 휴대폰번호입니다"
            });
        } else {
            res.json({
                code: 1
            });
        }
    });
});
router.post('/post_duplicateEmail', function(req, res, next) {
    clientDao.findAClient({
        email: req.body.join_email
    }, {}, function(result) {
        if (result) {
            res.json({
                code: 0,
                msg: "이미 존재하는 이메일입니다"
            });
        } else {
            res.json({
                code: 1
            });
        }
    });
});
router.get('/local_join', function(req, res, next) { //social_join 접속했을 때
    fs.readFile('views/local_join.html', function(error, data) {
        res.send(data.toString());
    });
});

router.post('/post_local_join', function(req, res, next) { //자체로그인 요청 들어왔을 때
    var local_ID = req.body.local_ID;
    var local_password = req.body.local_password;
    var name = req.body.name;
    var phoneNum = req.body.phoneNum;
    var email = req.body.email;
    var address = req.body.address;

    if (!(/^[0-9a-zA-Z]{8,15}$/).test(local_ID)) {
        res.json({
            code: 0,
            err_msg: '아이디 형식 오류'
        });
        return;
    } else if ((/^[0-9]{8,15}$/).test(local_ID)) {
        res.json({
            code: 0,
            err_msg: '아이디 형식 오류'
        });
        return;
    }

    if (!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test(local_password)) {
        res.json({
            code: 0,
            err_msg: '비번 형식 오류'
        });
        return;
    } else if ((/^[a-zA-Z]{8,15}$/).test(local_password) || !((/[0-9]/).test(local_password))) {
        res.json({
            code: 0,
            err_msg: '비번 형식 오류'
        });
        return;
    } else {
        local_password = crypto.getCrypto(local_password);
    }

    if ((/^[가-힣]{2,4}$/).test(name)) {} else {
        res.json({
            code: 0,
            err_msg: '이름형식오류'
        });
        return;
    }

    if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(email)) {} else {
        res.json({
            code: 0,
            err_msg: '이메일 형식 오류'
        });
        return;
    }
    if ((/^[0-9]{10,11}$/).test(phoneNum)) {} else {
        res.json({
            code: 0,
            err_msg: '전화번호 형식 오류'
        });
        return;
    }
    if ((/^[가-힣]{1,3}시-[가-힣]{1,3}[구군]$/).test(address)) {} else {
        res.json({
            code: 0,
            err_msg: '주소 형식 오류'
        });
        return;
    }
    clientDao.findAClient({
        $or: [{
            '_id': local_ID
        }, {
            'phoneNum': phoneNum
        }, {
            "email": email
        }]
    }, {}, function(result) {
        if (result) {
            res.json({
                code: 0,
                msg: "아이디, 이메일, 번호 중복이 있습니다"
            });
        } else {
            clientDao.insertLocalClient({
                'local_ID': local_ID,
                'local_password': local_password,
                'name': name,
                'phoneNum': phoneNum,
                'email': email,
                'address': address
            }, function(result) {
                if (result) {
                    cookieCartToDB(function(next) {
                        req.session.localLogin = {
                            type: 'local',
                            local_ID: local_ID,
                            local_password: local_password,
                            name: name
                        };
                        next();
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
        }
    });
});

router.get('/social_join', function(req, res, next) { //social_join 접속했을 때
    fs.readFile('views/social_join.html', function(error, data) {
        res.send(data.toString());
    });
});

router.get('/get_localLogout', function(req, res, next) { //로그아웃 눌렀을 때 session 삭제하기
    session.deleteLoginInfo(req.session, function(result) { //reult가 1이면 fb 2이면 자체
        res.json({
            'code': result
        });
    });
});

router.post('/post_social_join', function(req, res, next) { //social_join에서 가입하기 눌렀을 때 암호화해서 clientDao에 집어넣기
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
        if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(email)) {} else {
            res.json({
                code: 0,
                err_msg: '이메일 형식 오류'
            });
            return;
        }
        if ((/^[0-9]{10,11}$/).test(phoneNum)) {} else {
            res.json({
                code: 0,
                err_msg: '전화번호 형식 오류'
            });
            return;
        }
        if ((/^[가-힣]{1,3}시-[가-힣]{1,3}[구군]$/).test(address)) {} else {
            res.json({
                code: 0,
                err_msg: '주소 형식 오류'
            });
            return;
        }
        clientDao.findAClient({
            $or: [{
                'fb_ID': fb_ID
            }, {
                'phoneNum': phoneNum
            }, {
                "email": email
            }]
        }, {}, function(result) {
            if (result) {
                res.json({
                    code: 0,
                    msg: "이메일, 번호 중복이 있습니다"
                });
            } else {
                clientDao.insertFBClient({
                    'fb_ID': fb_ID,
                    'local_ID': local_ID,
                    'name': name,
                    'phoneNum': phoneNum,
                    'email': email,
                    'address': address
                }, function(result) {
                    if (result) {
                        cookieCartToDB(function(next) {
                            req.session.localLogin = {
                                type: 'fb',
                                fb_ID: req.body.fb_ID,
                                local_ID: local_ID,
                                name: name
                            };
                            next();
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
            }
        });

    });
});

router.get('/get_notAbot', function(req, res, next) {
    var requestQuery = req.query;
    if (requestQuery != undefined && requestQuery != '' && requestQuery != null && requestQuery.response != undefined && requestQuery.response != '' && requestQuery.response != null) {
        var response = requestQuery.response;
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=6LcChgwUAAAAAEhHE3SYd_hIQtAcC1LF5faalouH&response=" + response;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl, function(error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                res.send({
                    "code": 0,
                    "err_msg": "해킹하지마시오"
                });
            } else {
                res.send({
                    "code": 1
                });
            }
        });
    } else {
        res.send({
            "code": 0,
            "err_code": "어림도없소"
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
                        callback(true);
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
        if (err) {
            console('오류오류');
        } else {
            next();
        }
    });
}
module.exports = router;
