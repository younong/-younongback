/**
 * Created by zhaohui on 15-5-8.
 */
// 商品相关服务配置文件
define(['common/services'],
    function (services) {
        services.factory('CategoryService', function ($http) {
        	var catesObj = {data:[]};
        	
        	load();

        	/**
			 * @desc 一次加载分类信息
        	 */ 
        	function load(){
        		$http.get('/api/categories/find').success(function(data){
        			catesObj.data = data.result;
        		}).error(function(err){
        			console.log("分类信息加载出错",err);
        		})
        	}

        	return {
				/**
				 * @desc 获取分类信息
	        	 */         	
	        	getCatesObj:function(){
	        		return catesObj;
	        	},

	        	/**
				 * @desc 添加分类信息
	        	 */
	        	addCate:function(catename, suc, err){
	        		$http.get('/api/categories/add?catename='+catename).success(function(data){
	        			catesObj.data.unshift({
	        				category_name:catename,
	        				categories_id:data.result.insertId
	        			});
	        			suc&&suc();
	        		}).error(function(err){
	        			err&&err();
	        		})
	        	},

	        	/**
				 * @desc 删除分类信息
	        	 */
	        	deleteCate:function(cateid, suc, err){
	        		$http.get('/api/categories/delete?cateid='+cateid).success(function(data){
	        			for(index in catesObj.data){
	        				var cate = catesObj.data[index];
	        				if(cate.categories_id === cateid){
	        					catesObj.data.splice(index, 1);
	        					return;
	        				}
	        			}
	        			catesObj.data.splice(index,1);
	        			suc&&suc();
	        		}).error(function(err){
	        			err&&err();
	        		})
	        	}
        	}
        });
    });
