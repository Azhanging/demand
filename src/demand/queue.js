/*
    队列 
 * */

export default class Queue {
    constructor(opts) {
        this.queue = [];
    }
    push(fn) {
        this.queue.push(fn);
    }
    next() {
        if(this.hasVal()) {
            this.queue.shift();
        }
        
        if(this.queue.length === 0) this.cb();
    }
    hasVal(){
    	return this.queue.length != 0;
    }
}

//创建队列
export const queue = new Queue();

