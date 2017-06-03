# H5_Storage
封装一个库，实现web storage操作的功能 1、添加和修改在一个方法里实现 2、删除某些项和全部清除都在一个方法里实现 3、支持各种数据的操作 4、能设置过期时间

$.getOrSetStorage({
					type:"localStorage",
					key:"12",
					val:{a:1,b:2},
					day:10,
				})
        
$.deleteOrClearStorage({type:"localStorage"});
