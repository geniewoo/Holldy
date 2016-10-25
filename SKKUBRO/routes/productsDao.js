var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['products']);

/* GET home page. */
exports.getProducts = function(value, exfieldJson, sortJson, next){
	var option = [];
	if(value.length === 0){
		option.push({});
	}else{
		value.forEach(function(item){
			option.push(item);
		});
	}
	db.products.find({$or:option}, exfieldJson).sort(sortJson, function(error, data){
		if(error){
			return false;
		}else{
			next(data);
		}
	});
}