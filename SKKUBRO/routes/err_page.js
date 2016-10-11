var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('없는 페이지거나 잘못된 접근입니다.');
});

module.exports = router;
