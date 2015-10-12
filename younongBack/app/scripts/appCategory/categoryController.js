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
        	console.log("CategoryCtrl");
        	CategoryService.test();
        });
    });
