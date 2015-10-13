/**
 * Created by zhaohui on 15-5-8.
 */
define(['common/controllers', 'appOrder/orderServices', 'moment', 'domReady', 'config'],
    function (controllers,OrderServices, moment, domReady, SiteConfig) {
        controllers.controller('OrderCtrl',function ($scope, OrderServices, $filter) {
        	// 筛选条件
        	$scope.conditionParams = {
        		dateStart:'',
        		dateEnd:'',
        		orderStatusId:''
        	}
        	$scope.orderNo = '';
        	$scope.params ={};

            $scope.count = 0;
            $scope.currentPage = 1;
            $scope.numPages = 1;
            $scope.pageSize = 10;
            $scope.pages = [];
            $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
            $scope.pageEnd = $scope.pageSize;


            var load =function(params){
            	params.page = $scope.currentPage;
            	params.size = $scope.pageSize;
                OrderServices.getOrders(params,function(data){
                    $scope.orders = data.results;
                    $scope.numPages = Math.ceil(data.counts / $scope.pageSize);
                    $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
                    $scope.pageEnd = $scope.pageSize * $scope.currentPage > data.counts ? data.counts : $scope.currentPage * $scope.pageSize;
                })
            }
            load($scope.params);
            // 翻页
            $scope.onSelectPage = function (page) {
                $scope.currentPage = page;
                load($scope.params);
            };
            $scope.lookUp=function(){
                $scope.currentPage = 1;
                load($scope.params);
            }
            // 根据条件筛选
            $scope.loadByCondition = function(){
            	$scope.params = conditionParams;
            	load($scope.params);
            }
            $scope.loadByOrderNo = function(){
            	$scope.params = {
            		orderNo:$scope.orderNo
            	}
            	load($scope.params);
            }
        });

    });
