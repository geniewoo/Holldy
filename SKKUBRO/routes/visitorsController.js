var visitorsDao = require('./visitorsDao.js');

exports.countUpVisitors = function(req, res, addressName, next) {
	console.log('디버깅2');
	var today = new Date();
	var todayHour = today.getHours();
	today = getDate(today);
	console.log('디버깅3');
	visitorsDao.findAvisitor({
		addressName : addressName,
		yearMonth : today.substring(0,7),
		date : today.substring(8,10),
		hour : todayHour
	}, {
	}, function(result){
		console.log('디버깅6');
		if(result){
			console.log('디버깅7');
			visitorsDao.updateAvisitor(result, {$set : {count : result.count + 1}}, function(result){
				if(result){
					visitorsNum(req, res, addressName, today, todayHour, function(){
						console.log('디버깅9');
						next(true);
					});
				}
			});
		}else{
			console.log('디버깅8');
			visitorsDao.insertVisitor({addressName : addressName, yearMonth : today.substring(0,7), date : today.substring(8,10), hour : todayHour, count : 1}, function(result){
				if(result === true){
					visitorsNum(req, res, addressName, today, todayHour, function(){
						next(true);
					});				
				}else{
					next(false);
				}
			});
		}
	});
}
exports.findVisitors = function(req, res, addressName, yearMonth, next){
	console.log('visitors4');
	visitorsDao.findVisitors({addressName:addressName, yearMonth:yearMonth}, {}, {hour : 1}, function(result){
		next(result);
	});
}
var getDate = function(date){
	var returnDate = date.getFullYear() + '-';
	if(date.getMonth() < 9){
		returnDate += '0' + (date.getMonth() + 1)+'-';
	}else{
		returnDate += (date.getMonth() + 1)+'-';
	}
	if(date.getDate() < 10){
		returnDate += '0' + date.getDate();
	}else{
		returnDate += date.getDate();
	}
	return returnDate;
}
var visitorsNum = function(req, res, addressName, today, todayHour, next){
	console.log('디버깅10');
	if(req.cookies.visitorCheck){
		next();
	}else{
		console.log('디버깅12');
		visitorsDao.findAvisitor({addressName : 'visitors', yearMonth : today.substring(0,7), date : today.substring(8,10), hour : todayHour}, {}, function(result){
			if(result){
				visitorsDao.updateAvisitor(result, {$set : {count : result.count + 1}}, function(result){
					if(result){
						next(true);
					}
				});
			}else{
				visitorsDao.insertVisitor({addressName : 'visitors', yearMonth : today.substring(0,7), date : today.substring(8,10), hour : todayHour, count : 1}, function(ressult){
					if(result){
						next(true);
					}
				});
			}
		});
		res.cookie('visitorCheck', true,{
			maxAge : 3600000
		});
		console.log('new visitor');
		next(true);
	}
}