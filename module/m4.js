demand.define('m4fn', ['app3', './m2'], function(m3, m2) {
	console.log('-----m3-----');
	console.log(m3);
	console.log('-----m2-----');
	console.log(m2);
	return function() {
		demand('./m2').a();
		m3();
	}
});