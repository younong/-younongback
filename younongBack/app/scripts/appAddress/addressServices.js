/**
 * Created by zhaohui on 15-5-8.
 */
define(['common/services'],
    function (services) {
        services.factory('AddressService', function ($http) {

        	return {
        		getTest:function(){
        			return "success";
        		},
        		// 省，获取
        		getProvinces:function(cb){
        			$http.get('/api/addresses/getProvinces').success(function(data){
	        			cb(null, data.results)
	        		}).error(function(err){
	        			cb(err, null)
	        		})
        		},
        		// 城市，获取，添加，修改，删除
        		getCities:function(provinceId, cb){
        			$http.get('/api/addresses/getCities?provinceId='+provinceId).success(function(data){
	        			cb(null, data.results)
	        		}).error(function(err){
	        			cb(err, null)
	        		})
        		},
        		addCity:function(provinceId, cityName, cb){
                    $http.get('/api/addresses/addCity?provinceId='+provinceId+'&cityName='+cityName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		modifyCity:function(cityId, cityName, cb){
        			$http.get('/api/addresses/modifyCity?cityId='+cityId+'&cityName='+cityName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		deleteCity:function(cityId, cb){
        			$http.get('/api/addresses/deleteCity?cityId='+cityId).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		// 区，获取，添加，修改，删除
        		getDistricts:function(cityId, cb){
        			$http.get('/api/addresses/getDistricts?cityId='+cityId).success(function(data){
	        			cb(null, data.results)
	        		}).error(function(err){
	        			cb(err, null)
	        		})
        		},
        		addDistrict:function(cityId, districtName, cb){
        			$http.get('/api/addresses/addDistrict?cityId='+cityId+'&districtName='+districtName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		modifyDistrict:function(districtId, districtName, cb){
        			$http.get('/api/addresses/modifyDistrict?districtId='+districtId+'&districtName='+districtName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		deleteDistrict:function(districtId, cb){
        			$http.get('/api/addresses/deleteDistrict?districtId='+districtId).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		// 小区，获取，添加，修改，删除
        		// TODO xjc
        		getComms:function(districtId, cb){
        			$http.get('/api/addresses/getComms?districtId='+districtId).success(function(data){
	        			cb(null, data.results)
	        		}).error(function(err){
	        			cb(err, null)
	        		})
        		},
        		addComm:function(districtId, commName, cb){
        			$http.get('/api/addresses/addComm?districtId='+districtId+'&commName='+commName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
        		},
        		modifyComm:function(commId, commName, cb){
        			$http.get('/api/addresses/modifyComm?commId='+commId+'&commName='+commName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })

        		},
        		deleteComm:function(commId, cb){
        			$http.get('/api/addresses/deleteComm?commId='+commId).success(function(data){
                        cb(null, data.results);
                    }).error(function(err){
                        cb(err, null);
                    })
        		},
                addSince:function(districtId, commName, cb){
                    $http.get('/api/addresses/addSince?districtId='+districtId+'&commName='+commName).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
                },
                getSince:function(districtId, cb){
                    $http.get('/api/addresses/getSince?districtId='+districtId).success(function(data){
                        cb(null, data.results)
                    }).error(function(err){
                        cb(err, null)
                    })
                }
        	}
        });
    });
