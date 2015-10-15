/**
 * Created by zhaohui on 15-5-8.
 */
// 商品相关服务配置文件
define(['common/services'],
    function (services) {
        services.factory('OrderServices', function ($http) {
            return{
            	getOrders:function(params, cb){
            		// dateStart, dateEnd, orderStatusId, page, size
            		var urlTmpl = '/api/orders/find?orderNo={orderNo}&dateStart={dateStart}&dateEnd={dateEnd}&orderStatusId={orderStatusId}&page={page}&size={size}';
            		var url = urlTmpl.replace(/{(\w+)}/g,function($0,$1){
		                return params[$1]===undefined?"":params[$1];
		            });
		            $http.get(url).success(function(data){
                        cb(null, data);
                    }).error(function(err){
                        cb(err, null);
                    });
            	},
                getExportExcelUrl:function(params){
                    // dateStart, dateEnd, orderStatusId, page, size
                    var urlTmpl = '/api/orders/exportExcel?orderNo={orderNo}&dateStart={dateStart}&dateEnd={dateEnd}&orderStatusId={orderStatusId}&page={page}&size={size}';
                    var url = urlTmpl.replace(/{(\w+)}/g,function($0,$1){
                        return params[$1]===undefined?"":params[$1];
                    });
                    return url;
                },
                deliver:function(orderids ,cb){
                    var url = 'api/orders/deliver?orderids='+orderids.join('_');
                    $http.get(url).success(function(data){
                        cb(null, data);
                    }).error(function(err){
                        cb(err, null);
                    });
                },
                getStatusOptions:function(cb){
                    var url = '/api/orders/statusOptions';
                    $http.get(url).success(function(data){
                        cb(null, data);
                    }).error(function(err){
                        cb(err, null);
                    });
                },
                getOrderDetail:function(orderid, cb){
                    var orderDetail = {};
                    $http.get('/api/orders/findDetail?orderid='+orderid).success(function(data){
                        if(data.results.length <= 0){
                            console.log("获取的订单为空");
                            return;
                        }
                        orderDetail = data.results[0];
                        // orderDetail.product_number = 
                        $http.get('/api/orders/getOrderProducts?orderid='+orderid).success(function(data){    
                            orderDetail.items = data.results;
                            // 计算商品数量
                            orderDetail.product_number = 0;
                            for(var index in orderDetail.items){
                                var item = orderDetail.items[index];
                                orderDetail.product_number += item.product_quantity;
                            }
                            cb(null, orderDetail);
                        }).error(function(err){
                            cb(err, null);
                        })
                    }).error(function(err){
                        cb(err, null);
                    });
                }
            }
        });
    });