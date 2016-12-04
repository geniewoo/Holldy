var visitorsDao = require('./visitorsDao.js');

exports.controlVisitors = function(req, res, addressName, next) {
	var today = new Date();
	var todayHour = today.getHours();
	today = getDate(today);
	visitorsDao.insertVisitor({addressName : addressName, date : today, hour : todayHour}, function(result){
		if(result === true){
			if(req.cookies.visitorCheck){
				console.log('old visitor');
				console.log(req.cookies.visitorCheck);
				next(true);
			}else{
				visitorsDao.insertVisitor({addressName : 'visitor', date : today, hour : todayHour}, function(result){
					if(result === true){
						res.cookie('visitorCheck', true,{
							maxAge : 3600000
						});
						console.log('new visitor');
						next(true);
					}else{
						next(false);
					}
				});
			}	
		}else{
			next(false);
		}
	});
}
exports.findVisitors = function(req, res, addressName, date, type, next){
	console.log('visitors4', type);
	if(type === "date"){
		visitorsDao.findVisitors({addressName:addressName,date:date}, {}, {hour : 1}, function(result){
			console.log('visitors5', result.length);
			if(result){
				var totalDateNum = result.length;
				var visitorNumArr = [];
				var i = 0;
				var j = 0;
				while(i < 24 && j < totalDateNum){
					if(visitorNumArr.length <= i + 1){
						visitorNumArr.push(0);
					}
					if(result[j].hour == i){
						visitorNumArr[i]++;
						j ++;
					}else{
						i ++;
					}
				}
				console.log('visitors6');
				next(visitorNumArr);
			}else{
				next(false);
			}
		});
	}else{
		var dateRegExp = new RegExp('^' + date +'-[0-9]{2}$');
		visitorsDao.findVisitors({addressName:addressName, date:dateRegExp}, {}, {date : 1}, function(result){
			if(result){
				var totalMonthNum = result.length;
				var visitorNumArr = [];
				var i = 0;
				var j = 0;
				while(i < 31 || j < totalMonthNum){
					if(visitorNumArr.length <= i + 1){
						visitorNumArr.push(0);
					}
					if(result[j].date.substring(8,10) == i){
						visitorNumArr[i]++;
						j++;
					}else{
						i++;
					}
				}
				return visitorNumArr;
			}
			else{
				return false;
			}
		});
	}
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