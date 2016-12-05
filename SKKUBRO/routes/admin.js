module.exports = function(io) {
    var express = require('express');
    var fs = require('fs');
    var router = express.Router();
    var adminRoom = 'admin_8972';
    var clientID = '';
    var productsDao = require('./productsDao.js');
    var clientDao = require('./clientDao.js');
    var visitorsController = require('./visitorsController.js');

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
    router.get('/get_help_clineID', function(req, res, next) {
        if (confirmAdmin(req)) {
            res.json({
                'clientID': clientID
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });

    router.get('/visitor', function(req, res, next) {
        if (confirmAdmin(req)) {
            console.log('여기까지');
            fs.readFile('views/admin_visitor.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            console.log('여기까지2');
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/visitor/get_join', function(req, res, next) {
        if (confirmAdmin(req)) {
            clientDao.findClients({}, {hPassword:0, name:0, phoneNum:0,email:0,address:0}, {joinDate:1}, function(result) {
                if (result) {
                    res.json({
                        code: 0,
                        clientsData: result
                    });
                } else {
                    res.json({
                        'code': 0,
                        'err_msg': '디비오류'
                    });
                }
            });
        }
    });
    router.get('/visitor/get_visitors', function(req, res, next){
        console.log('visitors1');
        if(confirmAdmin(req)){
            console.log('visitors2', req.query.addressName, req.query.yearMonth);
            visitorsController.findVisitors(req, res, req.query.addressName, req.query.yearMonth, function(result){
                console.log('visitors3');
                if(result){
                    res.json({
                        'code': 1,
                        'data': result
                    });
                }else{
                    res.json({
                        'code':0,
                        'err_msg': 'findVisitors 오류'
                    });
                }
            });
        }
    });
    router.get('/stock', function(req, res, next) {
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_stock.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.post('/post_stockProducts', function(req, res, next) {
        if (confirmAdmin(req)) {
            console.log('1', JSON.parse(req.body.option));
            productsDao.getProducts(JSON.parse(req.body.option), {}, {
                _id: 1
            }, function(data) {
                console.log('2');
                res.json({
                    'code': 1,
                    'stockProducts': JSON.stringify(data)
                });
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/stock/delete', function(req, res, next) {
        if (confirmAdmin(req)) {
            var _id = req.query._id;
            console.log('_id', _id);
            productsDao.delProducts({
                '_id': _id
            }, function(data) {
                res.json({
                    'code': 1,
                });
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.post('/stock/insert', function(req, res, next) {
        if (confirmAdmin(req)) {
            var newProduct = JSON.parse(req.body.newProduct);
            console.log('insert', newProduct);
            productsDao.insProducts(newProduct, function() {
                res.json({
                    'code': 1,
                });
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
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
