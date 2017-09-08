demand.define('idName1', ['./m2', './@alias1', './m3', './m4'], function(m2, alias, m3, m4) {
    console.log('------m2------');
    m4();
    console.log(m2, alias, m3, m4);
    console.log('------m2 end------');
    return {
        a: function() {
            console.log(2);
        }
    }
});