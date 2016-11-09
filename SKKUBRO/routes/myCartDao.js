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
        next(data);
    });
}
exports.deleteMyCart = function(cart_food_ID, session, type, next){
    console.log(cart_food_ID, type, session.localLogin.local_ID);
    db.myCart.remove({'_id' :  mongojs.ObjectId(cart_food_ID), 'cartType' : type, 'local_ID' : session.localLogin.local_ID}, function(error, data){
        console.log('error', error, 'data', data);
        if(error){
            next(false);
        }else{
            next(true);
        }
    });
}

exports.insertMyCart = function(insert_info, type, session, next) {
    var insertJson = [];
    insert_info.forEach(function(item){
        insertJson.push({
            'cartInfo': item,
            'cartType': type,
            'local_ID': session.localLogin.local_ID
        });
    });
    db.myCart.insert(insertJson, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
