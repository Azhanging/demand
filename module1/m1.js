demand.define('idName',['./m0'], function(m0) {
	console.log(m0);
	return function() {
		m1();
	}
});