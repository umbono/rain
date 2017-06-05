/**
 * New node file
 */
// Mandatory to load all custom modules
const shower = require('./shower.js');
//logs.debug("lsls")
//
//var readYaml = require('read-yaml');
////
//readYaml('./drops/test.yaml', function(err, data) {
//	if (err)
//		throw err;
//	if(data.development.LOGS != undefined && data.development.LOGS != false) {
//		logs.debug("lsls---")
//}
//});

const yaml = require('js-yaml');
const fs = require('fs');
let config = {};
var rootKey;
try {
    config = yaml.safeLoad(fs.readFileSync('./drops/test.yaml', 'utf8'));
    console.log(config);
    for(var prop in config) {
    	 console.log( prop ); //will give "services"
    	 rootKey = prop;
    	 if(rootKey == 'development') {
    		 console.log('yes')
    	 } else {
    		 console.log("ll")
    	 }
    	} 
    
} catch (e) {
    console.log(e);
}

