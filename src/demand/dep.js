import fn from './fn';

import { findModule } from './module';

/*
 *	设置模块内的依赖depData 
 * 	{
 * 		dep:[dep1,dep2],
 * 		module:module
 * 	}
 * */
export function buildModuleDep(depData) {
	const module = depData.module,
		deps = depData.dep,
		demandDep = [];

	fn.each(deps, (dep) => {
		const findM = findModule.call(this, dep),
			depExport = findM._export_;
		if(!findM.isDemand) {
			findM._export_ = new depExport();
			findM.isDemand = true;
		}
		demandDep.push(findM._export_);
	});

	if(!module.isDemand) {
		module._export_ = module._export_.apply(this, demandDep);
		module.isDemand = true;
	}
}