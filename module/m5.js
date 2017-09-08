define(['app'],function(app){
	console.log(app);
	return function(){
        app();
    }
});