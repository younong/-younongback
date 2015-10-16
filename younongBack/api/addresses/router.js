/**
 * by zhao_hui
 */
var router = require("express").Router();
var addressDao = require('./addressModel');


module.exports = router;

/**
 * @desc 获取省份信息
 */
function getProvinces(req, res){
	addressDao.getProvinces(function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

// 城市
function getCities(req, res){
	var provinceId = req.query.provinceId;
	if(!provinceId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.getCities(provinceId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function addCity(req, res){
	var provinceId = req.query.provinceId;
	var cityName = req.query.cityName;
	if(!provinceId || ! cityName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.addCity(provinceId, cityName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function deleteCity(req, res){
	var cityId = req.query.cityId;
	if(!cityId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.deleteCityById(cityId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function modifyCity(req, res){
	var cityId = req.query.cityId;
	var cityName = req.query.cityName;
	if(!cityId || ! cityName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.modifyCity(cityId, cityName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

// 区
function getDistricts(req, res){
	var cityId = req.query.cityId;
	if(!cityId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.getDistricts(cityId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function addDistrict(req, res){
	var cityId = req.query.cityId;
	var districtName = req.query.districtName;
	if(!cityId || ! districtName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.addDistrict(cityId, districtName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function deleteDistrict(req, res){
	var districtId = req.query.districtId;
	if(!districtId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.deleteDistrictById(districtId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function modifyDistrict(req, res){
	var districtId = req.query.districtId;
	var districtName = req.query.districtName;
	if(!districtId || ! districtName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.modifyDistrict(districtId, districtName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

// 小区
function getComms(req, res){
	var districtId = req.query.districtId;
	if(!districtId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.getComms(districtId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})

}


function addComm(req, res){
	var districtId = req.query.districtId;
	var commName = req.query.commName;
	if(!districtId || ! commName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.addComm(districtId, commName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function deleteComm(req, res){
	var commId = req.query.commId;
	if(!commId){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.deleteCommById(commId, function(err, data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}


function modifyComm(req, res){
	var commId = req.query.commId;
	var commName = req.query.commName;
	if(!commId || ! commName){
		return res.json(400, {error: "请传入正确的参数"});
	}
	addressDao.modifyComm(commId, commName, function(err,data){
		if (!!err) {
	        console.log(err);
	        return res.json(500, {error: err});
	    }
	    return res.json(200, {results: data});
	})
}

router.get("/getProvinces",getProvinces);

router.get("/addCity",addCity);
router.get("/deleteCity",deleteCity);
router.get("/modifyCity",modifyCity);
router.get("/getCities",getCities);

router.get("/addDistrict",addDistrict);
router.get("/deleteDistrict",deleteDistrict);
router.get("/modifyDistrict",modifyDistrict);
router.get("/getDistricts",getDistricts);

router.get("/addComm",addComm);
router.get("/deleteComm",deleteComm);
router.get("/modifyComm",modifyComm);
router.get("/getComms",getComms);

module.exports = router;