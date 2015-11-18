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


//获取运费减免规则
function getMisDelivery(req,res){

    othersDao.getMisDelivery(function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );
}

//修改运费减免规则

function updateMisDelivery(req,res){

    var delivery = req.body.data;

    othersDao.updateMisDelivery(delivery,function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );

}


//获取运费时间
function getDeliveryTime(req,res){

    othersDao.getDeliveryTime(function(err,data){
            if(err){
                return res.json(500,err);
            }
            return res.json(200, data);
        }
    );

}


//修改运费时间
function updateDeliveryTime(req,res){
    var deliveryTime = req.body.data;

    othersDao.updateDeliveryTime(deliveryTime,function(err,data){
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

router.get("/getMisDelivery",getMisDelivery);//获取运费减免规则
router.post("/updateMisDelivery",updateMisDelivery);//修改运费减免规则

router.get("/getDeliveryTime",getDeliveryTime);//获取运费时间
router.post("/updateDeliveryTime",updateDeliveryTime);//修改运费时间




module.exports = router;
