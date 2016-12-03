var visitorsDao = require('./visitorsDao.js');

exports.controlVisitors = function(req, res, addressName, next) {
	visitorsDao.insertVisitor(addressName, function(result){
		if(result === true){
			if(req.cookies.visitorCheck){
				console.log('old visitor');
				console.log(req.cookies.visitorCheck);
				next(true);
			}else{
				visitorsDao.insertVisitor('visitor', function(result){
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
	})
}