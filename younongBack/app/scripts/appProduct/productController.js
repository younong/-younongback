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
            }
        ]);

        controllers.controller('ProductCreateCtrl', ['$scope', 'ProductService','Upload',
            function ($scope, ProductService,Upload) {
                $scope.pageTitle = '新增商品';
                $scope.subPageTitle = '新增';
                $scope.covers = [];
                $scope.productForm = {

                };
                $scope.$watch('covers', function () {
                    console.log($scope.covers);
                });
                $scope.remove = function () {
                    $scope.covers = [];
                };
                // 图片预览
                $scope.isCreate = 1;
//                $scope.products = [];
                $scope.backTo = function () {
                    //$state.go('home.product({page:1})');
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
                        console.log($scope.productForm);
//                        $scope.activityForm.activity_pic_url = data.path;
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



    });
