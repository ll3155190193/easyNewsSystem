var express = require('express');
var router = express.Router();
const query = require('../utils/mySql');
const jiami = require('../utils/sha1');
const getToken = require('../utils/getToken');

// 注册
router.post('/reg', async function (req, res) {
  try {
    const { uid, pwd } = req.body;
    const users = await query('select * from admins where username=?', [uid]);
    if (users.length > 0) {
      res.json({
        flag: false,
        msg: '用户名已存在'
      })
    } else {
      await query('insert into admins (username,password,createdAt,updatedAt) values (?,?,now(),now())', [uid, jiami(pwd)]);
      res.json({
        flag: true,
        msg: '注册成功'
      })
    }
  } catch (e) {
    next(e);
  }
})
// 登录
router.post('/login', function (req, res) {
  res.json('q');
})
// 修改密码
router.post('/modifyPwd', function (req, res) {
  res.json('q');
})
// 新闻分类
// 添加新闻
router.post('/addNewsClass', function (req, res) {
  res.json('q');
})
// 修改新闻
router.post('/modifyClass', function (req, res) {
  res.json('q');
})
// 移除新闻
router.post('/deleteClass', function (req, res) {
  res.json('q');
})
// 添加新闻
router.post('/addNews', function (req, res) {
  res.json('q');
})
// 修改新闻
router.post('/modifyNews', function (req, res) {
  res.json('q');
})
// 移除新闻
router.post('/deleteNews', function (req, res) {
  res.json('q');
})

module.exports = router;
