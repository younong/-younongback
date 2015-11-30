/**
 * Created by zhaohui on 15-5-8.
 */
var user_id = 1;
define(['common/controllers', 'appProduct/productServices', 'domReady', 'wysiwyg', 'config'],
    function (controllers, ProductService, domReady, wysiwyg, SiteConfig) {
        controllers.controller('ProductCtrl', ['$scope', 'ProductService',
            function ($scope, ProductService) {
                $scope.point=[];
                $scope.keywords = '';
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.numPages = 1;
                $scope.pageSize = 10;
                $scope.pages = [];
                $scope.pageStart = ($scope.currentPage - 1) * $scope.pageSize + 1;
                $scope.pageEnd = $scope.pageSize;
                var load =function(){
                    ProductService.getGoods($scope.currentPage,$scope.pageSize,$scope.keywords,function(data){
                        $scope.products=data;
                        console.log(data);
                        $scope.numPages = $scope.products.counts >0 ?Math.ceil(data.counts / $scope.pageSize):1;
                        $scope.pageStart = $scope.products.counts >0 ?($scope.currentPage - 1) * $scope.pageSize + 1:0;
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
                            $scope.products.results.splice(index,1);
                        }
                    })
                }
                $scope.judge=function(page,index){
                    if(Math.abs($scope.currentPage - page)==5&&page!=1&&page!=$scope.numPages){
                        $scope.point[index]=true;
                    }else{
                        $scope.point[index]=false;
                    }

                    if(Math.abs($scope.currentPage - page)<=5||page==$scope.numPages||page==1){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        ]);

        controllers.controller('ProductCreateCtrl', ['$scope', 'ProductService','Upload','$state','CategoryService','Util',
            function ($scope, ProductService,Upload,$state,CategoryService,Util) {
                $scope.pageTitle = '新增商品';
                $scope.subPageTitle = '新增';
                $scope.covers = [];
                $scope.productForm = {
                };
                $scope.productForm.prod_categoryids='';
                $scope.productForm.prod_categorynames='';
                $scope.remove = function () {
                    $scope.covers = [];
                };
                // 图片预览
                $scope.isCreate = 1;
                $scope.backTo = function () {
                    $state.go('home.product', {page: 1});
                }

                $scope.categories=CategoryService.getCatesObj();

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
                    $('input[type="checkbox"][name="category"]:checked').each(
                        function() {
                            $scope.productForm.prod_categoryids+=$(this).val()+',';
                            for(var i=0;i<$scope.categories.data.length;i++){
                                var item=$scope.categories.data[i];
                                if(item.categories_id==$(this).val()){
                                    $scope.productForm.prod_categorynames+=item.category_name+',';
                                }
                            }
                        }
                    );

                    if (!$scope.covers || !$scope.covers.length) {
                        $scope.notifyContent = '商品必须上传图片！';
                        $('#notifyModal').modal();
                        return;
                    }

                    if ($scope.productForm.prod_categorynames=='') {
                        $scope.notifyContent = '请选择商品种类！';
                        $('#notifyModal').modal();
                        return;
                    }

                   var imgName= $scope.covers[0].name;
                    var uploadCover = function (cb) {

                        Upload.upload({
                            url: '/api/goods/upload',
                            fileName: imgName,
                            file: $scope.covers[0]
                        }).success(function (data, status, headers, config) {
                            console.log(data);
                            cb(data);

                        });
                    };

                    Util.resizeFile($scope.covers[0]).then(function(blob_data){

                        $scope.covers[0]=blob_data;
                        uploadCover(function (data) {
                            $scope.productForm.prod_images = data.path;
                            $scope.productForm.prod_detail = $('#editor').html();
                            ProductService.addGoods($scope.productForm, function (error, data) {
                                if (error) {
                                    alert('新增商品失败'+error);
                                    return;
                                }
                                $state.go('home.product', {page: 1});
                            });
                        });

                    })



                }
            }
        ]);


        controllers.controller('ProductDetailCtrl', ['$scope', 'ProductService','Upload','$stateParams','$state','CategoryService','Util',
            function ($scope, ProductService,Upload,$stateParams,$state,CategoryService,Util) {
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

                $scope.categories=CategoryService.getCatesObj();

                ProductService.getGoodsInformation($stateParams.prod_id,function(err,data){
                    if(err){
                        alert('获取商品信息失败');
                        return ;
                    }
                    $scope.productForm=data;
                    var categoryArr=data.prod_categoryids.split(',');
                    for(var i=0;i<categoryArr.length;i++){
                        var item=categoryArr[i];
                        $('input[type="checkbox"][name="category"]').each(
                            function() {

                                if(item==$(this).val()){
                                    $(this).attr("checked",'true');
                                }
                            }
                        );
                    }




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

                $scope.addNewProduct = function () {
                    $scope.productForm.prod_categoryids='';
                    $scope.productForm.prod_categorynames='';

                    $('input[type="checkbox"][name="category"]:checked').each(
                        function() {
                            $scope.productForm.prod_categoryids+=$(this).val()+',';

                            for(var i=0;i<$scope.categories.data.length;i++){
                                var item=$scope.categories.data[i];
                                if(item.categories_id==$(this).val()){
                                    $scope.productForm.prod_categorynames+=item.category_name+',';
                                }
                            }
                        }
                    );


                    if ($scope.productForm.prod_categorynames=='') {
                        $scope.notifyContent = '请选择商品种类！';
                        $('#notifyModal').modal();
                        return;
                    }

                    if($scope.covers.length!=0)var imgName= $scope.covers[0].name;

                    if ($scope.covers.length!=0) {
                        var uploadCover = function (cb) {
                            Upload.upload({
                                url:'/api/goods/upload',
                                fileName: imgName,
                                file: $scope.covers[0]
                            }).success(function (data, status, headers, config) {
                                console.log(data);
                                cb(data);
                            });
                        };

                        Util.resizeFile($scope.covers[0]).then(function(blob_data){
                            $scope.covers[0]=blob_data;
                            uploadCover(function (data) {
                                $scope.productForm.prod_images = data.path;
                                $scope.productForm.prod_detail = $('#editor').html();
                                console.log($scope.productForm);
                                ProductService.updateProduct($scope.productForm, function (error, data) {
                                    if (error) {
                                        alert('修改商品失败'+error);
                                        return;
                                    }
                                    $state.go('home.product', {page: 1});
                                });
                            });


                        })


                    }else{
                        $scope.productForm.prod_detail = $('#editor').html();
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
