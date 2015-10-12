/**
 * Created by zhaohui on 15-5-8.
 */
// 商品相关服务配置文件
define(['common/services'],
    function (services) {
        services.factory('CategoryService', function ($http) {
        	return {
        		test:function(){
        		 	console.log("cateserver");
        		}
        	}
        });
    });
