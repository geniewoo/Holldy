var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');
var session = require('./session.js');

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
            res.json({
                code: 0,
                isLogin: false,
                err_msg: "needLogin"
            })
        } else if (result === 1 || result === 2) {
            fs.readFile('views/changeClientInfo.html', function(error, data) {
                res.send(data.toString());
            });
        }
    });
});
module.exports = router;
