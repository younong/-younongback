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

// 获取商品详细信息
function getGoodsInformation(req,res){
    var prod_id = req.params.prod_id;
    goodsDao.getGoodsInformation(prod_id,function(err,data){
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
    console.log(goods);
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

//修改商品信息
function updateGoods(req,res){
    var goods=req.body;
    goodsDao.updateGoods(goods,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//删除商品

function delGoods(req,res){
    var prod_id = req.params.prod_id;
    goodsDao.delGoods(prod_id,function(err,data){
        if(err){
            return res.json(500,err);
        }
        return res.json(200, data);

    });



}


router.get("/getGoods/:page/:size", getGoods); // 获取商品
router.get("/getGoodsInformation/:prod_id", getGoodsInformation); //获取商品详细信息
router.get("/delGoods/:prod_id", delGoods); //删除商品
router.post("/addGoods", addGoods); // 添加商品
router.post("/upload", upload); // 添加商品图片
router.post("/updateGoods", updateGoods); //修改商品信息

module.exports = router;
