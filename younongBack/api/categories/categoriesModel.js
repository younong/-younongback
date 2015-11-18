var SqlClient = require('../lib/mysql/mysql');
var utils = require('../lib/utils');
var categories = module.exports;




/**
 * @desc 查询所有品种元素
 * @func find
 * @param cb
 */

categories.find = function(cb){
    var sql = "select categories_id, category_name, date_added from categories where parent_id is null and category_status=1";
    SqlClient.query(sql,null,function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 删除一个品类
 * @func delete
 * @param {string} cid 品种id
 * @param {function} cb
 */

categories.delete = function(cid, cb){
    var sql = "update categories set category_status = 0 where categories_id = ?";
    SqlClient.query(sql, cid, function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 增加一个品类
 * @func add
 * @param {string} cname 品类名
 * @param {function} cb
 */

categories.add = function(cname, cb){
    var sql = "insert into categories (category_name, parent_id, date_added, category_status, on_shelf) value (?,null, now(),1,1)";
    SqlClient.query(sql, cname, function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 修改一个品类
 * @func chgCate
 * @param {json} data 种类名和id
 * @param {function} cb
 */


categories.chgCate=function(data,cb){

    var sql = "update categories set category_name = ? where categories_id = ?";
    SqlClient.query(sql, [data.category_name,data.categories_id], function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })

}