import { findModule, setModule } from './module';

import { resolveJsExt } from './path';

import { queue } from './queue';

import fn from './fn';

//创建script节点
export function createScript(opts) {
	const script = document.createElement('script');
	//获取模块
	opts.findM = findModule.call(this, opts.url);
	script.async = true;

	script.onload = () => {
		delete opts.findM.createScript;
		setModule.call(this, opts);
		queue.next();
	};

	script.error = function() {
		throw('加载模块出错！');
	};

	script.type = "text/javascript";

	script.src = resolveJsExt(opts.url);

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