var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    fs.readFile('views/bus.html', function(error, data){
        res.send(data.toString());
    });
});
module.exports = router;
