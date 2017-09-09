demand.define('idName1', ['./m2', './@alias1', './m3', './m4'], function(m2, alias, m3, m4) {
    console.log('------m2------');
    console.log(m2);
    console.log('------alias------');
    console.log(alias);
    console.log('------m3------');
    console.log(m3);
    console.log('------m4------');
    console.log(m4);
    return {
        a: function() {
            console.log(2);
        }
    }
});