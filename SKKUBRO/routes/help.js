module.exports = function(io) {
    var express = require('express');
    var fs = require('fs');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        fs.readFile('views/help.html', function(error, data) {
            res.send(data.toString());
        });
    });
    return router;
}
