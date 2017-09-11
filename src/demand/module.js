import fn from './fn';
//初始化
import { setPaths } from './init';

import { resolvePath } from './path';

import { runCreateScript } from './script';

import { resetLastModule } from './config';

import error from './error';

//has module in demand
export function hasModule(m) {
	const path = resolvePath.call(this, m),
		module = this.module;
	if(module.pathModule[m] ||
		module.idModule[m] ||
		module.urlModule[path]
	) return true;
	return false;
}

//find module in demand.module[path|url|id]  权重：path > url > id
export function findModule(m) {
	const module = this.module,
		path = resolvePath.call(this, m);
	if(module.pathModule[m]) return module.pathModule[m];
	if(module.urlModule[path]) return module.urlModule[path];
	if(module.idModule[m]) return module.idModule[m];
	return false;
}

//del error module
export function removeModule(opts) {
	delete this.module.urlModule[opts.url];
	delete this.module.pathModule[opts.name];
	resetLastLoadedModule.call(this);
}

//set module config
export function setModule(opts) {

	const lastLoader = this.module.lastLoadedModule;

	let dep = lastLoader.dep;

	//把最后加载的模块内容加载进去
	fn.each(lastLoader, (module, type) => {
		opts.findM[type] = module;
	});

	//扶弱当前的模块中存在id的名，设置id的模块
	if(lastLoader.id) {
		this.module.idModule[lastLoader.id] = opts.findM;
	}

	//查看依赖，设置一下依赖
	if(dep.length > 0) {
		const loadModules = setPaths.call(this, dep);
		runCreateScript.call(this, loadModules);
	}

	//设置初始化的状态
	opts.findM.isDemand = false;

	//运行模块内容，返回接口
	this.module.depManage.push(opts.findM);

	//重设最后的模块
	resetLastLoadedModule.call(this);
}

/*
 * 重设最后的模块,在http模块中会存在不同规格的内容，需要设置一个空的规格
 * */
function resetLastLoadedModule() {
	this.module.lastLoadedModule = resetLastModule;
}

//是否为script直接加载的模块
export function isScriptModule(module) {
	if(module !== resetLastModule) return true;
	return false;
}

//设置script直接加载的模块
export function setScriptLoadedModule(module) {
	
	if(module.id === null) {
		error(3);
		return;
	}
	
	setModule.call(this, {
		url: null,
		name: null,
		findM: module
	});
}