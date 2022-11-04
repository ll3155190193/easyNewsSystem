var express = require('express');
var router = express.Router();
const query = require('../utils/mySql')

/* GET users listing. */
router.get('/hot', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNewsList', async function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNews', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/searchNews', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getNewsClass', async function (req, res, next) {
  const classNames = await query('select * from classnews');
  res.json({
    flag: true,
    data: classNames
  })
});

module.exports = router;
