module.exports = function(io) {
    var express = require('express');
    var fs = require('fs');
    var router = express.Router();
    var adminRoom = 'admin_8972';
    var clientID = '';

    router.get('/', function(req, res, nex) {
        fs.readFile('views/admin_login.html', function(error, data) {
            res.send(data.toString());
        });
    });

    router.post('/loginAdmin', function(req, res, next) {
        $adminID = req.body.ID;
        $adminPW = req.body.PW;

        if (isAdmin($adminID, $adminPW, req)) {
            res.json({
                'code': 1
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 실패입니다'
            });
        }
    });

    router.get('/cat', function(req, res, next) {
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_category.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/help', function(req, res, next) {
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_help.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/helpPopUp', function(req, res, next) {
        clientID = req.query.clientID;
        console.log(clientID);
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_helpPopUp.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/get_help_clineID', function(req, res, next){
        res.json({'clientID' : clientID});
    });
    return router;
}


var isAdmin = function(id, pw, req) {
    if ('skkubro1209' === id && 'gnlvkr8972' === pw) {
        req.session.admin_id = id;
        req.session.admin_pw = pw;
        return true;
    } else {
        return false;
    }
}

var confirmAdmin = function(req) {
    if ('skkubro1209' === req.session.admin_id && 'gnlvkr8972' === req.session.admin_pw) {
        return true;
    } else {
        return false;
    }
}
