import { resolvePath } from './path';

import { hasModule, findModule } from './module';

import { createScript, isCreateScript } from './script';

import fn from './fn';

//设置alias的规则
const ALIAS_PATH = /^@\S{1,}/;

//设置模块路径
export function setPaths(paths) {

	const loadModules = [];

	fn.each(paths, (path, name) => {

		const demand = this,
			resPath = resolvePath.call(this, path), //处理完的路径
			urlModules = this.module.urlModule, //通过url处理的模块
			pathModules = this.module.pathModule, //通过config中path的模块
			pathConfig = {
				url: resPath,
				name: name
			};

		//检查是否存在对应的模块，存在跳过
		if(hasModule.call(this, path)) {
			const hasCreateScript = isCreateScript.call(this, path);
			//当前的模块是否被加载script
			if(hasCreateScript) {
				hasCreateScript.call(this);
			}
			return;
		}

		urlModules[resPath] = {
			createScript() {
				createScript.call(demand, pathConfig);
			}
		}

		//如果是从paths中配置的路径
		if(fn.isStr(name)) {
			pathModules[name] = urlModules[resPath];
		}

		loadModules.push(pathConfig);
	});

	//返回处理完的模块路径
	return loadModules;
}

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