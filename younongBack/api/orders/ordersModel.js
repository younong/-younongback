var SqlClient = require('../lib/mysql/mysql');
var utils = require('../lib/utils');
var orders = module.exports;

/**
 * @desc 根据条件查询订单
 * @func findByCondition
 * @param {object} condition 查询条件
 * @param {number} page 页码
 * @param {size} size 每页数据量
 * @param {func} cb 回调函数
 */
orders.findByCondition = function(condition, page, size, cb){
	// console.log(page-1, size);
    if(condition.orderStatusId == 0){
        condition.orderStatusId='';
    }

	var sql = '';
	var fields = [
		'order_id', // id
		'order_no', // 编号
		'receiver_name', // 收货人姓名
		'deliver_phone', // 收货人电话
		'deliver_address', // 收货地址
        'order_total',//订单总金额
        'deliver_charges',//运费
		'order_status.status_name', // 订单状态
		'orders.order_status_id', // 订单状态
		'payment_methods.payment_type', // 付款方式
		'date_purchased'  // 下单时间
	];	
	var sqlCondition = 'where ';
	var sqlSelect = 'select '+fields.join(',')+' ';
	var sqlFrom = 'from orders ';
	var sqlJoin = 'left join payment_methods on orders.payment_type=payment_methods.payment_method_id ';
		sqlJoin += 'left join order_status on orders.order_status_id=order_status.order_status_id ';

	// 订单号查询
	if(condition.orderNo){
		sqlCondition += 'order_no='+condition.orderNo+' and ';
	}
	// 订单时间范围查询
	if(condition.dateRange){
		sqlCondition += 'date_purchased < "'+condition.dateRange.dateEnd+'" and date_purchased > "'+condition.dateRange.dateStart+'" and ';
	}

	// 订单状态查询
	if(condition.orderStatusId){
		sqlCondition += 'orders.order_status_id='+condition.orderStatusId+' and ';
	}

	// 对条件字符串做后期处理
	if(sqlCondition.length === 6){
		sqlCondition = '';
	}else{
		sqlCondition = sqlCondition.substring(0,sqlCondition.length-4);
	}

	// 拼接字符串
	sql += sqlSelect+sqlFrom+sqlJoin+sqlCondition+' limit ?,?';
	
	// page容错
	if (page == 0) {
        page = 1;
    }
	// 查询并返回结果
	SqlClient.query(sql,[parseInt((page - 1) * size), parseInt(size)],function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 获取查询订单的总数
 * @func getOrderCountByCondition
 * @param {object} condition 查询条件
 * @param {function} cb 回调函数
 */
orders.getOrderCountByCondition = function(condition, cb){
	var sql = '';
	var sqlCondition = 'where ';
	// 订单号查询
	if(condition.orderNo){
		sqlCondition += 'order_no='+condition.orderNo+' and ';
	}
	// 订单时间范围查询
	if(condition.dateRange){
		sqlCondition += 'date_purchased < "'+condition.dateRange.dateEnd+'" and date_purchased > "'+condition.dateRange.dateStart+'" and ';
	}

	// 订单状态查询
	if(condition.orderStatusId){
		sqlCondition += 'orders.order_status_id='+condition.orderStatusId+' and ';
	}

	// 对条件字符串做后期处理
	if(sqlCondition.length === 6){
		sqlCondition = '';
	}else{
		sqlCondition = sqlCondition.substring(0,sqlCondition.length-4);
	}

	// 拼接sql字符串
	sql += "select count(order_id) as total from orders " + sqlCondition;

	// 查询并返回结果
	SqlClient.query(sql,null,function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 查询订单详情
 */
orders.findDetail = function(orderid, cb){
	var sql = '';
	// sql片段	
	var fields = [
		'deliver_phone',
		'deliver_address',
		'receiver_name',
		'orders.order_no',
		'order_status',
		'order_status.status_name', // 订单状态
		'orders.order_status_id',
		'date_purchased',
		'deliver_type',
		'order_total',
		'payment_methods.payment_type',
		'payments.payment_amount'
	]
	// 拼接sql
	sql = 'select '+fields.join(',')+' from orders \
		left join payment_methods on orders.payment_type=payment_methods.payment_method_id \
		left join order_status on orders.order_status_id=order_status.order_status_id \
		left join payments on orders.order_no=payments.order_no \
		where orders.order_id = ?';

	// 查询并返回结果
	SqlClient.query(sql,[orderid],function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
* @desc 查询订单商品
*/
orders.findOrderProducts = function(orderid, cb){
	var sql = '';
	// sql片段
	var fields = [
		'products.prod_images',
		'products.prod_name', 
		'products.prod_desc', 
		'products.prod_price',
		'order_items.product_quantity'
	]
	// 拼接sql
	sql = 'select '+fields.join(',')+' from order_items \
			left join products on order_items.prod_sku_id = products.prod_id \
			where order_items.order_id = ?'
	// 查询并返回结果
	SqlClient.query(sql,[orderid],function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
	
}

/**
 * @desc 修改订单状态
 */
orders.updateOrderStatusId = function(orderids, statusid, cb){
	var sql = 'update orders set order_status_id = ? where order_id in ('+orderids.join(',')+')';

	// 查询并返回结果
	SqlClient.query(sql,[statusid],function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
}

/**
 * @desc 修改订单配送状态状态
 */
orders.updateDeliverStatus = function(orderids, status, cb){
 	var sql = 'update orders set deliver_status = ? where order_id in ('+orderids.join(',')+')';

	// 查询并返回结果
	SqlClient.query(sql,[status],function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
 }

/**
 * @desc 获取订单状态的属性
 */
 orders.getOrderStatus = function(cb){
 	var sql = 'select * from order_status';
 	
 	// 查询并返回结果
	SqlClient.query(sql,null,function(err, data){
        if(err){
            return  cb&&cb(err, null);
        }
        return cb&&cb(null, data);
    })
 }