var mongojs = require('mongojs');
var db = mongojs('SKKUBRO', ['myCart']);

/* GET home page. */
exports.getMyCart = function(local_ID, type, next) {
    db.myCart.find({
        'local_ID': local_ID,
        'cartType': type
    }, {
        'locao_ID': 0,
        'cartType': 0
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.deleteMyCart = function(cart_food_ID, session, type, next) {
    db.myCart.remove({
        '_id': mongojs.ObjectId(cart_food_ID),
        'cartType': type,
        'local_ID': session.localLogin.local_ID
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.getMyCartOne = function(type, session, cart_food_ID, next) {
    console.log('디버그2');
    db.myCart.findOne({
        '_id': mongojs.ObjectId(cart_food_ID),
        'cartType': type,
        'local_ID': session.localLogin.local_ID
    }, {
        'locao_ID': 0,
        'cartType': 0
    }, function(error, data) {
        console.log('디버그3');
        if (error) {
            next(false);
        } else {
            next(data);
        }
    });
}
exports.updateMyCart = function(update_info, type, session, cart_food_ID, next) {
    console.log("update", cart_food_ID);
    db.myCart.update({
        '_id': mongojs.ObjectId(cart_food_ID),
        'cartType': type,
        'local_ID': session.localLogin.local_ID
    }, {
        $set: {
            'cartInfo': update_info
        }
    }, function(error, data) {
        if (error) {
            next(false);
        } else {
            next(true);
        }
    });
}
exports.insertMyCart = function(insert_info, type, session, next) {
    var insertJson = [];
    insert_info.forEach(function(item) {
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
