exports.saveCookie = function(query, res, next){
	console.log('ck.js');
	if(query.travelDate1){
		console.log('ck.js1');
		res.cookie('travelForm' , {
			travelDate1 : query.travelDate1,
			travelDate2 : query.travelDate2,
			travelNum : query.travelNum
		});
		console.log('ck.js2');
	}
	next();
}