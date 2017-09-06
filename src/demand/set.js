/*
 * set，设置模块方法
 * */

import Queue from './queue';

import Fn from './fn';

const fn = new Fn();

//alias的规则
const ALIAS_PATH = /^@\S{1,}/;

//设置别名路径
export function setAlias(alias) {
	const aliasPath = {};
	fn.each(alias, (path, key) => {
		if(ALIAS_PATH.test(key)) {
			aliasPath[key] = path;
		}
	});
	return aliasPath;
}

//设置模块路径
export function setPaths(paths) {
	fn.each(paths, (path, name) => {

		const demand = this,
			resPath = resolvePath.call(this, path), //处理完的路径
			urlModules = this.module.urlModule, //通过url处理的模块
			pathModules = this.module.pathModule; //通过config中path的模块

		urlModules[resPath] = {
			isLoaded: false,
			createScript() {
				createScript.call(demand, {
					url: resPath,
					name: name
				});
			}
		}

		//如果是从paths中配置的路径
		if(fn.isStr(name)) {
			pathModules[name] = urlModules[resPath];
		}
	});
}

//创建script节点
export function createScript(opts) {
	const _this = this,
		script = document.createElement('script');
	//获取模块
	opts.findM = findModule.call(this, opts.url);
	script.async = true;
	script.src = resolveJsExt(opts.url);
	script.onload = function() {
		setModule.call(_this, opts);
		opts.findM.isLoaded = true;
		delete opts.findM.createScript;
	};
	script.error = function() {

	};
	document.getElementsByTagName('head')[0].appendChild(script);
}

//设置模块的信息
export function setModule(opts) {

	const lastLoader = this.module.lastLoadedModule;

	fn.each(lastLoader, (module, type) => {
		opts.findM[type] = module;
	});

	//扶弱当前的模块中存在id的名，设置id的模块
	if(lastLoader.id) {
		this.module.idModule[lastLoader.id] = opts.findM;
	}

	//重设最后的模块
	resetLastLoadedModule.call(this);
}

//重设最后的模块
function resetLastLoadedModule() {
	this.module.lastLoadedModule = {};
}

//路径处理
export function resolvePath(path) {
	const resPath = [this.baseUrl],
		splitResPath = path.split('/');

	fn.each(splitResPath, (p, index) => {
		switch(p) {
			case '':
				if(index === 0) resPath[index] = '';
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
export function resolveJsExt(url) {
	if(/\.js/g.test(url)) return url;
	else return url + '.js';
}

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