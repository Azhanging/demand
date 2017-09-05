import Fn from './fn';

const fn = new Fn();

//兼容性IE8
(function() {

    //兼容IE8中 的indexOf
    if(!fn.isFn(Array.prototype.indexOf)) {
        Array.prototype.indexOf = function(val) {
            let index = 0,
                len = this.length;
            for(; index < len; index++) {
                if(this[index] === val) return index;
            }
            return -1;
        }
    }

    //map
    if(!fn.isFn(Array.prototype.map)) {
        Array.prototype.map = function(fn) {
            let mapArr = [],
                i = 0,
                len = this.length;
            for(; i < len; i++) {
                mapArr.push(fn(this[i], i));
            }
            return mapArr;
        }
    }

    //filter
    if(!fn.isFn(Array.prototype.filter)) {
        Array.prototype.filter = function(fn) {
            let mapArr = [],
                i = 0,
                len = this.length;
            for(; i < len; i++) {
                let item = this[i];
                if(fn(item, i)) mapArr.push(item);
            }
            return mapArr;
        }
    }

})();