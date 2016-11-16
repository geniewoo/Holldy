var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['clients']);
exports.loginStatus = function(session, next) {
    if (!(typeof session.localLogin === 'undefined')) {
        if (session.localLogin.type === 'fb') {
            db.clients.findOne({
                fb_ID: session.localLogin.fb_ID
            }, {
                fb_ID: 0
            }, function(error, data) {
                if (!error && data._id === session.localLogin.local_ID) {
                    next(1); //페북 로그인 1
                } else {
                    session.localLogin = undefined;
                    next(0);
                }
            });
        } else if(session.localLogin.type === 'local'){
            db.clients.findOne({
                _id: session.localLogin.local_ID
            }, {
                _id: 0
            }, function(error, data){
                if(!error && data && data.hPassword === session.localLogin.local_password){
                    next(2);
                }else{
                    session.localLogin = undefined;
                    next(0);
                }
            });
        } else {
            next(0);
        }
    } else {
        next(0);
    }
};
exports.deleteLoginInfo = function(session, next) {
    if (session.localLogin.type === 'fb') { //fb로그인이면 1 아니면 2
        session.localLogin = undefined;
        next(1);
    } else {
        session.localLogin = undefined;
        next(2);
    }
}
