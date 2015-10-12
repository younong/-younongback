/**
 * 用户模块路由
 * Created by Administrator on 15-3-5.
 */
var cateDao = require("./categoriesModel");
var log = require("bole")("users/router");
var router = require("express").Router();
var utils = require('../lib/utils');

/**
 * @desc 增加一个品类
 * @func addCate
 * @param {object} req http请求对象
 * @param {object} res http响应对象
 */ 
function addCate(req, res){
	var catename = req.query.catename || '';
	if(catename === ''){
		return res.json(400, {error: "请传入正确的参数：catename"})
	}
	cateDao.add(catename, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {result: 'success'});
	})
}

/**
 * @desc 删除一个品类
 * @func deleteCate
 * @param {object} req http请求对象
 * @param {object} res http响应对象
 */ 
function deleteCate(req, res){
	var cateid = req.query.cateid || '';
	if(cateid === ''){
		return res.json(400, {error: "请传入正确的参数：cateid"})
	}
	cateDao.delete(cateid, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {result: 'success'});
	})
}

 /**
 * @desc 查询品类
 * @func findCates
 * @param {object} req http请求对象
 * @param {object} res http响应对象
 */ 
function findCates(req, res){
	cateDao.find(function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {result: data});
	})
}


// function login(req, res) {
//     console.log("============> login");
//     var username = req.body.username || '';
//     var password = req.body.password || '';
//     console.log("============> username   " + username);


//     if (username === '' || password === '') {
//         return res.send(400);
//     }
//     // 用户名&密码 登录
//     userDao.findByUsername(username, function (err, user) {
//         checkUser(req, res, err, user);
//     });
// }

// // 登录检查
// function checkUser(req, res, err, data) {
//     if (!!err) {
//         console.log(err);
//         return res.json(500, {error: err});
//     }
//     if (!data || data.length == 0) {
//         return res.json(400, {error: "用户不存在"});
//     }
//     var pwd = data[0].user_passwd || '';
//     if (pwd === '' || pwd != req.body.password) {
//         return res.json(400, {error: "用户名密码不匹配"});
//     }
//     return res.json(200, {result: data[0]});
// }

// router.post("/login", login); // 登录
router.get("/add",addCate);
router.get("/delete",deleteCate);
router.get("/find",findCates);

module.exports = router;