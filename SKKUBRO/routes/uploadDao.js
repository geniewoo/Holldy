var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['upload']);

/* GET home page. */
exports.insertUpload = function(insertInfo, next) {
	console.log('insertUpload', insertInfo);
    db.upload.insert(insertInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}