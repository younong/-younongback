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
            		var urlTmpl = '/api/orders/find?orderNo=&dateStart={dateStart}&dateEnd={dateEnd}&orderStatusId={orderStatusId}&page={page}&size={size}';
            		var url = urlTmpl.replace(/{(\w+)}/g,function($0,$1){
		                return params[$1]===undefined?"":params[$1];
		            });
		            $http.get(url).success(function(data){
                        cb(data);
                    }).error(function(err){
                        cb(err);
                    });
            	}
            }
        });
    });