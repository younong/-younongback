// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        'jquery': 'lib/bower_components/jquery/dist/jquery',
        'angular': 'lib/bower_components/angular/angular.min',
        'angular-ui-router': 'lib/bower_components/angular-ui-router/release/angular-ui-router.min',
        'domReady': 'lib/domReady',
        'moment': 'lib/bower_components/moment/min/moment.min',
        'bootstrap':'lib/bower_components/bootstrap/dist/js/bootstrap',
        'datepicker':'lib/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker',
        'datepicker-locale':'lib/bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        'ng-file-upload':'lib/bower_components/ng-file-upload/ng-file-upload-all',

//        ueditorConfig:'../ueditor/ueditor.config',
//        ueditorAll:'../ueditor/ueditor.all',
//        angularUeditor:'lib/bower_components/angular-ueditor/dist/angular-ueditor',
        'multiselect': 'lib/bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect',
        'config': 'common/config',
        'siteApp': '../media/js/app',
        'login': '../media/js/login',
        'uniform': '../media/js/jquery.uniform.min',
        'validate': '../media/js/jquery.validate.min',
        'wysiwyg':'lib/bootstrap-wysiwyg'
        ,'hotkey':'lib/external/jquery.hotkeys'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
//        ,ueditorAll:['ueditorConfig']
//        ,angularUeditor:[ 'angular','ueditorConfig','ueditorAll']
        ,'angular-ui-router':  [ 'angular' ]
        ,'bootstrap':['jquery']
//        ,'bootstrap-datetimepicker':['bootstrap']
        ,'ng-file-upload':['angular']
        ,'datepicker':['jquery']
        ,'datepicker-locale':['datepicker']
        ,'multiselect': ['bootstrap']
        ,'config': {
            exports: 'SiteConfig'
        }
        ,'uniform': ['jquery'],
        'validate': ['jquery'],
        'login': {
            deps: ['validate'],
            exports: 'Login'
        }
        ,'wysiwyg': ['bootstrap','hotkey']

    }
});
require([
    'angular',
    'domReady',
    'login',
    'angular-ui-router',
    'ng-file-upload',
    'bootstrap',
    'app',
    'moment',
//    'ueditorConfig',
//    'ueditorAll',
//    'angularUeditor',

    'routes',
    'common/angular_directives/ngPagination',
    'appLogin/login_services',
    'appLogin/loginController',
    'appCategory/categoryServices',
    'appCategory/categoryController',
    'appProduct/productServices',
    'appProduct/productController',
    'appOrder/orderServices',
    'appOrder/orderController',
    'appAddress/addressServices',
    'appAddress/addressController',
        'appMisDelivery/misDeliveryController',
        'appCarousel/carouselController',
        'appCarousel/othersService',
        'appSince/sinceController',
        'appDeliverTime/deliverTimeController',
        'appDelivery/deliveryController',
        'datepicker-locale',
        'datepicker',
        'datepicker-locale',
    'appAuth/authService',
    'multiselect',
    'config'
    , 'siteApp'
    , 'uniform'
    , 'validate'
],
    function (angular, domReady, Login) {
        'use strict';

        domReady(function () {
            angular.bootstrap(document, ['MyApp']);

            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: MyApp');

        });
    }
);
