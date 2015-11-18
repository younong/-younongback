/**
 * Created by zhaohui on 15-5-8.
 */
var user_id = 1;
// define(['common/controllers', 'appCategory/categoryServices', 'domReady', 'wysiwyg', 'config'],
//     function (controllers, CategoryService, domReady, wysiwyg, SiteConfig) {
//         controllers.controller('CategoryCtrl', ['$scope', 'CategoryService',
//             function ($scope, CategoryService) {
//             	console.log("CategoryCtrl");
//             }
//         ]);
//     });

define(['common/controllers', 'domReady'],
    function (controllers, domReady) {
        controllers.controller('CategoryCtrl',function ($scope, CategoryService) {
        	$scope.catename = "";

        	$scope.catesObj = CategoryService.getCatesObj();


        	$scope.openAddWindow = function(){
        		$scope.catename = "";
        		jQuery("#addCateModal").modal();
        	}
        	$scope.addCate = function(catename){        		
        		if(catename === ''){
        			return;
        		}
        		CategoryService.addCate(catename,suc,err);
        		function suc(){
        			jQuery('#addCateModal').modal('hide');
        			console.log("添加成功");
        		}
        		function err(){
        			console.log("添加失败");
        		}
        	}
        	$scope.deleteCate = function(cateid){
        		console.log("删除");

        		CategoryService.deleteCate(cateid,suc,err);
        		function suc(){
        			console.log("删除成功");
        		}
        		function err(){
        			console.log("删除失败");
        		}
        	}





            var json={
                category_name:'',
                categories_id:''
            };
            var indexId=0;

            $scope.editor=function(index){

                indexId=index;

                json.category_name=$scope.catesObj.data[index].category_name;
                json.categories_id=$scope.catesObj.data[index].categories_id;

                $scope.chgName=$scope.catesObj.data[index].category_name;
                jQuery("#chgCateModal").modal();


            }

            $scope.chgCate=function(){

                json.category_name=$scope.chgName;


                CategoryService.chgCate(json,function(err,data){

                    if(err){
                        alert('修改失败');
                    }else{
                        $scope.catesObj.data[indexId].category_name=json.category_name;
                        jQuery('#chgCateModal').modal('hide');
                    }

                })
            }



        });
    });
