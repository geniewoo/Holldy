module.exports = function(io) {
    var express = require('express');
    var fs = require('fs');
    var router = express.Router();
    var multer = require('multer');
    var upload = multer({
        dest: './uploadFolder'
    });

    router.post('/', upload.array('uploadFile'), function(req, res, next) {
        console.log('notice');
        var filesLength = req.files.length;
        var uploadCnt = 0;
        console.log('notice2');
        if (filesLength <= 0) {
            res.status(500).end();
            console.log('notice3');
        } else {
            for (var i = 0; i < filesLength; i++) {
                console.log('notice4');
                imageUpload(req.files[i]);
                uploadCnt += 1;

                if (uploadCnt == filesLength) {
                    console.log('notice5');
                    res.status(200).end();
                }
            }
        }
    });
}
