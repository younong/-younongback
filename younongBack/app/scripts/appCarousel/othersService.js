/**
 * Created by wei on 15/10/16.
 */

// 其它相关服务配置文件
define(['common/services'],
    function (services) {
        services.factory('others', function ($http) {


            return {
                /**
                 * @desc 获取轮播图片
                 */
                getCarousel:function(cb){
                    $http.get('/api/others/getCarousel').success(function(data){
                        cb(null,data)

                    }).error(function(err){
                        cb(err,null)
                    })
                },
                /**
                 * @desc 修改轮播图片
                 */
                updateCarousel:function(imagesUrl,cb){
                    $http.post('/api/others/updateCarousel',imagesUrl).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null)
                    })
                },
                /**
                 * @desc 获取运费
                 */
                getDelivery:function(cb){
                    $http.get('/api/others/getDelivery').success(function(data){
                        cb(null,data)
                    }).error(function(err){
                        cb(err,null)
                    })
                },
                updateDelivery:function(delivery,cb){
                    $http.post('/api/others/updateDelivery',delivery).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null)
                    })
                },
                /**
                 * @desc 获取运费
                 */
                getMisDelivery:function(cb){
                    $http.get('/api/others/getMisDelivery').success(function(data){
                        cb(null,data)
                    }).error(function(err){
                        cb(err,null)
                    })
                },
                updateMisDelivery:function(delivery,cb){
                    $http.post('/api/others/updateMisDelivery',delivery).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null)
                    })
                }





            }
        });
    });
