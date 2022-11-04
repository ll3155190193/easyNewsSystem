var express = require('express');
var router = express.Router();
const query = require('../utils/mySql');
const jiami = require('../utils/sha1');
const { getToken, verifyToken } = require('../utils/token');
require('express-async-errors');
const { expressjwt } = require('express-jwt');

const $ = fn => (...args) => fn(...args).catah(args[2]);

// 注册
router.post('/reg', async function (req, res, next) {
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
})
// 登录
router.post('/login', async function (req, res, next) {
  const { uid, pwd } = req.body;
  const users = await query('select * from admins where username=? and password=?', [uid, jiami(pwd)]);
  if (users.length > 0) {
    res.json({
      flag: true,
      msg: '登陆成功',
      token: getToken({ id: users[0].id }, '1h')
    })
  } else {
    res.json({
      flag: false,
      msg: '用户名或密码错误'
    })
  }
})
// 修改密码
// router.all('*',);

router.post('/modifyPwd', verifyToken(), async function (req, res, next) {
  const { newPwd } = req.body;
  const { id } = req.auth;
  console.log(id, newPwd);
  await query('update admins set password=? where id=?', [jiami(newPwd), id]);
  res.json({
    flag: true,
    msg: '修改成功'
  })
})
// 新闻分类
// 添加新闻
router.post('/addNewsClass', async function (req, res, next) {
  const { className, classExplain } = req.body;
  const classNames = await query('select * from classnews where className=?', [className]);
  if (classNames.length > 0) {
    res.json({
      flag: false,
      msg: '分类名称已存在'
    })
  } else {
    await query('insert into classnews (className,classExplain,createdAt,updatedAt) values (?,?,now(),now())', [className, classExplain]);
    res.json({
      flag: true,
      msg: '分类新增成功'
    })
  }
});
// 修改新闻
router.post('/modifyClass', async function (req, res, next) {
  const { className, classExplain, id } = req.body;
  await query('update classnews set className=?,classExplain=?,updatedAt=now() where id=?', [className, classExplain, id]);
  res.json({
    flag: true,
    msg: '修改成功'
  })
})
// 移除新闻
router.post('/deleteClass', async function (req, res, next) {
  const { classId } = req.body;
  await query('delete from classnews where id=?', [classId]);
  res.json({
    flag: true,
    msg: '删除成功'
  })
})
// 添加新闻
router.post('/addNews', function (req, res, next) {
  res.json('q');
})
// 修改新闻
router.post('/modifyNews', function (req, res, next) {
  res.json('q');
})
// 移除新闻
router.post('/deleteNews', function (req, res, next) {
  res.json('q');
})

module.exports = router;
