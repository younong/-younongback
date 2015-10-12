/**
 * by zhao_hui
 */
var sqlClient = require('../lib/mysql/mysql');
var goodsDao = module.exports;


/**
 * 获取所有商品接口
 */
goodsDao.getGoods = function (cb) {
    var sql = "select prod_id,prod_name,prod_desc,prod_origin,pro_categorynames from products where prod_status != 5";
    sqlClient.query(sql,'', function(err, data){
        if(err){
            return cb(err, null);
        }
        return cb(null, data);
    });
};

