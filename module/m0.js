demand.define(['./m2'],function(m2){
	return function(){
	    m2.a();
	    var m2m = demand('idName1');
	    m2m.a();
	}
});

