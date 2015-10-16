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



router.post("/updateCarousel",updateCarousel);
router.get("/getCarousel",getCarousel);


module.exports = router;
