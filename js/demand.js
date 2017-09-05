/*!
 * 
 * demand.js v1.0.0
 * (c) 2016-2017 Blue
 * https://github.com/azhanging/demand
 * Released under the MIT License.
 *      
 */

(function(global, factory) {
	//不引入两次
	if(!(typeof global.demand == 'function')) {
		global.demand = factory(global);
	}
})(typeof window !== 'undefined' ? window : this, function(global) {

	//常用方法
	function Fn() {}

	Fn.prototype = {
		constructor: Fn,
		isArr: function(array) {
			return array instanceof Array;
		},
		isFn: function(fn) {
			return typeof fn === 'function';
		},
		isStr: function(string) {
			return typeof string === 'string';
		}
	}

	var fn = new Fn();

	//http、https链接
	var HTTP_PATH = /^http(s)?:\/\//;

	//兼容性IE8
	(function() {

		//兼容IE8中 的indexOf
		if(!fn.isFn(Array.prototype.indexOf)) {
			Array.prototype.indexOf = function(val) {
				for(var index = 0, len = this.length; index < len; index++) {
					if(this[index] === val) return index;
				}
				return -1;
			}
		}

		//map
		if(!fn.isFn(Array.prototype.map)) {
			Array.prototype.map = function(fn) {
				var mapArr = [];
				for(var i = 0; i < this.length; i++) {
					mapArr.push(fn(this[i], i));
				}
				return mapArr;
			}
		}

		//filter
		if(!fn.isFn(Array.prototype.filter)) {
			Array.prototype.filter = function(fn) {
				var mapArr = [];
				for(var i = 0; i < this.length; i++) {
					var item = this[i];
					if(fn(item, i)) mapArr.push(item);
				}
				return mapArr;
			}
		}

	})();

	//用来检查是否require
	function isRequire(module) {
		if(!module.isRequire) {
			module.isRequire = true;
			module._export_ = new module._export_();
		}
	}

	//获取模块
	function demand(path) {

		var installModules = demand.modules.installedModules,
			getModules = installModules[getUrl(path)]; //获取路径模块

		if(!getModules) { //获取不到路径模块为id模块
			//获取的可能是id
			try {
				isRequire(installModules[path]);
				return installModules[path]._export_;

			} catch(e) {
				error(1, path, e);
			}
		} else if(getModules) {
			//获取不到路径模块
			try {
				isRequire(getModules);
				return getModules._export_;
			} catch(e) {
				error(1, path, e);
			}
		} else {
			//获取不到模块
			error(1, path);
		}
	}

	/*代理变量*/
	demand._GLOBAL_ = {};

	//获取根路径
	demand.origin = (function() {
		return(location.origin || location.protocol + '//' + location.host);
	})();

	//最后加载成功的模块路径
	var lastLoadModuleHandler = null,
		//最后加载模块设置的id值
		lastLoadId = null,
		//最后加载模块依赖
		lastDepModules = [];

	//模块信息
	demand.modules = {
		//路径模块加载
		installedModules: {},
		//模块列表
		modulesLists: [],
		//执行use队列
		installUse: []
	};

	//存储是否配置了模块
	var configed = false;

	//设置配置信息,并且初始化
	demand.config = function(options) {
		//不能重新配置模块
		if(configed) {
			console.warn('不能重复配置模块！');
			return;
		}
		//设置源路径
		demand.baseUrl = options.baseUrl ? options.baseUrl : demand.origin;
		//配置别名
		demand.alias = options.alias;
		//加载模块
		loadModules(setUrl(options.paths));
		//单例配置
		configed = true;
	}

	//动态加载id模块
	demand.loadModules = function(paths) {
		if(fn.isArr(paths)) loadModules(setUrl(paths));
		else if(fn.isStr(paths)) loadModules(setUrl([paths]));
	}

	//定义模块
	demand.define = function() {
		var modules = demand.modules,
			hasLastModuleHandler = false,
			arg_0 = arguments[0],
			arg_1 = arguments[1],
			arg_2 = arguments[2],
			dep = null,
			cb = null,
			isIdModule = fn.isStr(arg_0); //是否为id模块

		if(isIdModule) {
			if(modules.installedModules[arg_0]) error(2, arg_0);
			dep = arg_1;
			cb = arg_2;
		} else {
			dep = arg_0;
			cb = arg_1;
		}

		//设置id和非id的数据处理
		if(dep instanceof Array) {

			depHandler(dep);

			if(isIdModule) {
				lastLoadId = arg_0;
			}

			lastDepModules = dep;

			lastLoadModuleHandler = function() {
				//设置依赖模块
				var deps = dep.map(function(moduleName) {
					return demand(moduleName);
				});
				return cb.apply(this, deps);
			};
		} else if(fn.isFn(dep)) {
			//如果第一个参数是模块函数
			if(isIdModule) {
				lastLoadId = arg_0;
			}
			lastLoadModuleHandler = dep;
		}	//运行模块
	demand.use = function(callback) {
		demand.modules.installUse.push(callback);
		isLoad();
	};

	//设置路径
	function setUrl(paths) {
		var _paths = [];
		for(var index = 0; index < paths.length; index++) {
			_paths.push(getUrl(paths[index]));
		}
		return _paths;
	}

	//处理dep是否存在已加载的模块
	function depHandler(paths) {
		var newPaths = paths.filter(function(path) {
			return !hasModule(path) && !isIdModule(path);
		});
		loadModules(setUrl(newPaths));
	}

	//获取路径
	function getUrl(path) {
		//http链接
		if(HTTP_PATH.test(path)) {
			return path;
		} else {
			return urlResolve(path);
		}
	}

	//检查路径是开始还是结束的
	var pathPosition = {
		start: function(path) {
			if(/^\//.test(path)) {
				return true;
			}
			return false;
		},
		end: function(path) {
			if(/\/$/.test(path)) {
				return true;
			}
			return false;
		}
	};

	//处理路径解析
	function urlResolve(path) {

		var _path = demand.baseUrl,
			route = path.split('/'),
			tempPath = '',
			index = 0,
			alias = '';

		for(; index < route.length; index++) {
			//第一为绝对路径
			if(route[index] === '' && index === 0) {
				_path = demand.origin;
			} else if(route[index] === '.') {
				_path += '';
			} else if(route[index] == '..') {
				//其他为上级目录
				_path = _path.split('/');
				_path.pop();
				_path = _path.join('/');
			} else if(/^@/g.test(route[index])) {
				//别名路径
				alias = demand.alias[route[index].replace(/@/g, '')];
				pathPosition.end(_path) ?
					(pathPosition.start(alias) ? (tempPath = alias.substring(1)) : (tempPath = alias)) :
					(pathPosition.start(alias) ? (tempPath = alias) : (tempPath = '/' + alias));
				_path += tempPath;
			} else {
				//最后的文件
				pathPosition.end(_path) ? (_path += route[index]) : (_path += ('/' + route[index]));
			}
		}
		return _path;
	}

	/*队列*/
	function Queue(opts) {
		this.queue = [];
	}

	Queue.prototype.push = function(fn) {
		this.queue.push(fn);
	}

	Queue.prototype.next = function() {
		if(this.queue.length != 0) this.queue.shift()();
	}

	//创建队列
	var queue = new Queue();

	//加载模块
	function loadModules(paths) {
		var modules = demand.modules,
			path = '',
			scriptElement,
			index = 0;

		if(!(paths instanceof Array)) return;

		for(; index < paths.length; index++) {

			//获取加载模块的列表
			path = paths[index];
			//查看当前的路径是否已经记载的模块
			if(hasModule(path)) continue;

			scriptElement = document.createElement('script');

			scriptElement.src = path;
			//当前模块添加到列表中
			modules.modulesLists.push(path);

			//设置当前模块加载状态
			modules.installedModules[path] = {
				loaded: false
			};

			// 创建script，监听加载
			listenScriptModule(path, scriptElement);
		}

		queue.next();

	}

	// listen script 模块监听
	function listenScriptModule(path, scriptElement) {

		scriptElement.onload = function() {
			scriptEventHandler(path);
			queue.next();
		};

		scriptElement.onerror = function() {
			error(1, path);
			scriptEventHandler(path);
			queue.next();
		};

		queue.push(function() {
			document.getElementsByTagName('head')[0].appendChild(scriptElement);
		});
	}

	//处理scripr加载完毕后的处理
	function scriptEventHandler(path) {
		//设置接口
		set_export(path);
		//检查当前模块是全部否完成
		isLoad();
	}

	//设置接口
	function set_export(path) {
		
		var installModules = demand.modules.installedModules,
			module = {
				_export_: lastLoadModuleHandler,
				dep: lastDepModules,
				loaded: true,
				isRequire: false
			};

		//设置最后加载的模块已经模块路径
		if(path) installModules[path] = module

		//是否存在设置id的模块
		if(lastLoadId) installModules[lastLoadId] = module

		//初始化所有的及接口配置
		resetLastModule();
	}

	/* 重置最后的模块配置 */
	function resetLastModule() {
		lastLoadId = null;

		lastLoadModuleHandler = function() {
			return function() {}
		};

		lastDepModules = [];
	}

	//检测是否存在了模块
	function hasModule(path) {
		if(demand.modules.modulesLists.indexOf(path) === -1) return false;
		return true;
	}

	//检测是否为id模块
	function isIdModule(path) {
		if(/\.js/.test(path)) return false;
		return true;
	}

	//检测模块是否全部完毕
	function isLoad() {
		var modules = demand.modules,
			installedModules = modules.installedModules,
			isLoad = Object.keys(installedModules);

		for(var index = 0; index < isLoad.length; index++) {
			if(installedModules[isLoad[index]].loaded === false) return false;
		}
		runUse();
	}

	//运行use
	function runUse() {
		var uses = demand.modules.installUse,
			index = 0,
			len = uses.length;
			
		for(; index < len; index++) {
			uses.shift()();
		}
	}

	//错误处理
	function error(errorCode, msg, err) {
		switch(errorCode) {
			case 1:
				console.warn('加载' + msg + '模块有误', err);
				break;
			case 2:
				console.warn('存在相同' + msg + '模块');
				break;
			case 3:
				console.warn(msg + '模块参数有误');
				break;
			case 4:
				throw('错误的路径！');
				break;
			default:
				;
		}
	}

	demand.version = 'v1.0.0';

	return demand;
});