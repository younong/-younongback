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

            var defalutIndex=0;

            $scope.editor=function(index){
                defalutIndex=index;
                $scope.startNumber=$scope.keyArr[index];
                $scope.finishNumber=$scope.keyArr[index+1];
                $scope.deliveryValue=$scope.valueArr[index];

                $('#addDeliveryModal').modal();
            }

            function updateDeli(keyArr,valueArr,cb){
                var data={};
                for(var i=0;i<valueArr.length;i++){
                    data[keyArr[i+1]]=valueArr[i];
                }
                var str= JSON.stringify(data);
                var json={data:str}
                others.updateDelivery(json,function(err,data){
                    if(err){
                        alert('操作出错');
                        cb();
                    }else{
                        location.reload()
                    }
                })

            }


           $scope.update=function(){
               var lock=false;

               if(parseInt($scope.startNumber)<0){
                       alert('起始值不能小于0');
                       return;
               }

               if(parseInt($scope.finishNumber) < parseInt($scope.startNumber)){
                   alert('终值不能小于起始值');
                   return;
               }


               for(var k in $scope.valueArr){
                   if((k!=defalutIndex)&&($scope.valueArr[k] == $scope.deliveryValue)){
                       lock=true;
                   }
               }
               if(lock){
                   alert(' 不同重量范围不允许出现同样的运费');
                   return;
               }

               $scope.keyArr[defalutIndex] = $scope.startNumber;
               $scope.keyArr[defalutIndex+1] = $scope.finishNumber;
               $scope.valueArr[defalutIndex] =$scope.deliveryValue;

               updateDeli($scope.keyArr,$scope.valueArr);
           }

            $scope.delConfirm=function(index){

                var keyarr=$scope.keyArr;
                var valueArr=$scope.valueArr;
                keyarr.splice(index+1,1);
                valueArr.splice(index,1);
                updateDeli(keyarr,valueArr);

            }

            $scope.add=function(){

                $("#start").attr("disabled",true);
                $scope.addstartNumber=$scope.keyArr[$scope.keyArr.length-1];
                $scope.addfinishNumber=parseInt($scope.keyArr[$scope.keyArr.length-1]) +1;
                $scope.adddeliveryValue=0;
                $('#addModal').modal();
            }

            $scope.save=function(){
                var lock=false;

                if(parseInt($scope.addfinishNumber) < parseInt($scope.addstartNumber)){
                    alert('终值不能小于起始值');
                    return;
                }


                for(var k in $scope.valueArr){
                    if((k!=defalutIndex)&&($scope.valueArr[k] == $scope.adddeliveryValue)){
                        lock=true;
                    }
                }
                if(lock){
                    alert(' 不同重量范围不允许出现同样的运费');
                    return;
                }

                $scope.keyArr.push($scope.addfinishNumber);
                $scope.valueArr.push($scope.adddeliveryValue);




                updateDeli($scope.keyArr,$scope.valueArr,function(){

                    $scope.keyArr.splice($scope.keyArr.length-1,1);
                    $scope.valueArr.splice($scope.valueArr.length-1,1);

                });
            }





        });
    });