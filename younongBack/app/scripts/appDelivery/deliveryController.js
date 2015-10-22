/**
 * Created by wei on 15/10/22.
 */
define(['common/controllers', 'domReady'],
    function (controllers, domReady) {
        controllers.controller('DeliveryCtrl',function ($scope,others) {
            others.getDelivery(function(err,data){
                if(err){
                    alert('获取运费信息出错');
                }else{
                    var develiryObj=JSON.parse(data[0].attr_value);
                    $scope.keyArr=[0];
                    $scope.valueArr=[];
                    for(var key in develiryObj){
                        $scope.keyArr.push(key);
                        $scope.valueArr.push(develiryObj[key])
                    }
                }
            })

        });
    });