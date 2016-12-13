var mongojs = require('mongojs');
var db = mongojs('SKKUBRO');
var commNotice = db.collection('commNotice');
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
exports.findCommNotice = function (findInfo, exceptInfo, sortInfo, skipInfo, limitInfo, next){
	console.log('findCommNotice');
	commNotice.find(findInfo, exceptInfo).sort(sortInfo).skip(skipInfo).limit(limitInfo, function(error, data){
		console.log('findCommNotice2');
		if(error){
			next(false);
		}else{
			next(data);
		}
	});
}
exports.countCommNotice = function(next){
	commNotice.count(function(error, data){
		if(error){
			next(false);
		}else{
			next(data);
		}
	});
}
exports.findACommNotice = function(findInfo, exceptInfo, next){
	commNotice.findOne(findInfo, exceptInfo, function(error, data){
		if(error){
			next(false);
		}else{
			next(data);
		}
	});
}