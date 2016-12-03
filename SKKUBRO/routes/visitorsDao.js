var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['visitors']);

/* GET home page. */
exports.insertVisitor = function(addressName, next) {
	var nowDate = new Date();
    db.visitors.save({'addressName' : addressName, 'visitDate' : nowDate}, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}