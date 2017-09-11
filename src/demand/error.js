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
		case 3:
			console.error('非paths和dep中加载的模块（即直接加载script的模块需要添加id来识别模块）');
			break;
		default:
			console.error('模块运行有误：' + msg);
	}
}