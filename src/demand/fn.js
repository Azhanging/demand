//常用方法
class Fn {
	isArr(array) {
		return array instanceof Array;
	}

	isObj(obj) {
		return obj instanceof Object && !(obj instanceof Array) && obj !== null;
	}

	isFn(fn) {
		return typeof fn === 'function';
	}
	isStr(string) {
		return typeof string === 'string';
	}
	isNum(num) {
		return typeof num === 'number' || !isNaN(num);
	}
	each(obj, cb) { //遍历
		let i = 0,
			len = obj.length;
		if(this.isArr(obj)) {
			for(; i < len; i++) {
				cb(obj[i], i);
			}
		} else {
			for(i in obj) {
				if(obj.hasOwnProperty(i)) cb(obj[i], i);
			}
		}
	}
	cb(cb, context, args) { //回调
		args = args ? args : [];
		this.isFn(cb) ? (cb.apply(context, args)) : null;
	}
	//处理正则数据
	initRegExp(expr) {
		const tm = '\\/*.?+$^[](){}|\'\"';
		this.each(tm, (tmItem, index) => {
			expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
		});
		return expr;
	}
	extend(obj, options) { //合并
		this.each(options, (option, key) => {
			obj[key] = option;
		});
		return obj;
	}
}

export default new Fn();