//常用方法
class Fn {
    isArr(array) {
        return array instanceof Array;
    }

    isObj(obj) {
        return obj instanceof Object && !(obj instanceof Array) && obj !== null;
    }
    
    isEmptyObj(obj) {
        for (let t in obj) return false;  
        return true;
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
}

export default new Fn();