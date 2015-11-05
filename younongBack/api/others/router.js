/**
 * Created by wei on 15/10/16.
 */

var router = require("express").Router();
var othersDao = require('./othersModel');

//修改首页轮播图片

function updateCarousel (req,res){
    var imagesUrl = req.body;
    othersDao.updateCarouselImages(imagesUrl.imgUrl,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//获取首页轮播图片
function getCarousel(req,res){
    othersDao.getCarouselImages(function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//获取运费
function getDelivery(req,res){

    othersDao.getDelivery(function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//修改运费

function updateDelivery(req,res){

    var delivery = req.body.data;

    othersDao.updateDelivery(delivery,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );

}



router.post("/updateCarousel",updateCarousel);//修改轮播图片
router.get("/getCarousel",getCarousel);//获取轮播图片

router.get("/getDelivery",getDelivery);//获取运费
router.post("/updateDelivery",updateDelivery);//修改运费


module.exports = router;
