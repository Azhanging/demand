import fn from './fn';

const HTTP = /^http(s)?:\/\//;

//路径处理
export function resolvePath(path) {
    
    if(isHttpModule(path)){
        return path;
    }
    
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

//判断是否为http(s)的模块
export function isHttpModule(url){
    return HTTP.test(url);
}
