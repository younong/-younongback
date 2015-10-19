/**
 * by zhao_hui
 */
var router = require("express").Router();
var nodeExcel = require('excel-export');//关联excel-export模块
var ordersDao = require('./ordersModel');
var moment = require('moment');

/**
 * @desc 根据条件查询订单
 */
function findOrder(req,res){
    console.log(req.query);
	var query = req.query;
	// 组装条件对象
	var condition = {orderNo:null,dateRange:null,orderStatusId:null};
	if(!!query.orderNo) condition.orderNo = query.orderNo;
	if(!!query.orderStatusId) condition.orderStatusId = query.orderStatusId;
	if(!!query.dateStart && !!query.dateEnd){
		// 开始和结束时间都不为空
		condition.dateRange = {
			dateStart:moment(query.dateStart).format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment(query.dateEnd).format('YYYY-MM-DD HH:mm:ss')
		}
	}
	if(!query.dateStart && !!query.dateEnd){
		// 开始为空
		condition.dateRange = {
			dateStart:moment('1971-01-01').format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment(query.dateEnd).format('YYYY-MM-DD HH:mm:ss')
		}
	}
	if(!!query.dateStart && !query.dateEnd){
		// 结束时间为空
		condition.dateRange = {
			dateStart:moment(query.dateStart).format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment().format('YYYY-MM-DD HH:mm:ss')
		}
	}
	// 分页参数的处理
	var page = 1;
	var size = 10;
	if(query.page) page = query.page;
	if(query.size) size = query.size;

	// return res.json(200,{result: condition});

	// 请求数据查询
	ordersDao.findByCondition(condition, page, size, function(err,data){
		var resultObject;
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    resultObject = {
	    	results:data
	    }
	    ordersDao.getOrderCountByCondition(condition, function(err, data){
	    	if (!!err) {
		        console.log(err);
		        return res.json(500, {error: err});
		    }
	    	console.log('xxjjcc',data);
	    	resultObject.counts = data[0].total;
	    	return res.json(200, resultObject);
	    })
	})
}


/**
 * @desc 根据订单id查询订单详情
 */
function findOrderDetail(req,res){
	var orderid = req.query.orderid;
 	if(!orderid){
 		return res.json(200, {results:[]})
 	}

	ordersDao.findDetail(orderid,function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

/**
 * @desc 根据订单id查询订单商品
 */ 
function getOrderProducts(req, res){
 	var orderid = req.query.orderid;
 	if(!orderid){
 		return res.json(200, {results:[]})
 	}
	ordersDao.findOrderProducts(orderid,function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
 }

/**
 * @desc 批量发货
 */
function deliver(req, res){
	var orderids = req.query.orderids.split("_")
 	if(!orderids || !req.query.orderids){
 		return res.json(200, {results:[]})
 	}
 	var orderStatusId = 3; //已支付已发货
	ordersDao.updateOrderStatusId(orderids, orderStatusId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    ordersDao.updateDeliverStatus(orderids, '正在配货', function(err, data){
	    	if(!!err){
	    		console.log(err);
	        	return res.json(500, {error: err});
	    	}
	    	return res.json(200, {results: data});

	    })
	    
	})
}


/**
 * @desc 关闭订单
 */
function closeOrder(req, res){
	var orderids = req.query.orderids.split("_")
 	if(!orderids){
 		return res.json(200, {results:[]})
 	}
 	var orderStatusId = 8; //已关闭
	ordersDao.updateOrderStatusId(orderids, orderStatusId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

/**
 * @desc 获取订单状态属性
 */
function getOrderStatus(req, res){
	ordersDao.getOrderStatus(function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

/**
 * @desc 导出订单表excel
 */ 
function exportExcel(req, res){
 	// 根据条件读取所有表格数据
 	var query = req.query;
	// 组装条件对象
	var condition = {orderNo:null,dateRange:null,orderStatusId:null};
	if(!!query.orderNo) condition.orderNo = query.orderNo;
	if(!!query.orderStatusId) condition.orderStatusId = query.orderStatusId;
	if(!!query.dateStart && !!query.dateEnd){
		// 开始和结束时间都不为空
		condition.dateRange = {
			dateStart:moment(query.dateStart).format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment(query.dateEnd).format('YYYY-MM-DD HH:mm:ss')
		}
	}
	if(!query.dateStart && !!query.dateEnd){
		// 开始为空
		condition.dateRange = {
			dateStart:moment('1971-01-01').format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment(query.dateEnd).format('YYYY-MM-DD HH:mm:ss')
		}
	}
	if(!!query.dateStart && !query.dateEnd){
		// 结束时间为空
		condition.dateRange = {
			dateStart:moment(query.dateStart).format('YYYY-MM-DD HH:mm:ss'),
			dateEnd:moment().format('YYYY-MM-DD HH:mm:ss')
		}
	}
	// 分页参数的处理
	var page = 1;
	var size = 10;
	if(query.page) page = query.page;
	if(query.size) size = query.size;

	// return res.json(200,{result: condition});

	// 请求数据查询
	ordersDao.findByCondition(condition, page, size, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    // 将数据转化为表格形式
	    var conf = convertToTable(data);
		// 生成excel文件
		var excelBinary = nodeExcel.execute(conf);
	    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	    res.setHeader("Content-Disposition", "attachment; filename=" + Date.now()+".xlsx");
	    return res.end(excelBinary, 'binary');

	    // return res.json(200,{results: conf});
	})
 }
/**
 * @desc 将data转化为excel表格数据形式
 */ 
function convertToTable(orders){
	var conf = {
		cols:[],
		rows:[]
	}
	// 订单字段映射
	var map = {
		'order_id':'订单id', // id
		'order_no':'订单编号', // 编号
		'receiver_name':'收货人姓名', // 收货人姓名
		'deliver_phone':'收货人电话', // 收货人电话
		'deliver_address':'收货地址', // 收货地址
		'status_name':'订单状态', // 订单状态
		'payment_type':'付款方式', // 付款方式
		'date_purchased':'下单时间'  // 下单时间
	}
	// 遍历生成表格数据
	// 生成表格头部
	for(var key in map){
		var value = map[key];
		conf.cols.push({
			caption:value,
			type:'string'
		})
	}
	// 生成表格元素
	orders.forEach(function(order,index,a){
		var row = []
		for(var key in map){
			row.push(order[key]);
		}
		conf.rows.push(row);
	})
	return conf;
}

router.get("/find",findOrder);
router.get("/findDetail",findOrderDetail);
router.get("/deliver",deliver);
router.get("/close",closeOrder);
router.get("/getOrderProducts",getOrderProducts);
router.get("/statusOptions",getOrderStatus);
router.get("/exportExcel",exportExcel);

module.exports = router;
