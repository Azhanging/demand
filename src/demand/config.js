/*默认配置参数*/
export const config = {
	alias: {},
	shim: {},
	paths: {}
}

/*设置默认reset的lastModule*/
export const resetLastModule = {
	_export_() {
		return() => {}
	},
	dep: [],
	id: null
}