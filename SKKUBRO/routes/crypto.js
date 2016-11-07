var crypto = require('crypto');


exports.getCrypto = function(data) {
	console.log('getCrypto');
    if (typeof data === 'string') {
        var shasum = crypto.createHash('sha256');
        shasum.update(data);
        return shasum.digest('hex');
    } else {
        console.log('crypto : not string');
		return false;
    }
};

exports.fbTOlocal = function(fb_ID, getCrypto, next) {
	console.log('fbTOlocal');
    var local_ID = getCrypto(fb_ID);
	local_ID = local_ID.substring(0,15);
	next(local_ID);
}
