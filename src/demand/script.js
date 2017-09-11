import { findModule, setModule, removeModule } from './module';

import { resolveJsExt, isHttpModule } from './path';

import { queue } from './queue';

import fn from './fn';

import error from './error';

//创建script节点
export function createScript(opts) {
	const script = document.createElement('script');
	//获取模块
	opts.findM = findModule.call(this, opts.url);
	//异步加载    
	script.async = true;

	delete opts.findM.createScript;

	script.onload = () => {
		setModule.call(this, opts);
		queue.next();
	};

	script.onerror = () => {
		removeModule.call(this, opts);
		error(1, opts.url);
		try {
			script.remove();
		} catch(e) {
			script.parentNode.removeChild(script);
		}
		queue.next();
	};

	script.type = "text/javascript";

	//先判断是否为http模块，否则就是baseUrl中的模块
	script.src = isHttpModule(opts.url) ? opts.url : resolveJsExt(opts.url);

	//添加依赖队列数据
	queue.push(false);

	document.getElementsByTagName('head')[0].appendChild(script);
}

//检测单前模块script是否加载了
export function isCreateScript(path) {
	const findM = findModule.call(this, path);
	if(fn.isFn(findM.createScript)) {
		return findM.createScript;
	} else {
		return false;
	}
}

//运行插入模块
export function runCreateScript(loadModules) {
	fn.each(loadModules, (path, index) => {
		createScript.call(this, path);
	});
}