/**
 * by zhao_hui
 */
var router = require("express").Router();
var goodsDao = require('./goodsModel');


// 获取商品
function getGoods(req, res){
    var page = req.params.page;
    var size = req.params.size;
    var keyword = req.query.word;
    goodsDao.getGoods(page,size,keyword,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );

}

// 添加商品
function addGoods(req,res){
    var goods=req.body;
    goodsDao.addGoods(goods,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//添加商品图片
function upload(req, res){

    if (req.files && req.files.file) {
        goodsDao.create(req.files.file, function (error, data) {
            if (error) {
                return res.json(500);
            }
            return res.json(data);
        });

    }

}




router.get("/getGoods/:page/:size", getGoods); // 获取商品
router.post("/addGoods", addGoods); // 添加商品
router.post("/upload", upload); // 添加商品图片

module.exports = router;
