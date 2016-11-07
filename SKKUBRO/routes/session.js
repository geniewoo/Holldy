var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);

exports.loginStatus = function(session, next) {
    console.log('session : ', session.localLogin);
    if (!(typeof session.localLogin === 'undefined')) {
        if (!(typeof session.localLogin.fb_ID)) {
            db.profiles.findOne({
                fb_ID: session.localLogin.fb_ID
            }, {
                fb_ID: 0
            }, function(error, data) {
                console.log('data', data.local_ID);
                if (data.local_ID === session.localLogin.local_ID) {
                    next(1);//페북 로그인 1
                } else {
                    next(0);
					session.localLogin = null;
                }
            });
        }
    } else {
        next(0);
    }
};
