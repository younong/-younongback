/**
 * Created by wei on 15/10/16.
 */

var sqlClient = require('../lib/mysql/mysql');
var othersModel = module.exports;


/**
 * 修改首页轮播图片
 */

othersModel.updateCarouselImages=function(imagesUrl,cb){
    var sql = "update view_pages set imgUrl=? where page_id=1";
    sqlClient.query(sql,imagesUrl, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });
}

/**
 * 获取首页轮播图片
 */

othersModel.getCarouselImages=function(cb){
    var sql = "select imgUrl from view_pages where page_id=1";
    sqlClient.query(sql,null, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });
}


