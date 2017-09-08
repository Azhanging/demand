demand.define('idName1', ['./m2','./@alias1','./m1'], function(m2,alias,m1) {
	console.log(m2,alias,m1);
    return {
        a: function() {
            console.log(2);
        }
    }
});