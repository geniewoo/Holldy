var mongojs = require('mongojs');
var db = mongojs('SKKUBRO');
var commNotice = db.collection('commNotice');
var commEvent = db.collection('commEvent');
var commQnA = db.collection('commQnA');
/* GET home page. */
exports.insertCommNotice = function(insertInfo, next) {
    console.log('insertUpload', insertInfo);
    commNotice.insert(insertInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.findCommNotice = function(findInfo, exceptInfo, sortInfo, skipInfo, limitInfo, next) {
    console.log('findCommNotice');
    commNotice.find(findInfo, exceptInfo).sort(sortInfo).skip(skipInfo).limit(limitInfo, function(error, data) {
        console.log('findCommNotice2');
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.countCommNotice = function(next) {
    commNotice.count(function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.findACommNotice = function(findInfo, exceptInfo, next) {
    commNotice.findOne(findInfo, exceptInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.deleteANotice = function(deleteInfo, next) {
    commNotice.remove(deleteInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}

exports.insertCommEvent = function(insertInfo, next) {
    console.log('insertUploadEvent', insertInfo);
    commEvent.insert(insertInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.findCommEvent = function(findInfo, exceptInfo, sortInfo, skipInfo, limitInfo, next) {
    commEvent.find(findInfo, exceptInfo).sort(sortInfo).skip(skipInfo).limit(limitInfo, function(error, data) {
        console.log('findCommEvent');
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.countCommEvent = function(next) {
    commEvent.count(function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.findACommEvent = function(findInfo, exceptInfo, next) {
    commEvent.findOne(findInfo, exceptInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.deleteAEvent = function(deleteInfo, next) {
    commEvent.remove(deleteInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.insertCommQnA = function(insertInfo, next) {
    console.log('insertUploadQnA', insertInfo);
    commQnA.insert(insertInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.findACommQnA = function(findInfo, exceptInfo, next) {
    commQnA.findOne(findInfo, exceptInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}

exports.findCommQnA = function(findInfo, exceptInfo, sortInfo, skipInfo, limitInfo, next) {
    commQnA.find(findInfo, exceptInfo).sort(sortInfo).skip(skipInfo).limit(limitInfo, function(error, data) {
        console.log('findCommQnA');
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.countCommQnA = function(next) {
    commQnA.count(function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}