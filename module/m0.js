demand.define(['app'], function(m1) {
	console.log('-----m1-----');
	console.log(m1);
	return function() {
		m1();
	}
});