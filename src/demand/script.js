import { findModule, setModule } from './module';

import { resolveJsExt, isHttpModule } from './path';

import { queue } from './queue';

import fn from './fn';

//创建script节点
export function createScript(opts) {
    const script = document.createElement('script');
    //获取模块
    opts.findM = findModule.call(this, opts.url);
    script.async = true;

    script.onload = () => {
        delete opts.findM.createScript;
        setModule.call(this, opts);
        queue.next();
    };

    script.error = function() {
        throw('加载模块出错！');
    };

    script.type = "text/javascript";

    //先判断是否为http模块，否则就是baseUrl中的模块
    script.src = isHttpModule(opts.url) ? opts.url : resolveJsExt(opts.url);

    queue.push(false);

    document.getElementsByTagName('head')[0].appendChild(script);
}

//检测单前模块script是否加载了
export function isCreateScript(path) {
    const findM = findModule.call(this, path);
    if(fn.isFn(findM.createScript)) {
        return findM.createScript;
    } else {
        return false;
    }
}

//运行插入模块
export function runCreateScript(loadModules) {
    fn.each(loadModules, (path, index) => {
        createScript.call(this, path);
    });
}