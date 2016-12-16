var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');
var uploadDao = require('./uploadDao.js');
var multer = require('multer');
var session = require('./session');
var upload = multer({
    dest: './uploadFolder'
});
router.get('/', function(req, res, next) {
    visitorsController.countUpVisitors(req, res, '/community', function(result) {
        if (result === true) {
            fs.readFile('views/community.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.send({
                code: 0,
                err_msg: 'visitor error'
            });
        }
    });
});
router.get('/readNotice', function(req, res, next) {
    visitorsController.countUpVisitors(req, res, '/community/readNotice', function(result) {
        if (result === true) {
            fs.readFile('views/commReadNotice.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.send({
                code: 0,
                err_msg: 'visitor error'
            });
        }
    });
});
router.get('/get_commNotice', function(req, res, next) {
    noticeID = 'adminNotice' + req.query.noticeNum;
    if (noticeID) {
        uploadDao.findACommNotice({
            _id: noticeID
        }, {
            _id: 0
        }, function(data) {
            if (data) {
                res.json({
                    code: 1,
                    data: data
                });
            }
        });
    } else {
        res.redirect('/community');
    }
});

router.get('/readEvent', function(req, res, next) {
    visitorsController.countUpVisitors(req, res, '/community/readEvent', function(result) {
        if (result === true) {
            fs.readFile('views/commReadEvent.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.send({
                code: 0,
                err_msg: 'visitor error'
            });
        }
    });
});

router.get('/get_commEvent', function(req, res, next) {
    eventID = 'adminEventt' + req.query.eventNum;
    if (eventID) {
        uploadDao.findACommEvent({
            _id: eventID
        }, {
            _id: 0
        }, function(data) {
            if (data) {
                res.json({
                    code: 1,
                    data: data
                });
            }
        });
    } else {
        res.redirect('/community');
    }
});

router.get('/get_eventCat', function(req, res, next) {
    var skip = req.query.index - 1;
    console.log('skiii.,p', skip);
    uploadDao.findCommEvent({}, {
        cont: 0,
        imagePaths: 0
    }, {
        uploadDate: -1
    }, 10 * skip, 10, function(data1) { //
        if (data1) {
            uploadDao.countCommEvent(function(data2) {
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
});

router.get('/get_noticeCat', function(req, res, next) {
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
});
router.get('/get_noticeCat', function(req, res, next) {
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
});

router.get('/get_QnACat', function(req, res, next) {
    var skip = req.query.index - 1;
    console.log('skiiip', skip);
    uploadDao.findCommQnA({}, {
        cont: 0,
        imagePaths: 0
    }, {
        uploadDate: -1
    }, 10 * skip, 10, function(data1) { //    {_id:/^adminNotice/}
        if (data1) {
            uploadDao.countCommQnA(function(data2) {
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
});
router.get('/get_reviewCat', function(req, res, next) {
    var skip = req.query.index - 1;
    console.log('skiiip', skip);
    uploadDao.findCommReview({}, {
        cont: 0,
        imagePaths: 0
    }, {
        uploadDate: -1
    }, 10 * skip, 10, function(data1) { //    {_id:/^adminNotice/}
        if (data1) {
            uploadDao.countCommReview(function(data2) {
                console.log('index', skip + 1);
                res.json({
                    code: 1,
                    data: data1,
                    index: req.query.index,
                    count: data2
                });
            });
        } else {
            res.json({
                code: 0,
                err_msg: 'uploadDao error'
            });
        }
    });
});
router.get('/writeQnA', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            fs.readFile('views/writeQnA.html', function(error, data) {
                res.send(data.toString());
            });
        } else if (result === 1 || result === 2) {
            res.redirect('/community/writeQnALogined?email=' + req.session.localLogin.email);
        }
    });
});
router.get('/writeQnALogined', function(req, res, next) {
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            res.send({
                code: 0,
                err_msg: '로그인 후 이용해 주세요'
            });
        } else if (result === 1 || result === 2) {
            fs.readFile('views/writeQnALogined.html', function(error, data) {
                res.send(data.toString());
            });
        }
    });
});
router.post('/post_uploadImage', upload.array('uploadFile'), function(req, res, next) {
    var folderName = req.query.catName;
    if (folderName === 'QnA') {
        folderName = folderName + '\\';
    } else {
        res.json({
            'code': 0,
            'err_msg': '허용 안된 카테고리입니다'
        });
        return;
    }
    var filesLength = req.files.length;
    var uploadCnt = 0;
    if (filesLength <= 0) {
        res.json({
            code: 1,
            msg: "파일이 없습니다"
        });
    } else {
        imageUpload(req.files, 0, filesLength, fs, folderName, [], function(result, imagePaths) {
            if (result === true) {
                console.log('imagePaths', imagePaths);
                res.json({
                    code: 1,
                    imagePaths: imagePaths
                });
            }
        });
    }
});
router.post('/post_writeQnAText', function(req, res, next) {
    console.log('QnAText');
    var insertJson = {};
    var commWrite = JSON.parse(req.body.commWrite);
    console.log(commWrite);
    insertJson.title = commWrite.commWriteTitle;
    insertJson.cont = commWrite.commWriteCont;
    var nowDate = new Date();
    insertJson.uploadDate = nowDate;
    insertJson._id = 'writeQnAQnA' + nowDate.getTime();
    if (commWrite.imagePaths) {
        insertJson.imagePaths = commWrite.imagePaths;
    }
    session.loginStatus(req.session, function(result) {
        if (result === 0) {
            insertJson.name = commWrite.commWriteName;
            insertJson.isLogined = false;
            insertJson.locked = commWrite.locked;
            if (commWrite.locked === true) {
                insertJson.password = commWrite.password;
            }
            uploadDao.insertCommQnA(insertJson, function(result) {
                res.json({
                    code: 1
                });
            });
        } else if (result === 1 || result === 2) {
            insertJson.local_ID = req.session.localLogin.local_ID;
            insertJson.email = req.session.localLogin.email;
            insertJson.isLogined = true;
            insertJson.locked = commWrite.locked;
            uploadDao.insertCommQnA(insertJson, function(result) {
                res.json({
                    code: 1
                });
            });
        }
    });
});
router.get('/get_QnASecretDegree', function(req, res, next) {
    var QnANum = req.query.QnANum;
    console.log('secret', QnANum);
    uploadDao.findACommQnA({
        _id: 'writeQnAQnA' + QnANum
    }, {
        title: 0,
        cont: 0,
        uploadDate: 0,
        name: 0
    }, function(data) {
        console.log('secret~', data);
        if (data.locked === true && data.isLogined === true) {
            console.log('degree ture true');
            if (req.session.localLogin && req.session.localLogin.email === data.email) {
                console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwhy');
                res.json({code:3});
            } else {
                res.json({
                    code: 2
                });
            }
        } else {
            res.json({
                code: 1,
                isLogined: data.isLogined,
                locked: data.locked
            });
        }
    });
});
router.get('/get_confirmQnAPassword', function(req, res, next) {
    var QnANum = req.query.QnANum;
    var QnAPassword = req.query.QnAPassword;
    uploadDao.findACommQnA({
        _id: 'writeQnAQnA' + QnANum
    }, {
        title: 0,
        cont: 0,
        uploadDate: 0,
        name: 0,
        isLogined: 0,
        locked: 0
    }, function(data) {
        if (data.password) {
            if (QnAPassword === data.password) {
                req.session.QnAToken = {
                    QnANum: QnANum,
                    ms: Date.now()
                };
                console.log('nownownow', Date.now());
                res.json({
                    code: 1
                });
            } else {
                res.json({
                    code: 0,
                    err_msg: '비밀번호가 틀렸습니다'
                });
            }
        } else {
            res.json({
                code: 0
            });
        }
    });
});

router.get('/readQnA', function(req, res, next) {
    visitorsController.countUpVisitors(req, res, '/community/readQnA', function(result) {
        if (result === true) {
            fs.readFile('views/commReadQnA.html', function(error, data) {
                res.send(data.toString());
            });
        } else {
            res.send({
                code: 0,
                err_msg: 'visitor error'
            });
        }
    });
});
router.get('/get_commQnA', function(req, res, next) {
    var QnANum = req.query.QnANum;
    uploadDao.findACommQnA({
        _id: 'writeQnAQnA' + QnANum
    }, {}, function(data) {
        if (data.locked === true) {
            if (data.isLogined === true) {
                if (req.session.localLogin && data.email && req.session.localLogin.email === data.email) {
                    res.json({
                        code: 2,
                        data: data
                    });
                } else {
                    res.json({
                        code: 0,
                        err_msg: "읽을 수 없는 회원 비밀글입니다"
                    });
                }
            } else if (data.isLogined === false) {
                if (req.session.QnAToken && req.session.QnAToken.QnANum === QnANum) {
                    if (Date.now() - req.session.QnAToken.ms < 10000) {
                        delete req.session.QnAToken;
                        res.json({
                            code: 1,
                            data: data
                        });
                    } else {
                        delete req.session.QnAToken;
                        res.json({
                            code: 0,
                            err_msg: "시간오버"
                        });
                    }
                } else {
                    res.json({
                        code: 0,
                        err_msg: "권한이 없는 비회원 비밀글입니다"
                    });
                }
            } else {
                res.json({
                    code: 0
                });
            }
        } else {
            if (data.isLogined === true) {
                res.json({
                    code: 2,
                    data: data
                });
            } else {
                res.json({
                    code: 1,
                    data: data
                });
            }
        }
    });
});
module.exports = router;

function imageUpload(filesArr, index, filesLength, fs, folderName, imagePaths, next) {
    files = filesArr[index];
    var forTime = new Date();
    files.originalname = forTime.getTime() + files.originalname;
    imagePaths.push(files.originalname);
    fs.rename(files.path, __dirname + '\\..\\public\\uploadFolder\\' + folderName + files.originalname, function(err) {
        if (err) {
            throw err;
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
