var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hot', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNewsList', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNews', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/searchNews', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNewsClass', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
