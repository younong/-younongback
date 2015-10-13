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
        });
    });
