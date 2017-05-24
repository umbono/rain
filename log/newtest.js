/*
* Mandatory Imports : The below imports are necessary for this module to work. To extend this class with new functionalities
*                     You can modify this class or you can download and add modules to it. Please add all modules in header
*                     section for consistency.
*/
var Class = require('pyclass');
var path = require('path');
var fs = require('fs');
var log4js = require('log4js');
var PropertiesReader = require('properties-reader');
var updateJson = require('update-json');

/**
 * ############################################################################### #
 * _Logger # Main implementation of the RAIN logging facility. You don`t have to 
 * create any object. All you need to do is to call the methods.
 * Example: #
 *  		 logs.debug("Debug");
 *			 logs.info("Info");
 *			 logs.error("Error");
 *			 logs.trace("Trace");
 * ###############################################################################
 */

var _Logger = new Class(function() {
	this.__init__ = function(self) {
};
        
	this.checkprops = function(self) {
		// attempt to load the log properties file from the environment
		var log4jprops = path.join(path.dirname(fs.realpathSync(__filename)),'../properties/log4j.properties');
		var log4jconf = path.join(path.dirname(fs.realpathSync(__filename)),'../config/log4js.json');
		fs.exists(log4jprops,function(exists) {
			if (exists) {
				var properties = PropertiesReader(log4jprops);
                var property = properties.get('MAIN.rain.logging.logsdir');
                fs.exists(log4jconf,function(exists) {
                if (exists) {
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
                			        {
										"type": "logLevelFilter",
										"level": "ERROR",
										"appender": {
											"type": "file",
											"filename": "../log/errors.log"
										}
									}
								]
							}
						]
                	}
                
					updateJson(log4jconf, data, function (error) {
						if (error) {
							throw error;
						}	else {
							console.log ("[INFO] : File modified successfully")
							}
                		});
                	} else {
						console.log('[ERROR] : Failed to initialize LOG4J implementation.An incorrect path was specified.',log4jconf);
            		}
                });
                // Invoking Log4js Module 
		} else {
			console.log('[ERROR] : Failed to initialize LOG4J implementation.An incorrect path was specified.',log4jprops);
		}
	});
	
	this.RAINLogger = function(self) {
		var log4jconf = path.join(path.dirname(fs.realpathSync(__filename)),'../config/log4js.json');
		log4js.configure(log4jconf);
		var logger = log4js.getLogger();
		return logger;
	};
	});
}
/*
* Exporting the class
*/
module.exports = _Logger;