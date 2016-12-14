module.exports = function(io) {
    var express = require('express');
    var fs = require('fs');
    var multer = require('multer');
    var router = express.Router();
    var adminRoom = 'admin_8972';
    var clientID = '';
    var productsDao = require('./productsDao.js');
    var clientDao = require('./clientDao.js');
    var uploadDao = require('./uploadDao.js');
    var visitorsController = require('./visitorsController.js');
    var upload = multer({
        dest: './uploadFolder'
    });

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
            clientDao.findClients({}, {
                hPassword: 0,
                name: 0,
                phoneNum: 0,
                email: 0,
                address: 0
            }, {
                joinDate: 1
            }, function(result) {
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
    router.get('/visitor/get_visitors', function(req, res, next) {
        console.log('visitors1');
        if (confirmAdmin(req)) {
            console.log('visitors2', req.query.addressName, req.query.yearMonth);
            visitorsController.findVisitors(req, res, req.query.addressName, req.query.yearMonth, function(result) {
                console.log('visitors3');
                if (result) {
                    res.json({
                        'code': 1,
                        'data': result
                    });
                } else {
                    res.json({
                        'code': 0,
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
    router.get('/community', function(req, res, next) {
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_community.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/community/writeNotice', function(req, res, next) {
        if (confirmAdmin(req)) {
            fs.readFile('views/admin_writeNotice.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });

    router.get('/community/get_noticeCat', function(req, res, next) {
        if (confirmAdmin(req)) {
            var skip = req.query.index - 1;
            console.log('skiiip', skip);
            uploadDao.findCommNotice({}, {
                cont: 0,
                imagePaths: 0
            }, {
                uploadDate: -1
            }, 10 * skip, 10, function(data1) { //    {_id:/^adminNotice/}
            if (data1) {
                uploadDao.countCommNotice(function(data2) {
                    console.log('index', skip + 1);
                    res.json({
                        code: 1,
                        data: data1,
                        index: req.query.index,
                        count: data2
                    });
                })
            } else {
                res.json({
                    code: 0,
                    err_msg: 'uploadDao error'
                });
            }
        });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.post('/community/post_writeNoticeImage', upload.array('uploadFile'), function(req, res, next) {
        if (confirmAdmin(req)) {
            var filesLength = req.files.length;
            var uploadCnt = 0;
            if (filesLength <= 0) {
                res.json({
                    code: 1,
                    msg: "파일이 없습니다"
                });
            } else {
                imageUpload(req.files, 0, filesLength, fs, 'notice\\', [], function(result, imagePaths) {
                    if (result === true) {
                        console.log('imagePaths', imagePaths);
                        res.json({
                            code: 1,
                            imagePaths: imagePaths
                        });
                    }
                });
            }
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.post('/community/post_writeNoticeText', function(req, res, next) {
        console.log('NoticeText');
        if (confirmAdmin(req)) {
            var insertJson = {};
            var commWrite = JSON.parse(req.body.commWrite);
            console.log(commWrite);
            insertJson.title = commWrite.commWriteTitle;
            insertJson.cont = commWrite.commWriteCont;
            var nowDate = new Date();
            insertJson.uploadDate = nowDate;
            insertJson._id = 'adminNotice' + nowDate.getTime();
            if (commWrite.imagePaths) {
                insertJson.imagePaths = commWrite.imagePaths;
            }
            uploadDao.insertCommNotice(insertJson, function(result) {
                res.json({
                    code: 1
                });
            });
        } else {
            res.json({
                'code': 0,
                'err_msg': '어드민 로그인 안되어있습니다'
            });
        }
    });
    router.get('/community/get_delNotice', function(req, res, next){
        if (confirmAdmin(req)) {
            var noticeNum = req.query.noticeNum;
            uploadDao.findACommNotice({_id:'adminNotice' + noticeNum}, {_id:0, title:0, cont:0, uploadDate:0}, function(data){
                if(data.imagePaths.length > 0){
                    data.imagePaths.forEach(function(item, index){
                        fs.rename(__dirname + '\\..\\public\\uploadFolder\\' + 'notice\\' + item, __dirname + '\\..\\public\\uploadFolder\\' + 'notice\\delete\\' + item, function(err){
                            if(err){
                                console.log('커뮤니티 공지 사진이 이미 없거나 잘못되었습니다. 정상 진행합니다.');

                                if(index + 1 >= data.imagePaths.length){
                                    uploadDao.deleteANotice({_id : 'adminNotice' + noticeNum}, function(result){
                                        if(result){
                                            res.json({
                                                code:1
                                            });
                                        }else{
                                            res.json({
                                                'code': 0,
                                                'err_msg': '데이터베이스 문제'
                                            });
                                        }
                                    });
                                }
                            }else{
                                if(index + 1 >= data.imagePaths.length){
                                    uploadDao.deleteANotice({_id : 'adminNotice' + noticeNum}, function(result){
                                        if(result){
                                            res.json({
                                                code:1
                                            });
                                        }else{
                                            res.json({
                                                'code': 0,
                                                'err_msg': '데이터베이스 문제'
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    });
                }else{                    
                    uploadDao.deleteANotice({_id : 'adminNotice' + noticeNum}, function(result){
                        if(result){
                            res.json({
                                code:1
                            });
                        }else{
                            res.json({
                                'code': 0,
                                'err_msg': '데이터베이스 문제'
                            });
                        }
                    });
                }
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

function imageUpload(filesArr, index, filesLength, fs, folderName, imagePaths, next) {
    files = filesArr[index];
    var forTime = new Date();
    files.originalname = forTime.getTime() + files.originalname;
    imagePaths.push(files.originalname);
    fs.rename(files.path, __dirname + '\\..\\public\\uploadFolder\\' + folderName + files.originalname, function(err){
        if(err){
            throw err;
        }else{
            index++;
            if (index == filesLength) {
                next(true, imagePaths);
            } else {
                imageUpload(filesArr, index, filesLength, fs, folderName, imagePaths, next);
            }
        }
    });
    /*fs.readFile(files.path, function(err, data) {
        if (err) {
            console.log('err', err);
        }
        var forTime = new Date();
        files.originalname = forTime.getTime() + files.originalname;
        var filePath = __dirname + '\\..\\public\\uploadFolder\\' + folderName + files.originalname;
        imagePaths.push(files.originalname);
        fs.writeFile(filePath, data, function(error) {
            if (error) {
                throw error;
            } else {
                fs.unlink(files.path, function(removeFileErr) {
                    if (removeFileErr) {
                        throw removeFileErr;
                    } else {
                        index++;
                        if (index == filesLength) {
                            next(true, imagePaths);
                        } else {
                            imageUpload(filesArr, index, filesLength, fs, folderName, imagePaths, next);
                        }
                    }
                });
            }
        });
    });*/
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
