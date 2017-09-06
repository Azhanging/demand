/*!
 * 
 * 			demand.js v1.0.0
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/demand
 * 			time:Wed Sep 06 2017 22:16:54 GMT+0800 (中国标准时间)
 * 		
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//常用方法
var Fn = function () {
    function Fn() {
        _classCallCheck(this, Fn);
    }

    _createClass(Fn, [{
        key: 'isArr',
        value: function isArr(array) {
            return array instanceof Array;
        }
    }, {
        key: 'isObj',
        value: function isObj(obj) {
            return obj instanceof Object && !(obj instanceof Array) && obj !== null;
        }
    }, {
        key: 'isFn',
        value: function isFn(fn) {
            return typeof fn === 'function';
        }
    }, {
        key: 'isStr',
        value: function isStr(string) {
            return typeof string === 'string';
        }
    }, {
        key: 'isNum',
        value: function isNum(num) {
            return typeof num === 'number' || !isNaN(num);
        }
    }, {
        key: 'each',
        value: function each(obj, cb) {
            //遍历
            var i = 0,
                len = obj.length;
            if (this.isArr(obj)) {
                for (; i < len; i++) {
                    cb(obj[i], i);
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i)) cb(obj[i], i);
                }
            }
        }
    }, {
        key: 'cb',
        value: function cb(_cb, context, args) {
            //回调
            args = args ? args : [];
            this.isFn(_cb) ? _cb.apply(context, args) : null;
        }
    }]);

    return Fn;
}();

exports.default = Fn;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = new _fn2.default();

//兼容性IE8
(function () {

    //兼容IE8中 的indexOf
    if (!fn.isFn(Array.prototype.indexOf)) {
        Array.prototype.indexOf = function (val) {
            var index = 0,
                len = this.length;
            for (; index < len; index++) {
                if (this[index] === val) return index;
            }
            return -1;
        };
    }

    //map
    if (!fn.isFn(Array.prototype.map)) {
        Array.prototype.map = function (fn) {
            var mapArr = [],
                i = 0,
                len = this.length;
            for (; i < len; i++) {
                mapArr.push(fn(this[i], i));
            }
            return mapArr;
        };
    }

    //filter
    if (!fn.isFn(Array.prototype.filter)) {
        Array.prototype.filter = function (fn) {
            var mapArr = [],
                i = 0,
                len = this.length;
            for (; i < len; i++) {
                var item = this[i];
                if (fn(item, i)) mapArr.push(item);
            }
            return mapArr;
        };
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = demand;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _set = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = new _fn2.default();

function demand(dep, cb) {
	var _this = demand,
	    module = _this.module;
	//运行依赖
	if (fn.isArr(dep)) {
		fn.each(dep, function (name, index) {
			if (!_set.hasModule.call(_this, name)) return;
			var findM = _set.findModule.call(_this, name);
			fn.cb(findM.createScript, _this);
		});

		//存储回调，等所有的模块加载完毕后调用
		module.use.push({
			cb: cb,
			dep: dep
		});
	} else if (fn.isStr(dep)) {
		//获取模块
		return _set.findModule.call(_this, dep)['_export_'];
	}
}

//获取根路径
demand.origin = function () {
	return location.origin || location.protocol + '//' + location.host;
}();

//配置
demand.config = function (opts) {
	//设置源路径
	this.baseUrl = opts.baseUrl ? opts.baseUrl : this.origin;
	//配置别名
	this.alias = fn.isObj(opts.alias) ? (0, _set.setAlias)(opts.alias) : {};
	//设置paths
	_set.setPaths.call(this, opts.paths);
	//设置queue的回调
	_set.setModuleQueue.call(this);
};

//模块存储
demand.module = {
	pathModule: {},
	idModule: {},
	urlModule: {},
	use: [],
	lastLoadedModule: {}
};

//加载模块
demand.define = function (id, dep, cb) {
	var module = {};
	//存在id的模块
	if (fn.isStr(id)) {
		module['id'] = id;
		if (fn.isArr(dep)) {
			module['dep'] = dep;
			module['_export_'] = cb;
		} else if (fn.isFn(dep)) {
			module['dep'] = [];
			module['_export_'] = dep;
		}
	} else if (fn.isArr(id)) {
		module['id'] = null;
		module['dep'] = id;
		module['_export_'] = dep;
	} else if (fn.isFn(id)) {
		module['id'] = null;
		module['dep'] = [];
		module['_export_'] = id;
	} else {
		throw 'error';
	}
	//设置到最后一个接
	this.module.lastLoadedModule = module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    队列 
 * */

var Queue = function () {
    function Queue(opts) {
        _classCallCheck(this, Queue);

        this.queue = [];
    }

    _createClass(Queue, [{
        key: "push",
        value: function push(fn) {
            this.queue.push(fn);
        }
    }, {
        key: "next",
        value: function next() {
            if (this.queue.length != 0) {
                this.queue.shift();
            }

            if (this.queue.length === 0) this.cb();
        }
    }]);

    return Queue;
}();

exports.default = Queue;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createScript = undefined;
exports.setModuleQueue = setModuleQueue;
exports.setAlias = setAlias;
exports.setPaths = setPaths;
exports.setModule = setModule;
exports.resolvePath = resolvePath;
exports.resolveJsExt = resolveJsExt;
exports.hasModule = hasModule;
exports.findModule = findModule;

var _queue = __webpack_require__(3);

var _queue2 = _interopRequireDefault(_queue);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * set，设置模块方法
 * */

var fn = new _fn2.default();

//alias的规则
var ALIAS_PATH = /^@\S{1,}/;
//创建队列
var queue = new _queue2.default();
//依赖管理
var depManage = [];

//设置回调
function setModuleQueue() {
    var _this = this;

    queue.cb = function () {
        fn.each(depManage, function (depData, index) {
            buildModuleDep.call(_this, depData);
        });

        var cbDeps = [];

        fn.each(_this.module.use, function (depData, index) {

            fn.each(depData.dep, function (dep, index) {
                cbDeps.push(_this(dep));
            });

            depData.cb.apply(_this, cbDeps);
        });
    };
}

//设置模块内的依赖
function buildModuleDep(depData) {
    var _this2 = this;

    var module = depData.module,
        deps = depData.dep,
        demandDep = [];

    fn.each(deps, function (dep) {

        var findM = findModule.call(_this2, dep),
            depExport = findM['_export_'];

        if (!findM.isDemand) {
            findM['_export_'] = new depExport();
            findM.isDemand = true;
        }

        demandDep.push(findM['_export_']);
    });

    if (!module.isDemand) {

        module._export_ = module._export_.apply(this, demandDep);

        module.isDemand = true;
    }
}

//设置别名路径
function setAlias(alias) {
    var aliasPath = {};
    fn.each(alias, function (path, key) {
        if (ALIAS_PATH.test(key)) {
            aliasPath[key] = path;
        }
    });
    return aliasPath;
}

//设置模块路径
function setPaths(paths) {
    var _this3 = this;

    var loadModules = [];

    fn.each(paths, function (path, name) {

        var demand = _this3,
            resPath = resolvePath.call(_this3, path),
            //处理完的路径
        urlModules = _this3.module.urlModule,
            //通过url处理的模块
        pathModules = _this3.module.pathModule,
            //通过config中path的模块
        pathConfig = {
            url: resPath,
            name: name
        };

        //检查是否存在对应的模块，存在跳过
        if (hasModule.call(_this3, path)) {
            var hasCreateScript = isCreateScript.call(_this3, path);
            //当前的模块是否被加载script
            if (hasCreateScript) {
                hasCreateScript.call(_this3);
            }
            return;
        }

        urlModules[resPath] = {
            createScript: function createScript() {
                _createScript.call(demand, pathConfig);
            }
        };

        //如果是从paths中配置的路径
        if (fn.isStr(name)) {
            pathModules[name] = urlModules[resPath];
        }

        loadModules.push(pathConfig);
    });

    //返回处理完的模块路径
    return loadModules;
}

//创建script节点
function _createScript(opts) {
    var _this4 = this;

    var script = document.createElement('script');
    //获取模块
    opts.findM = findModule.call(this, opts.url);
    script.async = true;
    script.src = resolveJsExt(opts.url);

    script.onload = function () {
        delete opts.findM.createScript;
        setModule.call(_this4, opts);
        queue.next();
    };

    script.error = function () {};

    queue.push(false);

    document.getElementsByTagName('head')[0].appendChild(script);
}

//设置模块的信息
exports.createScript = _createScript;
function setModule(opts) {

    var lastLoader = this.module.lastLoadedModule,
        dep = lastLoader.dep;

    //把最后加载的模块内容加载进去
    fn.each(lastLoader, function (module, type) {
        opts.findM[type] = module;
    });

    //扶弱当前的模块中存在id的名，设置id的模块
    if (lastLoader.id) {
        this.module.idModule[lastLoader.id] = opts.findM;
    }

    //查看依赖，设置一下依赖
    if (dep.length > 0) {
        var loadModules = setPaths.call(this, dep);
        runCreateScript.call(this, loadModules);
    }

    //设置初始化的状态
    opts.findM.isDemand = false;

    //运行模块内容，返回接口
    depManage.unshift({
        module: opts.findM,
        dep: dep
    });

    //重设最后的模块
    resetLastLoadedModule.call(this);
}

//重设最后的模块
function resetLastLoadedModule() {
    this.module.lastLoadedModule = {};
}

//运行插入模块
function runCreateScript(loadModules) {
    var _this5 = this;

    fn.each(loadModules, function (path, index) {
        _createScript.call(_this5, path);
    });
}

//检测单前模块是否加载了
function isCreateScript(path) {
    var findM = findModule.call(this, path);
    if (fn.isFn(findM.createScript)) {
        return findM.createScript;
    } else {
        return false;
    }
}

//路径处理
function resolvePath(path) {
    var resPath = [this.baseUrl],
        splitResPath = path.split('/');

    fn.each(splitResPath, function (p, index) {
        switch (p) {
            case '':
                if (index === 0) resPath[index] = '';
                break;
            case '.':
                break;
            case '..':
                resPath.pop();
                break;
            default:
                resPath.push(p);
        }
    });
    return resPath.join('/');
}

//处理是否存在js后缀
function resolveJsExt(url) {
    if (/\.js/g.test(url)) return url;else return url + '.js';
}

//查找当前的模块是否在模块中存在
function hasModule(m) {
    var path = resolvePath.call(this, m),
        module = this.module;
    if (module.pathModule[m] || module.idModule[m] || module.urlModule[path]) return true;
    return false;
}

//查找对应的模块内容  权重：path > url > id
function findModule(m) {
    var module = this.module,
        path = resolvePath.call(this, m);
    if (module.pathModule[m]) return module.pathModule[m];
    if (module.urlModule[path]) return module.urlModule[path];
    if (module.idModule[m]) return module.idModule[m];
    return false;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _demand = __webpack_require__(2);

var _demand2 = _interopRequireDefault(_demand);

var _compatibility = __webpack_require__(1);

var _compatibility2 = _interopRequireDefault(_compatibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//demand文件入口
(function (global, factory) {
    global ? global.demand = factory() : {};
})(typeof window !== 'undefined' ? window : undefined, function () {

    _demand2.default.version = "v1.0.0";

    return _demand2.default;
});
//兼容性处理

/***/ })
/******/ ]);
//# sourceMappingURL=demand.js.map