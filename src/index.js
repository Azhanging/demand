//demand文件入口
import demand from './demand/demand.js';
//兼容性处理
import compatibility from './demand/compatibility';

(function(global, factory) {
    (global ? (global.demand = factory()) : {});
})(typeof window !== 'undefined' ? window : this, function() {

    demand.version = "v1.0.0";

    return demand;
});
