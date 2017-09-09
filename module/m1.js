demand.define('idName', ['./m3', './m2'], function(m3, m2) {
	console.log('-----m3-----');
	console.log(m3);
	console.log('-----m2-----');
	console.log(m2);
	return function() {
		m3();
		m2.a();
		var m2m = demand('idName1');
		m2m.a();
	}
});