var express = require('express');
var fs = require('fs');
var router = express.Router();
var visitorsController = require('./visitorsController.js');

router.get('/', function(req, res, next) {
    console.log('myPage');
    fs.readFile('views/myPage.html', function(error, data) {
        console.log(data);
        res.send(data.toString());
    });
});
module.exports = router;
