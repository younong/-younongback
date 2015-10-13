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
 	if(!orderids){
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

router.get("/find",findOrder);
router.get("/findDetail",findOrderDetail);
router.get("/deliver",deliver);
router.get("/close",closeOrder);
router.get("/getOrderProducts",getOrderProducts);

module.exports = router;
