/**
 * Created by zhaohui on 15-5-8.
 */
var user_id = 1;
define(['common/controllers', 'appProduct/productServices', 'domReady', 'wysiwyg', 'config'],
    function (controllers, ProductService, domReady, wysiwyg, SiteConfig) {
        controllers.controller('ProductCtrl', ['$scope', 'ProductService',
            function ($scope, ProductService) {
            }
        ]);

    });
