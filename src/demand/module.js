import fn from './fn';
//初始化
import { setPaths } from './init';

import { resolvePath } from './path';

//查找当前的模块是否在模块中存在
export function hasModule(m) {
	const path = resolvePath.call(this, m),
		module = this.module;
	if(module.pathModule[m] ||
		module.idModule[m] ||
		module.urlModule[path]
	) return true;
	return false;
}

//查找对应的模块内容  权重：path > url > id
export function findModule(m) {
	const module = this.module,
		path = resolvePath.call(this, m);
	if(module.pathModule[m]) return module.pathModule[m];
	if(module.urlModule[path]) return module.urlModule[path];
	if(module.idModule[m]) return module.idModule[m];
	return false;
}

//设置模块的信息
export function setModule(opts) {

	const lastLoader = this.module.lastLoadedModule,
		dep = lastLoader.dep;

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
	this.module.depManage.unshift({
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
	fn.each(loadModules, (path, index) => {
		createScript.call(this, path);
	});
}