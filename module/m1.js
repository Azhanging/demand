demand.define('idName',['./m4','./m3','./m2'],function(m4,m3,m2){
	return function(){
	    m4();
	    m3();
	    m2.a();
	}
});