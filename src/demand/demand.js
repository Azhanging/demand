import Fn from './fn';

import {
    setAlias,
    setPaths
} from './set';

const fn = new Fn();

export default function demand(dep,cb) {
    if(fn.isArr(dep)){
        fn.each(dep,(name,index)=>{
            demand.module.installedModules[name].createScript();
        });
    }
}

//获取根路径
demand.origin = (function() {
    return(location.origin || location.protocol + '//' + location.host);
})();

//配置状态
let configed = false;

//配置
demand.config = (opts) => {
    //不能重新配置模块
    if(configed) {
        console.warn('不能重复配置模块！');
        return;
    }
    //设置源路径
    demand.baseUrl = opts.baseUrl ? opts.baseUrl : demand.origin;
    //配置别名
    demand.alias = fn.isObj(opts.alias) ? setAlias(opts.alias) : {};
    //设置paths
    setPaths.call(demand,opts.paths);
    //单例配置
    configed = true;
};

//模块存储
demand.module = {
    installedModules: {},
    use:[]
};

//加载模块
demand.define = (id, dep, cb) => {
    //第一个参数为id名字
    if(fn.isStr(id)){
        
    }
};