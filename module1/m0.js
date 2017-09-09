demand.define(['./m1'], function(m1) {
	console.log('-----m1-----');
	console.log(m1);
	return function() {
		m1();
	}
});