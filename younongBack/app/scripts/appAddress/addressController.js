/**
 * Created by zhaohui on 15-5-8.
 */

define(['common/controllers', 'domReady'],
    function (controllers, domReady) {
        controllers.controller('AddressCtrl',function ($scope, AddressService) {
        	console.log(AddressService.getTest());

            // 当前被选中的地区id
            $scope.currentIds = {
                // provinceId = 1,
                // cityId = 1,
                // districtId = 1,
                // commId = 1,
            };
            // 搜索字段
            $scope.searchStrs = {

            }
            // 模态窗口配置
            $scope.modalConf = {
                title:"标题",
                inputName:"输入你的需要",
                tips:"提示信息",
                inputValue:"输入值",
                ensure:function(inputValue){
                    console.log("点击确定按钮后调用的函数",inputValue);
                    return true;
                },
                _ensure:function(inputValue){
                    if(this.ensure(inputValue)){
                        $('#inputModal').modal('hide');
                        $('#tipModal').modal('hide');
                    }
                }
            }
            $scope.showInputModal = function(cfg){
                $scope.modalConf = $.extend($scope.modalConf,cfg);
                $('#inputModal').modal();
            }
            $scope.showTipModal = function(cfg){
                $scope.modalConf = $.extend($scope.modalConf,cfg);
                $('#tipModal').modal();
            }

            // TODO 用于调试
            window.scope = $scope;

            // 初始化
            // 获取省份列表
            AddressService.getProvinces(function(err, data){
                if(err){
                    console.log('获取省份数据失败');
                }
                $scope.provinces = data;
            })

            // 监听被选择的地区的变化
            // $scope.$watch('currentIds.provinceId',function(newValue, oldValue, scope){
            //     console.log('newValue',newValue);
            //     console.log('oldValue',oldValue);
            //     if(newValue){
            //         // 找到第一个城市，设置其
            //     }
            // })

            // 操作
            // 选择省份
            $scope.selectProvince = function(provinceId){
                // 当id小于0的时候，默认列表设置为空
                if(provinceId < 0){
                    $scope.cities = [];
                    $scope.selectCity(-1);
                    return;
                }
                // 根据选择的省获取城市列表
                AddressService.getCities(provinceId,function(err, data){
                    if(err){
                        console.log('获取城市数据失败');
                        $scope.cities = [];
                        $scope.selectCity(-1);
                        return;
                    }
                    $scope.cities = data;
                    // 取得第一个城市，设置为当前选择
                    if($scope.cities.length > 0){
                        $scope.currentIds.cityId = $scope.cities[0].city_id;
                        $scope.selectCity($scope.currentIds.cityId);
                    }else{
                        $scope.cities = [];
                        $scope.selectCity(-1);
                    }
                });
            }
            // 选择城市
            $scope.selectCity = function(cityId){
                console.log('cityId', cityId);
                // 当id小于0的时候，默认列表设置为空
                if(cityId < 0){
                    $scope.districts = [];
                    $scope.selectDistrict(-1);
                    return;
                }
                // 请求获取列表
                AddressService.getDistricts(cityId,function(err, data){
                    if(err){
                        console.log('获取区列表数据失败');
                        $scope.districts = [];
                        $scope.selectDistrict(-1);
                        return;
                    }
                    $scope.districts = data;
                    // 取得第一个城市，设置为当前选择
                    if($scope.districts.length > 0){
                        $scope.currentIds.districtId = $scope.districts[0].district_id;
                        $scope.selectDistrict($scope.currentIds.districtId);
                    }else{
                        $scope.districts = [];
                        $scope.selectDistrict(-1);
                    }

                })
            }
            // 选择区
            $scope.selectDistrict = function(districtId){
                console.log(districtId);
                // 当id小于0的时候，默认列表设置为空
                if(districtId < 0){
                    $scope.comms = [];
                    $scope.currentIds.commId = -1;
                    return;
                }
                // 请求获取列表
                AddressService.getComms(districtId,function(err, data){
                    if(err){
                        console.log('获取区列表数据失败');
                        $scope.comms = [];
                        $scope.currentIds.commId = -1;
                        return;
                    }
                    $scope.comms = data;
                    // 。。。。。
                    if($scope.comms.length > 0){
                        // 
                        $scope.currentIds.commId = $scope.comms[0].comm_id;
                        // $scope.selectDistrict($scope.currentIds.districtId);
                    }else{
                        $scope.comms = [];
                        $scope.currentIds.commId = -1;
                    }
                })
            }

            // 添加城市 修改 删除
            $scope.addCity = function(){
                // 判断是否选中省份
                if(!$scope.currentIds.provinceId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中添加城市的省份"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"添加城市",
                    inputName:"城市名称",
                    inputValue:"",
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.addCity($scope.currentIds.provinceId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市添加失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市添加成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.modifyCity = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.cityId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要修改的城市"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"修改城市",
                    inputName:"城市名称",
                    inputValue:getNameById($scope.currentIds.cityId,$scope.cities,'city'),
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.modifyCity($scope.currentIds.cityId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市修改失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市修改成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.deleteCity = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.cityId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要删除的城市"
                    });
                    return;
                }
                $scope.showTipModal({
                    title:"提示",
                    tips:"你确定要删除 "+getNameById($scope.currentIds.cityId,$scope.cities,'city')+" 吗?",
                    ensure:function(){
                        AddressService.deleteCity($scope.currentIds.cityId, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市删除失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"城市删除成功"
                                })
                            }
                        })
                        return true;
                    }
                })
            }

            // 添加区 修改 删除
            // district
            // District
            $scope.addDistrict = function(){
                // 判断是否选中省份
                if(!$scope.currentIds.cityId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中添加区的城市"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"添加区",
                    inputName:"区名称",
                    inputValue:"",
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.addDistrict($scope.currentIds.cityId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区添加失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区添加成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.modifyDistrict = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.districtId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要修改的区"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"修改区",
                    inputName:"区名称",
                    inputValue:getNameById($scope.currentIds.districtId,$scope.districts,'district'),
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.modifyDistrict($scope.currentIds.districtId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区修改失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区修改成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.deleteDistrict = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.districtId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要删除的区"
                    });
                    return;
                }
                $scope.showTipModal({
                    title:"提示",
                    tips:"你确定要删除 "+getNameById($scope.currentIds.districtId,$scope.districts,'district')+" 吗?",
                    ensure:function(){
                        AddressService.deleteDistrict($scope.currentIds.districtId, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区删除失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"区删除成功"
                                })
                            }
                        })
                        return true;
                    }
                })
            }
            // 添加小区 修改 删除
            // comm
            // Comm
            $scope.addComm = function(){
                // 判断是否选中省份
                if(!$scope.currentIds.districtId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中添加小区的城市"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"添加小区",
                    inputName:"小区名称",
                    inputValue:"",
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.addComm($scope.currentIds.districtId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区添加失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区添加成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.modifyComm = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.commId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要修改的小区"
                    });
                    return;
                }
                $scope.showInputModal({
                    title:"修改小区",
                    inputName:"小区名称",
                    inputValue:getNameById($scope.currentIds.commId,$scope.comms,'comm'),
                    ensure:function(inputValue){
                        if(!inputValue){
                            return false;
                        }
                        AddressService.modifyComm($scope.currentIds.commId, inputValue, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区修改失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区修改成功"
                                })
                            }
                        })

                        return true;
                    }
                })
            }

            $scope.deleteComm = function(){
                // 判断是否选中城市
                if(!$scope.currentIds.commId){
                    $scope.showTipModal({
                        title:'提示',
                        tips:"请选中需要删除的小区"
                    });
                    return;
                }
                $scope.showTipModal({
                    title:"提示",
                    tips:"你确定要删除 "+getNameById($scope.currentIds.commId,$scope.comms,'comm')+" 吗?",
                    ensure:function(){
                        AddressService.deleteComm($scope.currentIds.commId, function(err,data){
                            if(err){
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区删除失败"
                                })
                            }else{
                                $scope.showTipModal({
                                    title:"提示",
                                    tips:"小区删除成功"
                                })
                            }
                        })
                        return true;
                    }
                })
            }

            // 通过id获取值
            function getNameById(id,data,type){
                for(var index in data){
                    var item = data[index];
                    if(item[type+'_id'] === id)
                        return item[type+'_name'];
                }
            }
        });
    });
