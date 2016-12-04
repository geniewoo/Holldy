var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['visitors']);

/* GET home page. */
exports.insertVisitor = function(insertInfo, next) {
	var nowDate = new Date();
    db.visitors.save(insertInfo, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}

exports.findVisitors = function(findInfo, exceptInfo, sortInfo, next){
	console.log('findInfo', findInfo, exceptInfo, sortInfo);
	db.visitors.find(findInfo, exceptInfo, sortInfo, function(error, result){
		if(error){
			next(false);
		}else{
			next(result);
		}
	});
}