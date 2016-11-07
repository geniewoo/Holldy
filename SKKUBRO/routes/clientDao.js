var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);

/* GET home page. */
exports.checkLocal = function(fb_ID, next) {
    db.clients.findOne({
        'fb_ID': fb_ID
    }, {'fb_ID' : 0}, function(error, data) {
        console.log(data);
        next(data);
    });
}

exports.insertFBClient = function(insert_info, next) {
    db.clients.insert({
        '_id': insert_info.local_ID,
        'fb_ID': insert_info.fb_ID,
        'name': insert_info.name
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
