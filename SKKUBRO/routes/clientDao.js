var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);

/* GET home page. */
exports.findAClient = function(value, exfieldJson, next) {
    db.clients.findOne(value, exfieldJson, function(error, data) {
        if(error){
            next(false);
        }else{
            console.log('로그인정보', data);
            next(data);
        }
    });
}

exports.insertFBClient = function(insert_info, next) {

    db.clients.insert({
        '_id': insert_info.local_ID,
        'fb_ID': insert_info.fb_ID,
        'name': insert_info.name,
        'phoneNum': insert_info.phoneNum,
        'email': insert_info.email,
        'address': insert_info.address
    }, function(error, data) {
        console.log('error', error, data);
        if (error) {
            console.log('false');
            next(false);
        } else {
            console.log('true');
            next(true);
        }
    });
}
exports.insertLocalClient = function(insert_info, next){
    db.clients.insert({
        '_id': insert_info.local_ID,
        'hPassword': insert_info.local_password,
        'name': insert_info.name,
        'phoneNum': insert_info.phoneNum,
        'email': insert_info.email,
        'address': insert_info.address
    }, function(error, data) {
        console.log('error', error, data);
        if (error) {
            console.log('false');
            next(false);
        } else {
            console.log('true');
            next(true);
        }
    });
}