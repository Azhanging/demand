import fn from './fn';

const HTTP = /^http(s)?:\/\//;

//路径处理
export function resolvePath(path) {
    //如果是http的链接，直接返回直接的http链接
    if(isHttpModule(path)){
        return path;
    }
    
    //处理完alias的路径
    const resolveAliasPath = resolveAlias.call(this,path);
    
	const resPath = [this.baseUrl],
		splitResPath = resolveAliasPath.split('/');
		
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
	
	return resPath.join('/').replace(/\/{2,}/g,'\/');;
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

const ALIAS = /@(.*?)/g; 

//处理alias的数据
function resolveAlias(path){
	
	//如果不存在别名，直接返回路径
	if(!ALIAS.test(path)){
		return path;	
	}
	
	//存在别名，把别名替换掉
	fn.each(this.alias,(_alias,key)=>{
		ALIAS.lastIndex = 0;
		if(!ALIAS.test(path)) return path;
		path = path.replace(new RegExp(fn.initRegExp(key),'g'),_alias);
	});
	
	return path;
}
