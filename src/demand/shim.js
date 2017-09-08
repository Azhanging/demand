/*
 *	设置垫片库 
 * */
import fn from './fn';

import { setModule } from './module';

export function setShim(shim) {
	fn.each(shim, (_shim, id) => {
		
		this.define(id, _shim.dep, () => {
			return shimContext.call(this, _shim);
		});
		
		const lastLoadedModule = this.module.lastLoadedModule;
		
		setModule.call(this, {
			url: null,
			name: null,
			findM: lastLoadedModule
		});
	});
}

//处理shim中作用域和export接口
function shimContext(_shim) {
	const context = _shim.context || this.global,
		_export_ = _shim._export_;
	if(fn.isFn(_shim._export_)) {
		return _export_.call(context);
	}
	return context[_shim._export_];
}