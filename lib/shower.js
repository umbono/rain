/*
* Mandatory Imports : The below imports are necessary for this module to work. To extend this class with new functionalities 
*                     You can modify this class or you can download and add modules to it. Please add all modules in header
*                     section for consistency.
*/
/* jshint esversion: 6 */
const yaml = require('js-yaml');
const fs = require('fs');
const csvdata = require('csvdata')
alias = require('module-alias/register')
log = require('@log4j')
cmd = require('@cmd')
ping = require('@ping')
logs = new log().RAINLogger();
cmdLineargs = new cmd().commLineargs();
/**
 * ############################################################################### #
 * shower # This is shower class. This is the main class of RAIN. There is a
 * parser here which converts moist yaml files into json format. The tasks are
 * performed on basis of actions that user mentioned in the moist files.
 * ###############################################################################
 */
"use strict";

class Shower {
	
	checkYAML() {
		let config = {};
		var rootKey;
		var pingopts = [];
		try {
			config = yaml.safeLoad(fs.readFileSync(cmdLineargs, 'utf8'));
			for(var prop in config) {
				rootKey = prop;
				if(rootKey == 'DROPS') {
					console.log("_________________________________")
					for(var keys in config[rootKey]) {
						if(keys == 'ACTION') {
		    				var type =  config[rootKey][keys];
		    				if(type == 'ping') {
			    				console.log("ACTION : "+ type);
		    				} 
		    			} if (keys == 'HOSTS') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			} if (keys == 'TIMEOUT') {
		    				var type =  config[rootKey][keys];
		    					pingopts.push(type);
		    			} if(keys == 'NETWORKPROTOCOL') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			} if(keys == 'PACKETSIZE') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			} if(keys == 'RETRIES') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			} if(keys == 'TTL') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			} if(keys == 'MAXHOPTIMEOUTS') {
		    				var type =  config[rootKey][keys];
		    				pingopts.push(type);
		    			}
		    		} 
					ping = new ping(pingopts).pingArgs()
					console.log("_________________________________")
		    	} else {
		    		console.log(JSON.stringify("Mandatory Parent node {DROPS} not found in moist file " + cmdLineargs));
		    	}
		    }
		} catch (e) {
			console.log(e);
		}
	}
}


module.exports = Shower;