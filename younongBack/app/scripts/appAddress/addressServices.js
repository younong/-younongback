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
        			data = [];
        			cb&&cb(null, data);
        			console.log('cityName', cityName);
        		},
        		modifyCity:function(cityId, cityName, cb){
        			data = [];
        			cb&&cb(null, data);
        			console.log('修改为', cityName);
        		},
        		deleteCity:function(cityId, cb){
        			data = [];
        			cb&&cb(null, data);
        			console.log("已经删除了", cityId);
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
        			data = [];
        			cb&&cb(null, data);

        			console.log("添加区",districtName);
        		},
        		modifyDistrict:function(districtId, districtName, cb){
        			data = [];
        			cb&&cb(null, data);

        			console.log("修改区",districtName);
        		},
        		deleteDistrict:function(districtId, cb){
        			data = [];
        			cb&&cb(null, data);

        			console.log("删除区", districtId);
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
        			data = [];
        			cb&&cb(null, data);
        			console.log("添加小区",commName);
        		},
        		modifyComm:function(commId, commName, cb){
        			data = [];
        			cb&&cb(null, data);
        			console.log("修改小区",commName);
        		},
        		deleteComm:function(commId, cb){
        			data = [];
        			cb&&cb(null, data);
        			console.log("删除小区",commId);
        		},
        	}
        });
    });
