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
                 * @desc 获取运费减免
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
                },
                /**
                 * @desc 获取配送时间
                 */
                getDeliveryTime:function(cb){
                    $http.get('/api/others/getDeliveryTime').success(function(data){
                        cb(null,data)
                    }).error(function(err){
                        cb(err,null)
                    })
                },
                updateDeliveryTime:function(delivery,cb){
                    $http.post('/api/others/updateDeliveryTime',delivery).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null)
                    })
                },
                /**
                 * @desc 获取运费规则描述
                 */
                getDeliveryRule:function(cb){
                    $http.get('/api/others/getDeliveryRule').success(function(data){
                        cb(null,data)
                    }).error(function(err){
                        cb(err,null)
                    })
                },
                updateDeliveryRule:function(deliveryRule,cb){
                    $http.post('/api/others/updateDeliveryRule',deliveryRule).success(function(data){
                        cb(null,data);

                    }).error(function(err){
                        cb(err,null)
                    })
                }
            }
        });

        services.service('Util', function($q) {
            var dataURItoBlob = function(dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {
                    type: mimeString
                });
            };

            var resizeFile = function(file) {
                var deferred = $q.defer();
                var img = document.createElement("img");
                try {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        img.src = e.target.result;

                        //resize the image using canvas
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        var MAX_WIDTH = 640;
                        var MAX_HEIGHT = 640;
                        var width = img.width;
                        var height = img.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        //change the dataUrl to blob data for uploading to server
                        var dataURL = canvas.toDataURL('image/jpeg');
                        var blob = dataURItoBlob(dataURL);

                        deferred.resolve(blob);
                    };
                    reader.readAsDataURL(file);
                } catch (e) {
                    deferred.resolve(e);
                }
                return deferred.promise;

            };
            return {
                resizeFile: resizeFile
            };

        });


    });
