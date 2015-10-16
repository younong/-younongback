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
	// var data = [{
	// 	province_id:1,
	// 	province_name:'江苏省'
	// },{
	// 	province_id:2,
	// 	province_name:'浙江省'
	// }];

	// cb && cb(null, data);

	var sql = "select * from provinces";
	sqlClient.query(sql, function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}
// 城市
addressDao.getCities = function(provinceId, cb){
	// var data = [{
	// 	city_id:1,
	// 	city_name:'苏州'
	// },{
	// 	city_id:2,
	// 	city_name:'南京'
	// }]

	// cb && cb(null, data);

	var sql = "select * from cities , provinces \
		where cities.province_name = provinces.province_name and province_id = ?";

	sqlClient.query(sql, [provinceId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.deleteCityById = function(cityId, cb){
	var sql = 'delete from cities where city_id = ?';
	sqlClient.query(sql, [cityId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		addressDao.deleteDistrictByCityId(cityId,function(err, data){
			if(err){
				return cb && cb(err, null);
			}
			return cb && cb(null, data);
		})
	})	
}

addressDao.modifyCity = function(cityId, cityName, cb){
	var sql = 'update cities set city_name = ? where city_id = ?';
	sqlClient.query(sql, [cityName, cityId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.addCity = function(provinceId, cityName, cb){
	var sql = 'select * from provinces where province_id = ?';
	sqlClient.query(sql, [provinceId],function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		if(data.length <= 0){
			return cb && cb({err:'没用对应的 province_id'})
		}
		var provinceName = data[0].province_name;
		sql = 'insert into cities (province_name, city_name) values (?, ?)';
		sqlClient.query(sql, [provinceName, cityName], function(err, data){
			if(err){
				return cb && cb(err, null);
			}
			return cb && cb(null, data);
		})
	})
}

// 区
addressDao.getDistricts = function(cityId, cb){
	// var data = [{
	// 		district_id:1,
	// 		district_name:'工业园区'
	// 	},{
	// 		district_id:2,
	// 		district_name:'吴中区'
	// 	}];

	// cb && cb(null, data);
	console.log('cityId',cityId);
	var sql = 'select * from districts where city_id = ?';
	sqlClient.query(sql, [cityId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		console.log('cityId',data);
		return cb && cb(null, data);
	})
}

addressDao.deleteDistrictById = function(districtId, cb){
	var sql = 'delete from districts where district_id = ?';
	sqlClient.query(sql, [districtId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		addressDao.deleteCommByDistrictId(districtId,function(err, data){
			if(err){
				return cb && cb(err, null);
			}
			return cb && cb(null, data);
		})
	})

}

addressDao.deleteDistrictByCityId = function(cityId, cb){
	var sql1 = 'delete from districts where city_id = ?';
	var sql2 = 'delete from communities \
			where district_id in ( \
				select district_id from districts where city_id = ?)';
	sqlClient.query(sql2, [cityId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		sqlClient.query(sql1, [cityId], function(err, data){
			if(err){
				return	cb && cb(err, null);
			}
			return cb && cb(null ,data);
		})
	})

}


addressDao.modifyDistrict = function(districtId, districtName, cb){
	var sql = 'update districts set district_name = ? where district_id = ?';
	sqlClient.query(sql, [districtName, districtId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.addDistrict = function(cityId, districtName, cb){
	var sql = 'select * from cities where city_id = ?';
	sqlClient.query(sql, [cityId],function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		if(data.length <= 0){
			return cb && cb({err:'没用对应的cityid'})
		}
		var cityName = data[0].city_name;
		sql = 'insert into districts (district_name, city_id, city_name) values (?, ?, ?)';
		sqlClient.query(sql, [districtName, cityId, cityName], function(err, data){
			if(err){
				return cb && cb(err, null);
			}
			return cb && cb(null, data);
		})
	})
	
}

// 小区
addressDao.getComms = function(districtId, cb){
	var sql = 'select * from communities where district_id = ?';
	sqlClient.query(sql, [districtId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})

}

addressDao.deleteCommById = function(commId, cb){
	var sql = 'delete from communities where comm_id = ?';
	sqlClient.query(sql, [commId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.deleteCommByDistrictId = function(districtId, cb){
	var sql = 'delete from communities where district_id = ?';
	sqlClient.query(sql, [districtId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.modifyComm = function(commId, commName, cb){
	var sql = 'update communities set comm_name = ? where comm_id = ?';
	sqlClient.query(sql, [commName, commId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}

addressDao.addComm = function(districtId, cityName, cb){
	var sql = 'insert into communities (comm_name, district_id, site_id) values (?, ?, 0)';
	sqlClient.query(sql, [cityName, districtId], function(err, data){
		if(err){
			return cb && cb(err, null);
		}
		return cb && cb(null, data);
	})
}