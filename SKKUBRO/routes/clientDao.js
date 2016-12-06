var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);

/* GET home page. */
exports.findAClient = function(findInfo, exfieldJson, next) {
    db.clients.findOne(findInfo, exfieldJson, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}

exports.insertFBClient = function(insertInfo, next) {
    db.clients.insert({
        '_id': insertInfo.local_ID,
        'fb_ID': insertInfo.fb_ID,
        'name': insertInfo.name,
        'phoneNum': insertInfo.phoneNum,
        'email': insertInfo.email,
        'address': insertInfo.address,
        'joinDate': insertInfo.joinDate
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.insertLocalClient = function(insertInfo, next) {
    db.clients.insert({
        '_id': insertInfo.local_ID,
        'hPassword': insertInfo.local_password,
        'name': insertInfo.name,
        'phoneNum': insertInfo.phoneNum,
        'email': insertInfo.email,
        'address': insertInfo.address,
        'joinDate': insertInfo.joinDate
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.updateClient = function(findInfo, updateInfo, next) {
    console.log('update', findInfo, updateInfo);
    db.clients.update(
        findInfo
    , {
        $set: updateInfo
    }, function(error, data) {
        console.log('dataassd', data);
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.findClients = function(findInfo, exceptInfo, sortInfo, next){
    db.clients.find(findInfo, exceptInfo).sort(sortInfo, function(error, data){
        if(error){
            next(false);
        }else{
            next(data);
        }
    });
}
