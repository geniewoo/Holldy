var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');
var session = require('./session.js');
var clientDao = require('./clientDao.js');

router.get('/', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            res.redirect('/main?isNeedLogin=true');
        } else if (result === 1 || result === 2) {
            visitorsController.countUpVisitors(req, res, '/myPage', function(result) {
                if (result === true) {
                    fs.readFile('views/myPage.html', function(error, data) {
                        res.send(data.toString());
                    });
                } else {
                    res.send({
                        code: 0,
                        err_msg: 'visitor error'
                    });
                }

            });
        }
    });
});
router.get('/changeClientInfo', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            res.redirect('/main?isNeedLogin=true');
        } else if (result === 1 || result === 2) {
            fs.readFile('views/changeClientInfo.html', function(error, data) {
                res.send(data.toString());
            });
        }
    });
});
router.get('/changeClientInfo/get_ClientInfo', function(req, res, next){
    session.loginStatus(req.session, function(result){
        if(result === 0){
            res.redirect('/main?isNeedLogin=true');
        } else if(result ===1 || result === 2){
            console.log(req.session.localLogin.local_ID);
            clientDao.findAClient({_id : req.session.localLogin.local_ID}, {}, function(data){
                if(data){
                    res.json({code : result, data :{phoneNum : data.phoneNum, email : data.email, address : data.address}});
                }else{
                    res.json({code : 0, err_msg : 'can not find Client'});
                }
            });
        }
    });
});
router.post('/changeClientInfo/post_changeClientInfo', function(req, res, next){
    session.loginStatus(req.session, function(result){
        if(result === 0){
            res.redirect('/main?isNeedLogin=true');
        } else if(result ===1 || result === 2){
            console.log(req.body);
        }
    });
});
module.exports = router;
