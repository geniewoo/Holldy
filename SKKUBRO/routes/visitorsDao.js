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
exports.findAvisitor = function(findInfo, exceptInfo, next){
	console.log('디버깅4');
	db.visitors.findOne(findInfo, exceptInfo, function(error, result){
		console.log('디버깅5');
		next(result);
	});
}
exports.updateAvisitor = function(findInfo, updateInfo, next){
	db.visitors.update(findInfo, updateInfo, function(error, result){
		if(error){
			next(false);
		}else{
			console.log('디버깅8');
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