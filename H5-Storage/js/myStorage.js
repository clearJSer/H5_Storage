var $ = (function(){
	var obj = {};
	
	obj.getOrSetStorage = function(data){
		return privateGetOrSet(data);
	}
	obj.deleteOrClearStorage = function(data){
		privateDeleteClear(data);
	}
	//{type:"localStorage",key:"a",val:"111",day:10}
	function privateGetOrSet(data){
		// 默认是localStorage
		var storageType = data.type=="localStorage"?true:false;
		var value = data.val;
		
		if(data.key){//key必填项
			if(value){//set数据
				if(data.day){
					//失效日期距离1970年的毫秒数
					data.day = new Date().getTime() +data.day*24*60*60*1000;
				}
				var str  = JSON.stringify(data);
				if(storageType){
					localStorage.setItem(data.key,str)
				}else{
					sessionStorage.setItem(data.key,str)
				}
			}else{//get数据
				if(storageType){
					var obj = JSON.parse(localStorage.getItem(data.key));
				}else{
					var obj = JSON.parse(sessionStorage.getItem(data.key));
				}
				if(obj){
					if(obj.day){//永不过期
						//判断是否过期
						if(obj.day - new Date().getTime()>0){
							return obj.val;
						}else{
							localStorage.removeItem(data.key);
							sessionStorage.removeItem(data.key);
							return "该数据已经失效！";
						}
					}else{
						return obj.val;
					}
				}
			}
		}else{
			throw Error("key值必输项！");
		}
	}
	function privateDeleteClear(data){
		var storageType = data.type == "localStorage"?true:false;
		var arr = data.keys;
		if(storageType){//删除localStoage
			if(arr){
				arr.forEach(function(item,index,array){
					for (var i = 0; i < localStorage.length; i++) {
				      if(item == localStorage.key(i)){
							localStorage.removeItem(item);
						}
				    }
				})
			}else{
				localStorage.clear();
			}
		}else{//删除sessionstroage
			if(arr){
				arr.forEach(function(item,index,array){
					localStorage.forEach(function(obj,n){
						if(item == localStorage.key(n)){
							sessionStorage.removeItem(item);
						}
					})
				})
			}else{
				sessionStorage.clear();
			}
		}
	}
	return obj;
}())
