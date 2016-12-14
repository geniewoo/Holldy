var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');
var uploadDao = require('./uploadDao.js');
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
            })
        } else {
            res.json({
                code: 0,
                err_msg: 'uploadDao error'
            });
        }
    });
});
module.exports = router;
