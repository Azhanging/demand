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
        if(this.queue.length != 0) {
            this.queue.shift();
        }
        
        if(this.queue.length === 0) this.cb();
    }
}