/*
* Mandatory Imports : The below imports are necessary for this module to work. To extend this class with new functionalities
*                     You can modify this class or you can download and add modules to it. Please add all modules in header
*                     section for consistency.
*/
/* jshint esversion: 6 */
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const PropertiesReader = require('properties-reader');
const updateJson = require('update-json');
const constants = require('@constants')
/**
 * ############################################################################### #
 * Logger # Main implementation of the RAIN logging facility. You don`t have to
 * create any object. All you need to do is to call the methods. Example: #
 * logs.debug("Debug"); logs.info("Info"); logs.error("Error");
 * logs.trace("Trace");
 * ###############################################################################
 */

"use strict";


class Logger {
	constructor()
	{}
	
	checklogprops() {
		var result = false;
		var log4jprops = path.join(path.dirname(fs.realpathSync(__filename)),'../rain.properties');
		try{
			fs.lstatSync(log4jprops).isFile() 
				return log4jprops;
		   } catch (e) {
			   	return result    
		}
		return log4jprops;
	}
	
	checklogconf() {
		var result = false;
		var log4jconf = path.join(path.dirname(fs.realpathSync(__filename)),'../config/log4js.json');
		try{
			fs.lstatSync(log4jconf).isFile() 
		    	return log4jconf;
		   } catch (e) {
			   	return result    
		   }
		return log4jconf;
	}
	
	alterprops() {
		var result = false;
		var checklogpropsobj = this.checklogprops();
		var checklogconfobj = this.checklogconf();
		if(checklogpropsobj != false && checklogconfobj != false) {
			var properties = PropertiesReader(checklogpropsobj);
            var property = properties.get(constants.mainlogdir);
            var data = {
					"_comment": "_Logger Main implementation of the Rain logging facility. Logger creates the log folder within the parent folder of the project. The location of the log folder can be changed by changing the value of filename variable accordingly. ", 
					"_usage": "var log4js = require('log4js'); log4js.configure('../config/log4js.json'); var logger = log4js.getLogger(); logger.debug('Some debug messages');",
            		"appenders": [
            			{
							"type": "clustered",
            			    "appenders": [
								{
									"type": "file",
									"filename": property,
									"maxLogSize": 10485760,
									"numBackups": 3
            			        },
							]}
            		 ]}
            updateJson(checklogconfobj, data, function (error) {
            	if (error) {
            		throw error;
				}	else {
					console.log (JSON.stringify("modified"));
				}
        	});
            return true;
		} else {
			return result;
		}
	}
	
	RAINLogger() {
		var result = false;
		if(this.alterprops() == true) {
			log4js.configure(this.checklogconf());
			var logger = log4js.getLogger();
		return logger;
		} else {
			return false;
		}
	}
}
/*
 * Exporting the class
 */
module.exports = Logger;