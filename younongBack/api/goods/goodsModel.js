/**
 * by zhao_hui
 */
var sqlClient = require('../lib/mysql/mysql');
var goodsDao = module.exports;
var moment = require('moment');
var Config = require('../config');


/**
 * 获取有效商品接口
 */
goodsDao.getGoods = function (page,size,keyword,cb) {

    if (!!page && !!size) {
        var like = 'where prod_status != 5';
        if (keyword != 'undefined') {
            console.log("==========================")
            like = ' where prod_name like \'%' + keyword  + '%\' and prod_status != 5 ';
        }
        if (page == 0) {
            page = 1;
        }
    }

    var sql = "select prod_id,prod_name,prod_desc,prod_origin,prod_categorynames from products " + like +
        " order by prod_updatetime desc limit ?,?";

    sqlClient.query(sql,[parseInt((page - 1) * size), parseInt(size)], function(err, data){
        if(err){
            return cb(err, null);
        }

        goodsDao.getGoodsCount(keyword,data,cb);

    });
};

/**
 * 获取商品详细信息
 */

goodsDao.getGoodsInformation=function(prod_id,cb){

    var sql = "select prod_name,prod_desc,prod_images,prod_origin,prod_flag,prod_categoryids,prod_categorynames" +
        ",prod_status,prod_detail,prod_price from products where prod_id =  " + prod_id;

    sqlClient.query(sql,null, function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result[0]);
    });


}

/**
 * 获取有效商品总数量接口
 */

goodsDao.getGoodsCount = function (key,data,cb) {
    var condition = '';
    if (key != 'undefined') {
        condition = ' and prod_name like \'%' + key +'%\'' ;
    }

    var sql = "select count(prod_id) as total from products where prod_status != 5 "+condition;

    sqlClient.query(sql,'', function(err, number){
        if(err){
            return cb(err, null);
        }
        var result={
            results:data,
            counts:number[0].total
        }
        return cb(null,result);
    });
};

/**
 * 新增商品接口
 */

goodsDao.addGoods = function (data,cb) {

    var sql = "insert into products(prod_name,prod_desc,prod_images,prod_origin,prod_flag,prod_categoryids,prod_categorynames" +
        ",prod_status,prod_detail,prod_price,prod_createtime) values(?,?,?,?,1,?,?,4,?,?,?)";

    sqlClient.query(sql,[data.prod_name,data.prod_desc,data.prod_images,data.prod_origin,data.prod_categoryids,
        data.prod_categorynames,data.prod_detail,data.prod_price,moment().format('YYYY-MM-DD HH:mm:ss')], function(err, result){
        if(err){
            return cb(err, null);
        }

        return cb(null,result);
    });
};


/**
 * 商品图片接口
 */

goodsDao.create = function (file, cb) {

//    var sql = "insert into pictures values (NULL,?,?,?)";
//    var params = [file.originalname, Config.url_prefix+file.name, moment().format('YYYY-MM-DD HH:mm:ss')];
//    sqlClient.query(sql, params, function (error, data) {
//
//        if (error) {
//            return cb(error, null);
//        }
////        console.log(data);
//        return cb(null, {path:Config.url_prefix+file.name, id:data.insertId});
//
//    })
    return cb(null, {path:Config.url_prefix+file.name});

};

/**
 * 修改商品信息
 */

goodsDao.updateGoods=function(data,cb){

    var sql = "update products set prod_name=?,prod_desc=?,prod_images=?,prod_origin=?,prod_categoryids=?," +
        "prod_categorynames=?,prod_detail=?,prod_price=?,prod_updatetime=? where prod_id=?";

    sqlClient.query(sql,[data.prod_name,data.prod_desc,data.prod_images,data.prod_origin,data.prod_categoryids,
        data.prod_categorynames,data.prod_detail,data.prod_price,moment().format('YYYY-MM-DD HH:mm:ss'),data.prod_id], function(err, result){
        if(err){
            return cb(err, null);
        }
        return cb(null,result);
    });




}


