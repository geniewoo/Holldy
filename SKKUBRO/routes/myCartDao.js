var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['myCart']);

/* GET home page. */
exports.getMyCart = function(local_ID, type, next) {
    db.myCart.find({
        'local_ID': local_ID,
        'cartType' : type
    }, {
        'locao_ID': 0,
        'cartType': 0
    }, function(error, data) {
        console.log(data);
        next(data);
    });
}

exports.insertMyCart = function(insert_info, type, session, next) {
    console.log('insertMyCartttttttttttttttttttttttttttttttttttt', session);
    var insertJson = [];
    insert_info.forEach(function(item){
        insertJson.push({
            'cartInfo': item,
            'cartType': type,
            'local_ID': session.localLogin.local_ID
        });
    });
    db.myCart.insert(insertJson, function(error, data) {
        console.log('error', error, data);
        if (error) {
            console.log('false');
            next(false);
        } else {
            console.log('true');
            next(true);
        }
    });
}
