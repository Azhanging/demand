/*!
 * 
 * 			demand.js v1.0.0
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/demand
 * 			time:Tue Sep 05 2017 23:03:14 GMT+0800 (中国标准时间)
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
            return array instanceof Array || !!(array && array.length);
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

var _set = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = new _fn2.default();

function demand(dep, cb) {
    if (fn.isArr(dep)) {
        fn.each(dep, function (name, index) {
            demand.module.installedModules[name].createScript();
        });
    }
}

//获取根路径
demand.origin = function () {
    return location.origin || location.protocol + '//' + location.host;
}();

//配置状态
var configed = false;

//配置
demand.config = function (opts) {
    //不能重新配置模块
    if (configed) {
        console.warn('不能重复配置模块！');
        return;
    }
    //设置源路径
    demand.baseUrl = opts.baseUrl ? opts.baseUrl : demand.origin;
    //配置别名
    demand.alias = fn.isObj(opts.alias) ? (0, _set.setAlias)(opts.alias) : {};
    //设置paths
    _set.setPaths.call(demand, opts.paths);
    //单例配置
    configed = true;
};

//模块存储
demand.module = {
    installedModules: {},
    use: []
};

//加载模块
demand.define = function (id, dep, cb) {
    //第一个参数为id名字
    if (fn.isStr(id)) {}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createScript = undefined;
exports.setAlias = setAlias;
exports.setPaths = setPaths;
exports.resolvePath = resolvePath;
exports.resolveJsExt = resolveJsExt;

var _queue = __webpack_require__(5);

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
    var _this = this;

    if (!fn.isObj(paths)) return;
    fn.each(paths, function (path, name) {
        var resPath = resolvePath.call(_this, path);
        _this.module.installedModules[name] = {
            isLoaded: false,
            createScript: function createScript() {
                _createScript(resPath, name);
            }
        };
    });
}

//创建script节点
function _createScript(url, name) {
    var script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-demand-model', name ? name : url);
    script.src = resolveJsExt(url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

//路径处理
exports.createScript = _createScript;
function resolvePath(path) {
    var resPath = [this.baseUrl],
        splitResPath = path.split('/');

    fn.each(splitResPath, function (p, index) {
        switch (p) {
            case '':
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

/***/ }),
/* 4 */
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

/***/ }),
/* 5 */
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
    function Queue() {
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
            if (this.queue.length != 0) this.queue.shift()();
        }
    }]);

    return Queue;
}();

exports.default = Queue;

/***/ })
/******/ ]);
//# sourceMappingURL=demand.js.map