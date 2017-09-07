import fn from './fn';

//路径处理
export function resolvePath(path) {
	const resPath = [this.baseUrl],
		splitResPath = path.split('/');

	fn.each(splitResPath, (p, index) => {
		switch(p) {
			case '':
				if(index === 0) resPath[index] = '';
				break;
			case '.':
				break;
			case '..':
				resPath.pop();
				break;
			default:
				resPath.push(p);
		}
	});
	return resPath.join('/');
}

//处理是否存在js后缀
export function resolveJsExt(url) {
	if(/\.js/g.test(url)) return url;
	else return url + '.js';
}