demand.define(['./load-module/md2','m2'],function(md2,m2){
    console.log(md2,m2);
	return function (){
		console.log('md1');
	}
});
