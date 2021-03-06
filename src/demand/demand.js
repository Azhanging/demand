import { hasModule, findModule, setIdModule, isScriptModule, setScriptLoadedModule } from './module';

import { useQueue, checkRunUse, runUse } from './use';
//初始化
import { setAlias, setPaths } from './init';

import { setShim } from './shim';

import { config, resetLastModule } from './config';

import { runCreateScript } from './script';

import error from './error';

import fn from './fn';

export default function demand(dep, cb) {
	const _this = demand,
		module = _this.module;
	//运行依赖
	if(fn.isArr(dep)) {
		fn.each(dep, (name, index) => {
			if(!hasModule.call(_this, name)) return;
			const findM = findModule.call(_this, name);
			fn.cb(findM.createScript, _this);
		});

		//存储回调，等所有的模块加载完毕后调用
		module.use.push({
			dep: dep,
			cb: cb
		});

		module.status ? runUse.call(_this) : null;

	} else if(fn.isFn(dep)) {
		/*
		 * 使用情况：1.在模块全部加在后追加使用
		 *          2.在模块加载依赖的时候使用
		 * */
		module.use.push({
			dep: [],
			cb: dep
		});

		module.status ? runUse.call(_this) : null;

	} else if(fn.isStr(dep)) {

		//获取模块
		const module = findModule.call(_this, dep);
		//这理由循环依赖的问题，如果当前的模块是未加载的，直接返回undefined
		return module.isDemand ? module['_export_'] : undefined;
	}
}

//获取根路径
demand.origin = (function() {
	return(location.origin || location.protocol + '//' + location.host);
})();

//是否config过
let isConfig = false;

//配置
demand.config = function(opts) {
	if(isConfig) {
		error(0);
		return;
	}

	opts = fn.extend(config, opts);

	//设置源路径
	this.baseUrl = opts.baseUrl ? opts.baseUrl : this.origin;
	//配置别名
	this.alias = setAlias(opts.alias);
	//设置shim配置
	setShim.call(this, opts.shim);
	//设置paths
	setPaths.call(this, opts.paths);
	//设置queue的回调
	useQueue.call(this);
	//只允许config一次
	isConfig = true;
};

//再config后以后加载模块
demand.loadModule = function(paths) {
	let loadModules;

	if(fn.isObj(paths)) {
		loadModules = setPaths.call(this, paths);
	} else if(fn.isStr(paths)) {
		loadModules = setPaths.call(this, [paths]);
	}

	runCreateScript.call(this, loadModules);

	this.module.status = false;
}

//设置一下全局的环境
demand.global = typeof window !== undefined ? window : this;

//模块存储
demand.module = {
	pathModule: {}, //config中的path模块
	idModule: {}, //id模块
	urlModule: {}, //url路径的模块
	use: [], //use集合
	lastLoadedModule: resetLastModule, //最后获取到的模块
	depManage: [], //依赖管理
	depQueue: [], //依赖队列
	status: false //全部的use加载状态
};

//加载模块
demand.define = function(id, dep, cb) {
	const module = {};
	//存在id的模块
	if(fn.isStr(id)) {
		module['id'] = id;
		if(fn.isArr(dep)) {
			module['dep'] = dep;
			module['_export_'] = cb;
		} else if(fn.isFn(dep)) {
			module['dep'] = [];
			module['_export_'] = dep;
		}
	} else if(fn.isArr(id)) {
		module['id'] = null;
		module['dep'] = id;
		module['_export_'] = dep;
	} else if(fn.isFn(id)) {
		module['id'] = null;
		module['dep'] = [];
		module['_export_'] = id;
	} else {
		throw('error');
	}
	/*
	 *	检查非paths或者是dep中加载的模块设置
	 * */

	if(isScriptModule(this.module.lastLoadedModule)) {
		setScriptLoadedModule.call(this, this.module.lastLoadedModule);
	}

	//设置到最后一个接
	this.module.lastLoadedModule = module;
};