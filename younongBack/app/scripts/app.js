// The app/scripts/app.js file, which defines our AngularJS app
define(['angular', 'common/controllers',
    'common/services', 'common/filters', 'ng-file-upload',
    'common/directives'
], function (angular) {
    return angular.module('MyApp', ['controllers', 'services',
            'filters', 'directives', 'ui.router', 'ngFileUpload'
        ]).config(function ($httpProvider) {
            $httpProvider.interceptors.push('TokenInterceptor');
        })
        .run(function ($rootScope, $state, $stateParams, $window) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                // 允许进入登录页面
                if (toState.name == 'login') {
                    return;
                }
                if (!$window.sessionStorage.token) {

                    console.log("=====>>> 未登录")
                    // 取消默认跳转行为
                    event.preventDefault();
                    // 跳转到登录页
                    $state.go("login", {from: fromState.name, w: 'notLogin'});
                }

            });
        });
});
