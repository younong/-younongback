/**
 * Created by zhaohui on 15-5-8.
 */
define(['common/controllers', 'appOrder/orderServices', 'moment', 'domReady', 'config'],
    function (controllers,OrderServices, moment, domReady, SiteConfig) {
        controllers.controller('OrderCtrl',function ($scope, OrderServices) {
            // 初始化时间控件
            $('#dpStart, #dpEnd').datepicker({});
        	// 筛选条件
        	$scope.conditionParams = {
        		dateStart:'',
        		dateEnd:'',
        		orderStatusId:''
        	}
        	$scope.orderNo = '';
        	$scope.params ={};
            $scope.point=[];

            $scope.count = 0;
            $scope.currentPage = 1;
            $scope.numPages = 1;
            $scope.pageSize = 10;
            $scope.pages = [];
            $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
            $scope.pageEnd = $scope.pageSize;

            //window.scope = $scope;
            var load =function(params){
            	params.page = $scope.currentPage;
            	params.size = $scope.pageSize;
                OrderServices.getOrders(params,function(err, data){
                    $scope.count = data.counts;
                    $scope.orders = data.results;
                    $scope.numPages = data.counts>0?Math.ceil(data.counts / $scope.pageSize):1;
                    $scope.pageStart = data.counts>0?($scope.currentPage - 1) * $scope.pageSize + 1:0;
                    $scope.pageEnd = $scope.pageSize * $scope.currentPage > data.counts ? data.counts : $scope.currentPage * $scope.pageSize;
                })
            }
            load($scope.params);

            OrderServices.getStatusOptions(function(err,data){
                if(err){
                    console.log("获取订单状态选项失败");
                    return;
                }
                $scope.orderStatusOptions = data.results;
                // 添加空选项
                $scope.orderStatusOptions.unshift({
                    order_status_id:0,
                    status_name:'全选'
                })
                $scope.conditionParams.orderStatusId=$scope.orderStatusOptions[0].order_status_id;
            })

            // 翻页
            $scope.onSelectPage = function (page) {
                $scope.currentPage = page;
                load($scope.params);
                $scope.allChecked = false;
            };
            $scope.lookUp=function(){

                $scope.currentPage = 1;
                load($scope.params);
                $scope.allChecked = false;
            }
            // 根据条件筛选
            $scope.loadByCondition = function(){
                $scope.currentPage = 1;
                $scope.conditionParams.dateStart = $("#dpStart").val();
                $scope.conditionParams.dateEnd = $("#dpEnd").val();
            	$scope.params = $scope.conditionParams;
            	load($scope.params);
                $scope.allChecked = false;
            }
            $scope.exportExcel = function(){
                $scope.params.page = $scope.currentPage;
                $scope.params.size = $scope.pageSize;
                var exportUrl = OrderServices.getExportExcelUrl($scope.params);
                // alert(exportUrl);
                window.open(exportUrl);
            }

            $scope.loadByOrderNo = function(){

            	$scope.params = {
            		orderNo:$scope.orderNo
            	}
                console.log($scope.params);
            	load($scope.params);
                $scope.allChecked = false;
            }
            $scope.deliver = function(order){
                var orderid = order.order_id;
                
                OrderServices.deliver([orderid],function(err,data){
                    if(err){
                        console.log("发货失败");
                        $scope.notifyContent = "发货失败";
                        $('#orderNotifyModal').modal();
                        return;
                    }
                    console.log("发货成功");
                    $scope.notifyContent = "发货成功";
                    $('#orderNotifyModal').modal();
                    order.order_status_id = 3;
                })
                console.log('deliver',orderid);

            }
            $scope.deliverBatch = function(){
                var orderids = [];
                // 获取勾选的且可以发货的订单号
                for(var index in $scope.orders){
                    var order = $scope.orders[index];
                    if(order.checked){
                        if(order.order_status_id === 2 || order.order_status_id === 10){
                            // 如果当前状态为已付款未发货，或者电话确认ok
                            orderids.push(order.order_id);
                        }
                    }
                }
                if(orderids.length === 0){
                    $scope.notifyContent = "没有符合发货条件的订单";
                    $('#orderNotifyModal').modal();
                    return ;
                }
                // 调用服务进行发货
                OrderServices.deliver(orderids,function(err,data){
                    if(err){
                        console.log("批量发货失败");
                        $scope.notifyContent = "批量发货失败";
                        $('#orderNotifyModal').modal();
                        return;
                    }
                    console.log("批量发货成功");
                    $scope.notifyContent = "批量发货成功";
                    $('#orderNotifyModal').modal();
                    load($scope.params);
                    $scope.allChecked = false;
                })
            }
            $scope.check = function(order){
                console.log(order.checked);
            }
            $scope.chkAll = function(allChecked){
                console.log(allChecked)
                for(var index in $scope.orders){
                    var order = $scope.orders[index];
                    order.checked = allChecked;
                }
            }
            $scope.judge=function(page,index){
                if(Math.abs($scope.currentPage - page)==5&&page!=1&&page!=$scope.numPages){
                    $scope.point[index]=true;
                }else{
                    $scope.point[index]=false;
                }

                if(Math.abs($scope.currentPage - page)<=5||page==$scope.numPages||page==1){
                    return true;
                }else{
                    return false;
                }
            }

        }),
        controllers.controller('OrderDetailCtrl', function ($scope, OrderServices, $stateParams){
            var orderid = $stateParams.order_id;
            OrderServices.getOrderDetail(orderid, function(err,data){
                if(err){
                    console.log("获取订单出错");
                    return;
                }
                console.log(data);
                $scope.order = data;
            })

        })
        controllers.filter('smallImg',function(){
            return function(input){
                return JSON.parse(input).small;
            }
        })
    });
