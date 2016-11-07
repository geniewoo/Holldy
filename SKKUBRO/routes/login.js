var express = require('express');
var fs = require('fs');
var router = express.Router();
var clientDao = require('./clientDao.js');
var crypto = require('./crypto.js');
var session = require('./session.js');

router.get('/modal', function(req, res, next) {
    console.log('modal');
    fs.readFile('views/login.html', function(error, data) {
        res.send(data.toString());
    });
});
router.get('/get_loginStatus', function(req, res, next){
    console.log('get_loginStatus', req.session);
    session.loginStatus(req.session, function(result){
        console.log('status', result);
        res.json({'code': result});
    });
});
router.post('/post_checkLocal', function(req, res, next) {
    console.log('checkLocal');
    clientDao.checkLocal(req.body.fb_ID, function(result) {
        if (result) {
            console.log('session saved');
            req.session.localLogin={fb_ID : req.body.fb_ID, local_ID : result.local_ID, name : req.body.name};
            res.json({
                code: 1,
                msg: "이미 회원가입 되어 있습니다."
            });
        } else {
            res.json({
                code: 2,
                msg: "추가 회원가입이 필요합니다."
            });
        }
    });
});

router.get('/social_join', function(req, res, next) {
    fs.readFile('views/social_join.html', function(error, data) {
        res.send(data.toString());
    });
});

router.get('/get_localLogout', function(req, res, next){
    session.deleteLoginInfo(req.session, function(result){
        res.json({'code' : result});
    });
});

router.post('/post_social_join', function(req, res, next) {
    console.log('0', req.body);
    if (req.body.type == 1) {
        console.log('1');
        crypto.fbTOlocal(req.body.fb_ID, crypto.getCrypto, function(local_ID) {
            clientDao.insertFBClient({'fb_ID' : req.body.fb_ID, 'local_ID' : local_ID, 'name' : req.body.name}, function(result) {
                if (result) {
                    console.log('session saved');
                    req.session.localLogin={fb_ID : req.body.fb_ID, local_ID : result.local_ID, name : req.body.name};
                    res.json({
                        code: 1
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
module.exports = router;
