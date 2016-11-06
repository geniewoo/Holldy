var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['products']);

/* GET home page. */
exports.getProducts = function(value, exfieldJson, sortJson, next) {
    var option = [];
    if (value.length === 0) {
        option.push({});
    } else {
        value.forEach(function(item) {
            option.push(item);
        });
    }
    db.products.find({
        $or: option
    }, exfieldJson).sort(sortJson, function(error, data) {
        if (error) {
			console.log('getProducts error');
            return false;
        } else {
            next(data);
        }
    });
}

exports.delProducts = function(value, next) {
    db.products.remove(value, function(error, data) {
        if (error) {
			console.log('delProducts error');
			return false;
        } else {
            next(data);
        }
    });
}

exports.insProducts = function(value, next){
	console.log('insert');
	db.products.save(value, function(error, data){
		if(error){
			console.log('insProducts error');
			return false;
		}else{
			next(data);
		}
	});
}
