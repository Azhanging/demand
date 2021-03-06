import fn from './fn';

import { findModule } from './module';

import error from './error';

/*
 *	设置模块内的依赖depData 
 * 	{
 * 		dep:[dep1,dep2],
 * 		module:module
 * 	}
 * */

export function buildModuleDep(module) {
	const deps = module.dep,
		demandDep = [];

	module.build = true;

	//初始化模块依赖
	fn.each(deps, (dep) => {
		const findM = findModule.call(this, dep),
			depExport = findM._export_;

		//自己依赖自己的话，返回undefined
		if(module === findM) {
			demandDep.push(undefined);
		} else {
			/*
			 *	有关循环依赖的问题问题
			 * */

			if(findM && !findM.build) {
				buildModuleDep.call(this, findM);
			}

			if(!findM.isDemand) {
				demandDep.push(undefined);
			} else {
				demandDep.push(findM._export_);
			}
		}
	});

	//初始化模块接口
	if(!module.isDemand) {
		module._export_ = module._export_.apply(this, demandDep);
		module.isDemand = true;
	}
}