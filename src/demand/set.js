/*
 * set，设置模块方法
 * */

import Queue from './queue'; 

import Fn from './fn';

const fn = new Fn();

//alias的规则
const ALIAS_PATH = /^@\S{1,}/;

//设置别名路径
export function setAlias(alias) {
    const aliasPath = {};
    fn.each(alias, (path, key) => {
        if(ALIAS_PATH.test(key)) {
            aliasPath[key] = path;
        }
    });
    return aliasPath;
}

//设置模块路径
export function setPaths(paths) {
    if(!fn.isObj(paths)) return;
    fn.each(paths, (path, name) => {
        const resPath = resolvePath.call(this, path);
        this.module.installedModules[name] = {
            isLoaded: false,
            createScript: function() {
                createScript(resPath, name);
            }
        };
    });
}

//创建script节点
export function createScript(url, name) {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-demand-model', name ? name : url);
    script.src = resolveJsExt(url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

//路径处理
export function resolvePath(path) {
    const resPath = [this.baseUrl],
        splitResPath = path.split('/');

    fn.each(splitResPath, (p, index) => {
        switch(p) {
            case '':
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
export function resolveJsExt(url){
    if(/\.js/g.test(url)) return url;
    else return url + '.js'; 
}
