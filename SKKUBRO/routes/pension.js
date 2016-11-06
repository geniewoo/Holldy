var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    fs.readFile('views/pension.html', function(error, data){
        res.send(data.toString());
    });
});
module.exports = router;
