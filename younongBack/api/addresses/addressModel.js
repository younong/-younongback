/**
 * by zhao_hui
 */
var sqlClient = require('../lib/mysql/mysql');
var addressDao = module.exports;

// /**
//  * @desc 查询所有品种元素
//  * @func find
//  * @param cb
//  */

// categories.find = function(cb){
//     var sql = "select categories_id, category_name, date_added from categories where parent_id is null and category_status=1";
//     SqlClient.query(sql,function(err, data){
//         if(err){
//             return  cb&&cb(err, null);
//         }
//         return cb&&cb(null, data);
//     })
// }

/**
 * @desc 查看
 */

addressDao.getProvinces = function(cb){
	// TODO 模拟数据
	var data = [{
		province_id:1,
		province_name:'江苏省'
	},{
		province_id:2,
		province_name:'浙江省'
	}];

	cb && cb(null, data);
}
// 城市
addressDao.getCities = function(provinceId, cb){
	var data = [{
		city_id:1,
		city_name:'苏州'
	},{
		city_id:2,
		city_name:'南京'
	}]

	cb && cb(null, data);
}

addressDao.deleteCity = function(cityId, cb){
	cb && cb(null, {});
}

addressDao.modifyCity = function(cityId, cityName, cb){
	cb && cb(null, {});
}

addressDao.addCity = function(provinceId, cityName, cb){
	cb && cb(null, {});
}

// 区
addressDao.getDistricts = function(provinceId, cb){
	var data = [{
			district_id:1,
			district_name:'工业园区'
		},{
			district_id:2,
			district_name:'吴中区'
		}];

	cb && cb(null, data);
}

addressDao.deleteDistrict = function(cityId, cb){
	cb && cb(null, {});
}

addressDao.modifyDistrict = function(cityId, cityName, cb){
	cb && cb(null, {});
}

addressDao.addDistrict = function(cityName, cb){
	cb && cb(null, {});
}

// 小区
addressDao.getComms = function(provinceId, cb){
	var data = [{
		comm_id:1,
		comm_name:'丰楼正'
	},{
		comm_id:2,
		comm_name:'金鸡湖'
	}]

	cb && cb(null, data);
}

addressDao.deleteComm = function(cityId, cb){
	cb && cb(null, {});
}

addressDao.modifyComm = function(cityId, cityName, cb){
	cb && cb(null, {});
}

addressDao.addComm = function(cityName, cb){
	cb && cb(null, {});
}