/**
 * Created by zhaohui on 15-5-8.
 */
// 商品相关服务配置文件
define(['common/services'],
    function (services) {
        services.factory('ProductService', function ($http) {

            return {
                getGoods:function(page,size,keyword,cb){
                    $http.get('/api/goods/getGoods/'+page+'/'+size+"?word=" + keyword).success(function(data){
                        cb(data);
                    }).error(function(err){
                        cb(err);
                    });

                },
                addGoods:function(data,cb){
                    $http.post('/api/goods/addGoods',data).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null);
                    });
                },
                getGoodsInformation:function(prod_id,cb){
                    $http.get('/api/goods/getGoodsInformation/'+prod_id).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null);
                    })
                },
                updateProduct:function(goods,cb){
                    $http.post('/api/goods/updateGoods',goods).success(function(data){
                        cb(null,data)

                    }).error(function(err){
                        cb(err,null);
                    })

                }
            }



        });
    });
