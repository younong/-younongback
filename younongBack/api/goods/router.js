/**
 * by zhao_hui
 */
var router = require("express").Router();
var goodsDao = require('./goodsModel');

function getGoods(req, res){
    goodsDao.getGoods(function(err,data){
            return res.json(200, {result: data});
        }
    );
}


router.get("/getGoods", getGoods); // 登录

module.exports = router;
