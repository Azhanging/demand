/*
 * set，设置模块方法
 * */

import Queue from './queue';

import Fn from './fn';

const fn = new Fn();

//alias的规则
const ALIAS_PATH = /^@\S{1,}/;
//创建队列
const queue = new Queue();
//依赖管理
const depManage = [];

//设置回调
export function setModuleQueue() {
    queue.cb = () => {
        fn.each(depManage, (depData, index) => {
            buildModuleDep.call(this,depData);
        });
        
        const cbDeps = [];
        
        fn.each(this.module.use, (depData, index) => {
            
            fn.each(depData.dep,(dep,index)=>{
                cbDeps.push(this(dep));
            });
            
            depData.cb.apply(this,cbDeps);
        });
    }
}

//设置模块内的依赖
function buildModuleDep(depData) {
    const module = depData.module, 
        deps = depData.dep,
        demandDep = [];

    fn.each(deps, (dep) => {

        const findM = findModule.call(this, dep),
            depExport = findM['_export_'];

        if(!findM.isDemand) {
            findM['_export_'] = new depExport();
            findM.isDemand = true;
        }

        demandDep.push(findM['_export_']);

    });

    if(!module.isDemand) {

        module._export_ = module._export_.apply(this, demandDep);

        module.isDemand = true;
    }
}

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

    const loadModules = [];

    fn.each(paths, (path, name) => {

        const demand = this,
            resPath = resolvePath.call(this, path), //处理完的路径
            urlModules = this.module.urlModule, //通过url处理的模块
            pathModules = this.module.pathModule, //通过config中path的模块
            pathConfig = {
                url: resPath,
                name: name
            };

        //检查是否存在对应的模块，存在跳过
        if(hasModule.call(this, path)) {
            const hasCreateScript = isCreateScript.call(this, path);
            //当前的模块是否被加载script
            if(hasCreateScript) {
                hasCreateScript.call(this);
            }
            return;
        }

        urlModules[resPath] = {
            createScript() {
                createScript.call(demand, pathConfig);
            }
        }

        //如果是从paths中配置的路径
        if(fn.isStr(name)) {
            pathModules[name] = urlModules[resPath];
        }

        loadModules.push(pathConfig);

    });

    //返回处理完的模块路径
    return loadModules;
}

//创建script节点
export function createScript(opts) {
    const script = document.createElement('script');
    //获取模块
    opts.findM = findModule.call(this, opts.url);
    script.async = true;
    script.src = resolveJsExt(opts.url);

    script.onload = () => {
        delete opts.findM.createScript;
        setModule.call(this, opts);
        queue.next();
    };

    script.error = function() {

    };

    queue.push(false);

    document.getElementsByTagName('head')[0].appendChild(script);
}

//设置模块的信息
export function setModule(opts) {

    const lastLoader = this.module.lastLoadedModule,
        dep = lastLoader.dep;

    //把最后加载的模块内容加载进去
    fn.each(lastLoader, (module, type) => {
        opts.findM[type] = module;
    });

    //扶弱当前的模块中存在id的名，设置id的模块
    if(lastLoader.id) {
        this.module.idModule[lastLoader.id] = opts.findM;
    }

    //查看依赖，设置一下依赖
    if(dep.length > 0) {
        const loadModules = setPaths.call(this, dep);
        runCreateScript.call(this, loadModules);
    }

    //设置初始化的状态
    opts.findM.isDemand = false;

    //运行模块内容，返回接口
    depManage.unshift({
        module: opts.findM,
        dep: dep
    });

    //重设最后的模块
    resetLastLoadedModule.call(this);
}

//重设最后的模块
function resetLastLoadedModule() {
    this.module.lastLoadedModule = {};
}

//运行插入模块
function runCreateScript(loadModules) {
    fn.each(loadModules, (path, index) => {
        createScript.call(this, path);
    });
}

//检测单前模块是否加载了
function isCreateScript(path) {
    const findM = findModule.call(this, path);
    if(fn.isFn(findM.createScript)) {
        return findM.createScript;
    } else {
        return false;
    }
}

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

//查找当前的模块是否在模块中存在
export function hasModule(m) {
    const path = resolvePath.call(this, m),
        module = this.module;
    if(module.pathModule[m] ||
        module.idModule[m] ||
        module.urlModule[path]
    ) return true;
    return false;
}

//查找对应的模块内容  权重：path > url > id
export function findModule(m) {
    const module = this.module,
        path = resolvePath.call(this, m);
    if(module.pathModule[m]) return module.pathModule[m];
    if(module.urlModule[path]) return module.urlModule[path];
    if(module.idModule[m]) return module.idModule[m];
    return false;
}