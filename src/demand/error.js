/*
 *	错误处理 
 * */

export default function error(errCode, msg) {
	switch(errCode) {
		case 0:
			console.warn('只允许实例化一次！');
			break;
		case 1:
			console.error(msg + '加载模块出错！');
			break;
		case 2:
			console.error('模块使用有误，不能当前模块依赖于自身！');
			break;
		default:
			console.error('模块运行有误：' + msg);
	}
}