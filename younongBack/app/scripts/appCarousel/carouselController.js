/**
 * Created by wei on 15/10/16.
 */

define(['common/controllers','appCarousel/othersService','config'],
    function (controllers,others, SiteConfig) {
        controllers.controller('CarouselCtrl', ['$scope','others','Upload','Util',
            function ($scope,others,Upload,Util) {

                $scope.images=[];
                $scope.update=[];
                $scope.imgArr=[];

                others.getCarousel(function(err,data){

                    if(err){
                        alert('获取轮播图片出错');
                    }else{
                        if(data[0].imgUrl)$scope.images=data[0].imgUrl.split(',');
                           for(var i=0;i<$scope.images.length;i++){
                               $scope.update.push('1');
                           }
                    }
                })

                $scope.drop = function (index) {
                    $scope.images.splice(index,1);
                    $scope.update.splice(index,1);
                };

                $scope.backTo = function(){
                    $scope.images=[];
                }
                $scope.addImages = function () {
                    if (!$scope.images || !$scope.images.length) {
                        $scope.notifyContent = '请上传图片！';
                        $('#notifyModal').modal();
                        return;
                    }

                    var uploadCover = function (imageData,cb) {

                        Util.resizeFile(imageData).then(function(blob_data){
                            Upload.upload({
                                url: '/api/goods/upload',
                                fileName: imageData.name,
                                file: blob_data
                            }).success(function (data, status, headers, config) {
                                console.log(data);
                                cb(data.path);
                            });
                            });
                    };
                    var imagesUrl='';

                    var getImgUrl=function(){
                        for(var i=0;i<updateNumArr.length;i++){

                            var m=parseInt(updateNumArr[i]);
                            $scope.update[m]=1;
                            $scope.images[m]=updateNamArr[i];
                        }
                        for(var i=1;i<=$scope.images.length;i++){
                            (i<$scope.images.length)?imagesUrl+=$scope.images[i-1]+',':imagesUrl+=$scope.images[i-1];
                        }
                        var data={imgUrl:imagesUrl};
                        others.updateCarousel(data,function(err,data){
                            if(err){
                                alert("修改出错");
                            }else{
                                alert("修改成功");
                            }
                        })
                    }
                    var k=0;
                    var updateNumArr=[];
                    var updateNamArr=[];
                    for(var i=0;i<$scope.images.length;i++){
                        if( typeof $scope.images[i]=='string'){
                            k++;
                            if(k == $scope.images.length ){
                                getImgUrl();
                            }
                        }else{
                            updateNumArr.push(i);
                            uploadCover($scope.images[i],function (data) {
                                k++;
                                updateNamArr.push(data);
                                if(k == $scope.images.length ){
                                    getImgUrl();
                                }
                            });
                        }
                    }
                }
                $scope.select=function(){
                    if($scope.covers.length!=0){
                        $scope.images.push($scope.covers[0]);
                    }
                }
                $scope.replace=function(index){
                    console.log($scope.imgArr[index]);
                    if($scope.imgArr[index].length!=0) {
                        $scope.images[index] = $scope.imgArr[index][0];
                        $scope.update[index] = 0;
                    }
                };
            }
        ]);
    });
