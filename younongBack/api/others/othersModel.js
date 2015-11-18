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

//获取运费

othersModel.getDelivery=function(cb){

    var sql = "select attr_value from attribute where attr_id=5";
    sqlClient.query(sql,null, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}




//修改运费

othersModel.updateDelivery=function(delivery,cb){

    var sql = "update attribute set attr_value = ? where attr_id = 5";
    console.log(sql);
    sqlClient.query(sql,delivery, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}



//获取运费减免

othersModel.getMisDelivery=function(cb){

    var sql = "select attr_value from attribute where attr_id=6";
    sqlClient.query(sql,null, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}




//修改运费减免

othersModel.updateMisDelivery=function(delivery,cb){

    var sql = "update attribute set attr_value = ? where attr_id = 6";
    console.log(sql);
    sqlClient.query(sql,delivery, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}

//获取配送时间

othersModel.getDeliveryTime=function(cb){

    var sql = "select attr_value from attribute where attr_id=1";
    sqlClient.query(sql,null, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}




//修改配送时间

othersModel.updateDeliveryTime=function(delivery,cb){

    var sql = "update attribute set attr_value = ? where attr_id = 1";
    console.log(sql);
    sqlClient.query(sql,delivery, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });

}


