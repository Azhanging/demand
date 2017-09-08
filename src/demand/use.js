import { buildModuleDep } from './dep';

import { queue } from './queue';

import fn from './fn';

import error from './error';

//设置模块的依赖队列和use中的cb
export function useQueue() {
	queue.cb = () => {
		const module = this.module;
		//设置dep的依赖
		while(module.depManage.length !== 0) {
			const depData = module.depManage.shift();
			buildModuleDep.call(this, depData);
		}
		//处理use
		runUse.call(this);
		//第一次的模块加载全部完毕
		module.status = true;
	}
}

//运行依赖
export function runUse() {
	const module = this.module;
	let cbDeps = [];
	while(module.use.length !== 0) {
		const depData = module.use.shift();
		fn.each(depData.dep, (dep, index) => {
			cbDeps.push(this(dep));
		});

		try {
			depData.cb.apply(this, cbDeps);
		} catch(err) {
			error(null, err);
		}

		//依赖处理完后清空
		cbDeps = [];
	}
}