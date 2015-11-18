/**
 * Created by wei on 15/11/18.
 */


define(['common/controllers', 'domReady'],
    function (controllers, domReady) {
        controllers.controller('DeliveryTimeCtrl',function ($scope, others) {
            var id=0;
            function updateDeliTime(keyArr,valueArr,cb){
                var data={};
                for(var i=0;i<valueArr.length;i++){
                    data[keyArr[i]]=valueArr[i];
                }
                var str= JSON.stringify(data);
                var json={data:str}
                others.updateDeliveryTime(json,function(err,data){
                    if(err){
                        alert('操作出错');
                        cb();
                    }else{
                        location.reload()
                    }
                })

            }
            others.getDeliveryTime(function(err,data){
                if(err){
                    alert('获取配送时间出错');
                }else{
                    var develiryObj=JSON.parse(data[0].attr_value);
                    $scope.keyArr=[];
                    $scope.valueArr=[];
                    for(var key in develiryObj){
                        $scope.keyArr.push(key);
                        $scope.valueArr.push(develiryObj[key])
                    }
                }
            })
            $scope.openAddWindow = function(){
                $scope.catename = "";
                jQuery("#addCateModal").modal();
            }
            $scope.addCate = function(catename){
                if(catename === ''){
                    alert("请输入配送时间");
                    return;
                }
                $scope.keyArr.push(parseInt($scope.keyArr[$scope.keyArr.length-1])+1);
                $scope.valueArr.push($scope.catename);

                updateDeliTime($scope.keyArr,$scope.valueArr,function(){
                    $scope.keyArr.pop();
                    $scope.valueArr.pop();
                });
            }


            $scope.deleteCate = function(index){
                id=index;
                $scope.delName=$scope.valueArr[index];
                jQuery("#delCateModal").modal();
            }

            $scope.delTime=function(){
                var keyArr=$scope.keyArr;
                var valueArr=$scope.valueArr;
               keyArr.splice(id,1);
                valueArr.splice(id,1);
                updateDeliTime(keyArr,valueArr,function(){
                });
            }

            $scope.editor=function(index){
                id=index;
                $scope.chgName=$scope.valueArr[id];
                jQuery("#chgCateModal").modal();
            }

            $scope.chgCate=function(){
                $scope.valueArr[id]=$scope.chgName;
                updateDeliTime($scope.keyArr,$scope.valueArr,function(){
                  
                });

            }



        });
    });
