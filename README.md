# demand
模块加载器

### 一个文件一个模块，一个文件内只能使用一次demand.define定义模块，如果使用多个定义，只取最后一个为标准；

### demand.define([id,[dep],]handler):
	id:{type:String} 模块的id，可选使用。
	
	dep:{type:Array} 依赖的模块，可选使用，可以是路径模块（未加载的会请求加载回来），也可以是id模块；
	
	handler{type:Function} 处理函数,如果存在依赖模块的定义，参数为返回对应的依赖模块；
***
### demand.config(options)：一个window只允许配置一次，配置文件最好单独引入，所有的模块都将围绕配置文件来的运行；
	baseUrl:{type:String} 模块加载的根路径，如果没有设定baseUrl，则指向location.origin;
	alias:{type:Object} 路径别名,设置paths路径可以以别名开头
	paths:{type:Array} 设置模块的路径
		-- 路径以/开头，根据域的路径来匹配模块；
		-- 以.开头的路径为baseUrl路径为起始路径；
		-- 以..开头的路径为baseUrl路径上一层为起始路径；
		-- 别名路径:paths中获取alias的路径需要使用@加上alias的key值可以获取别名值；
		-- http || https:直接载入http和https的模块；
		
### demand.use(callback);
	所有的模块加载完毕后，执行use中的回调函数；
	
### demand.origin:获取根路径

### _GLOBAL_变量代理（不支持IE8）
	例如：demand._GLOBAL_['id'] = 1;
	demand._GLOBAL_为全局定义，不可重新赋值，只能在它身上添加变量代理的key和val；
	

