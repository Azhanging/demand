import Fn from './fn';

import {
	setAlias,
	setPaths,
	hasModule,
	findModule
} from './set';

const fn = new Fn();

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
		module.use.push(cb);
	} else if(fn.isStr(dep)) {
		//获取模块
		return findModule.call(_this,dep);
	}
}

//获取根路径
demand.origin = (function() {
	return(location.origin || location.protocol + '//' + location.host);
})();

//配置
demand.config = function(opts) {
	//设置源路径
	this.baseUrl = opts.baseUrl ? opts.baseUrl : this.origin;
	//配置别名
	this.alias = fn.isObj(opts.alias) ? setAlias(opts.alias) : {};
	//设置paths
	setPaths.call(this, opts.paths);
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
		module['dep'] = module['id'] = null;
		module['_export_'] = id;
	} else {
		throw('error');
	}
	//设置到最后一个接
	this.module.lastLoadedModule = module;
};