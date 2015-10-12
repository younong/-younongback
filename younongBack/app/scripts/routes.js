define(['app'], function (app) {
    // body...
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

//            $routeProvider.when('/', '/#/login');
//            $urlRouterProvider.when('', '/home/product/page/1');
            $urlRouterProvider.when('', '/login');
//            $locationProvider.html5Mode(true);
            $stateProvider

                .state("login", {
                    url: "/login",
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl'
                })
                .state("home", {
                    url: "/home", abstract: true, templateUrl: 'home.html'

                })
                .state("home.index", {
                    url: '',
                    views: {
//                        '': {
//                            templateUrl: 'views/tplIndex.html'
//                        },
                        'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
                .state("home.category", {
                    url: "/category",
                    views: {
                        '': {
                            templateUrl: 'views/tplCategory/home.category.html',
                            controller: 'CategoryCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
                .state("home.product", {
                    url: "/product/page/{page:[1-9]{1,4}}",
                    views: {
                        '': {
                            templateUrl: 'views/tplProduct/home.product.html',
                            controller: 'ProductCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
                .state("home.productCreate", {
                    url: "/product/create",
                    views: {
                        '': {
                            templateUrl: 'views/tplProduct/home.product.create.html',
                            controller: 'ProductCreateCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
                .state("home.productDetail", {
                    url: "/product/detail/{good_Id:[0-9]{1,4}}",
                    views: {
                        '': {
                            templateUrl: 'views/tplProduct/home.product.create.html',
                            controller: 'ProductDetailCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })

                .state("home.order", {
                    url: "/order/page/{page:[1-9]{1,4}}",
                    views: {
                        '': {
                            templateUrl: 'views/tplOrder/home.order.html',
                            controller: 'OrderCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
                .state("home.orderDetail", {
                    url: "/order/detail/{order_id:[0-9]{1,4}}",
                    views: {
                        '': {
                            templateUrl: 'views/tplOrder/home.order.detail.html',
                            controller: 'OrderDetailCtrl'
                        }, 'sidebar': {
                            templateUrl: 'views/common/sidebar.html'
                        },
                        'footer': {
                            templateUrl: 'views/common/footer.html'
                        }
                    }
                })
        }
    ]);
});
