/**
 * 用户模块路由
 * Created by Administrator on 15-3-5.
 */
var cateDao = require("./categoriesModel");
var log = require("bole")("users/router");
var router = require("express").Router();

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
	    return res.json(200, {result: data});
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
	    return res.json(200, {result: data});
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


/**
 * @desc 修改品类
 * @func chgCate
 * @param {object} req http请求对象
 * @param {object} res http响应对象
 */

function chgCate(req,res){
    var data = req.body;
    console.log(data);
    cateDao.chgCate(data,function(err, data){
        if (!!err) {
            console.log(err);
            return res.json(500, {error: err});
        }
        return res.json(200, {result: data});
    })

}



router.get("/add",addCate);
router.get("/delete",deleteCate);
router.get("/find",findCates);
router.post("/chgCate",chgCate);

module.exports = router;