var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);

/* GET home page. */
exports.findAClient = function(value, exfieldJson, next) {
    db.clients.findOne(value, exfieldJson, function(error, data) {
        if (error) {
            next(false);
        } else {
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
        'address': insert_info.address,
        'joinDate': insert_info.joinDate
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.insertLocalClient = function(insert_info, next) {
    db.clients.insert({
        '_id': insert_info.local_ID,
        'hPassword': insert_info.local_password,
        'name': insert_info.name,
        'phoneNum': insert_info.phoneNum,
        'email': insert_info.email,
        'address': insert_info.address,
        'joinDate': insert_info.joinDate
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.updateClient = function(find_info, update_info, next) {
    console.log('1123', find_info, update_info);
    db.clients.update(
        find_info
    , {
        $set: update_info
    }, function(error, data) {
        console.log('dataassd', data);
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.findClients = function(find_info, except_info, sort_info, next){
    db.clients.find(find_info, except_info).sort(sort_info, function(error, data){
        if(error){
            next(false);
        }else{
            next(data);
        }
    });
}
