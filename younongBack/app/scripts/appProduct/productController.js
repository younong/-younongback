/**
 * Created by zhaohui on 15-5-8.
 */
var user_id = 1;
define(['common/controllers', 'appProduct/productServices', 'domReady', 'wysiwyg', 'config'],
    function (controllers, ProductService, domReady, wysiwyg, SiteConfig) {
        controllers.controller('ProductCtrl', ['$scope', 'ProductService',
            function ($scope, ProductService) {
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.numPages = 1;
                $scope.pageSize = 2;
                $scope.pages = [];
                $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
                $scope.pageEnd = $scope.pageSize;
                var load =function(){
                    ProductService.getGoods($scope.currentPage,$scope.pageSize,$scope.keywords,function(data){
                        $scope.products=data;
                        console.log(data);
                        $scope.numPages = Math.ceil(data.counts / $scope.pageSize);
                        $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
                        $scope.pageEnd = $scope.pageSize * $scope.currentPage > $scope.products.counts ? $scope.products.counts : $scope.currentPage * $scope.pageSize;

                    })
                }
                load();
                // 翻页
                $scope.onSelectPage = function (page) {
                    $scope.currentPage = page;
                    load();
                };
                $scope.lookUp=function(){
                    $scope.currentPage = 1;
                    load();
                }

                $scope.delConfirm=function(index,prod_id){
                    $scope.delProductName=$scope.products.results[index].prod_name;
                    $scope.delIndex=index;
                    $scope.delId=prod_id;
                }

                $scope.delgood=function(index,prod_id){
                    ProductService.delProduct(prod_id,function(err,data){
                        if(err){
                            alert('删除失败')
                        }else{
                            $scope.products.results.splice(index);
                        }
                    })
                }
            }
        ]);

        controllers.controller('ProductCreateCtrl', ['$scope', 'ProductService','Upload','$state',
            function ($scope, ProductService,Upload,$state) {
                $scope.pageTitle = '新增商品';
                $scope.subPageTitle = '新增';
                $scope.covers = [];
                $scope.productForm = {
                };
                $scope.remove = function () {
                    $scope.covers = [];
                };
                // 图片预览
                $scope.isCreate = 1;
                $scope.backTo = function () {
                    $state.go('home.product', {page: 1});
                }
                domReady(function () {
                    $(function () {
                        function initToolbarBootstrapBindings() {
                            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                                    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                                    'Times New Roman', 'Verdana'],
                                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
                            $.each(fonts, function (idx, fontName) {
                                fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                            });
                            $('a[title]').tooltip({container: 'body'});
                            $('.dropdown-menu input').click(function () {
                                return false;
                            })
                                .change(function () {
                                    $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
                                })
                                .keydown('esc', function () {
                                    this.value = '';
                                    $(this).change();
                                });

                            $('[data-role=magic-overlay]').each(function () {
                                var overlay = $(this), target = $(overlay.data('target'));
                                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
                            });
                            $('#voiceBtn').hide();

                        };
                        initToolbarBootstrapBindings();
                        $('#editor').wysiwyg();
                        window.prettyPrint && prettyPrint();
                    });
                });
                $scope.addNewProduct = function () {
                    if (!$scope.covers || !$scope.covers.length) {
                        $scope.notifyContent = '商品必须上传图片！';
                        $('#notifyModal').modal();
                        return;
                    }
                    var uploadCover = function (cb) {
                        Upload.upload({
                            url: SiteConfig.pic_host + 'api/goods/upload',
                            file: $scope.covers[0]
                        }).success(function (data, status, headers, config) {
                            console.log(data);
                            cb(data);

                        });
                    };
                    uploadCover(function (data) {
                        $scope.productForm.prod_images = data.path;
                        $scope.productForm.prod_detail = $('#editor').html();
                        $scope.productForm.prod_categoryids=1;
                        $scope.productForm.prod_categorynames='果蔬生鲜';
                        ProductService.addGoods($scope.productForm, function (error, data) {
                            if (error) {
                                alert('新增商品失败'+error);
                                return;
                            }
                            $state.go('home.product', {page: 1});
                        });
                    });
                }
            }
        ]);


        controllers.controller('ProductDetailCtrl', ['$scope', 'ProductService','Upload','$stateParams','$state',
            function ($scope, ProductService,Upload,$stateParams,$state) {

                $scope.pageTitle = '商品详情';
                $scope.subPageTitle = '商品详情';
                $scope.covers = [];
                $scope.productForm = {};
                $scope.isDetail = 1;
                $scope.update = function () {
                    $scope.isUpdate = 1;
                };
                $scope.cancel = function () {
                    $scope.isUpdate = 0;
                };

                ProductService.getGoodsInformation($stateParams.prod_id,function(err,data){
                    if(err){
                        alert('获取商品信息失败');
                        return ;
                    }
                    $scope.productForm=data;
                    $('#editor').html(data.prod_detail);
                    $scope.productForm.prod_id=$stateParams.prod_id;
                })

                domReady(function () {
                    $(function () {
                        function initToolbarBootstrapBindings() {
                            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                                    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                                    'Times New Roman', 'Verdana'],
                                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
                            $.each(fonts, function (idx, fontName) {
                                fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                            });
                            $('a[title]').tooltip({container: 'body'});
                            $('.dropdown-menu input').click(function () {
                                return false;
                            })
                                .change(function () {
                                    $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
                                })
                                .keydown('esc', function () {
                                    this.value = '';
                                    $(this).change();
                                });

                            $('[data-role=magic-overlay]').each(function () {
                                var overlay = $(this), target = $(overlay.data('target'));
                                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
                            });
                            $('#voiceBtn').hide();

                        };
                        initToolbarBootstrapBindings();
                        $('#editor').wysiwyg();
                        window.prettyPrint && prettyPrint();
                    });
                });


                $scope.updateProduct = function () {
                    if ($scope.covers.length!=0) {
                        var uploadCover = function (cb) {
                            Upload.upload({
                                url: SiteConfig.pic_host + 'api/goods/upload',
                                file: $scope.covers[0]
                            }).success(function (data, status, headers, config) {
                                console.log(data);
                                cb(data);
                            });
                        };
                        uploadCover(function (data) {
                            $scope.productForm.prod_images = data.path;
                            $scope.productForm.prod_detail = $('#editor').html();
                            $scope.productForm.prod_categoryids=1;
                            $scope.productForm.prod_categorynames='果蔬生鲜';
                            console.log($scope.productForm);
//                        $scope.activityForm.activity_pic_url = data.path;
                            ProductService.updateProduct($scope.productForm, function (error, data) {
                                if (error) {
                                    alert('修改商品失败'+error);
                                    return;
                                }
                                $state.go('home.product', {page: 1});
                            });
                        });
                    }else{
                        $scope.productForm.prod_detail = $('#editor').html();
                        $scope.productForm.prod_categoryids=1;
                        $scope.productForm.prod_categorynames='果蔬生鲜';
                        console.log($scope.productForm);
                        ProductService.updateProduct($scope.productForm, function (error, data) {
                            if (error) {
                                alert('修改商品失败'+error);
                                return;
                            }
                            $state.go('home.product', {page: 1});
                        });
                    }
                }
            }
        ]);

    });
