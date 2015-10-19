var SqlClient = require('../lib/mysql/mysql');
var utils = require('../lib/utils');
var categories = module.exports;


// /**
//  * example
//  * @param code
//  * @param cb
//  */
// categories.findByUsername = function (username, cb) {
//     if(!username){
//         return cb("用户名不能为空");
//     }
//     var sql = "select * from users where user_name = ?";
//     SqlClient.query(sql, username, function(err, data){
//         if(err){
//             return cb(err, null);
//         }
//         return cb(null, data);
//     });
// };

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