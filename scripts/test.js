/**
 * New node file
 */
var path = require('path');
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var basename = path.basename('../properties/log4j.properties');

var dirString = path.join(path.dirname(fs.realpathSync(__filename)),
		'../properties/log4j.properties');
var properties = PropertiesReader(dirString);
var property = properties.get('MAIN.rain.logging.logsdir')
var log4js = require('log4js');
log4js.configure(property);
var logger = log4js.getLogger();
logger.debug("Some debugggg messages" + dirString);

// Mandatory Imports
var Class = require('pyclass');
var path = require('path');
var fs = require('fs');
var log4js = require('log4js');
var PropertiesReader = require('properties-reader');
/**
 * ############################################################################### #
 * _Logger # Main implementation of the RAIN logging facility. # Example: #
 * ###############################################################################
 */

var _Logger = new Class(
		function() {
			this.__init__ = function(self) {
				// attempt to load the log properties file from the environment
				var log4jprops = path.join(path.dirname(fs
						.realpathSync(__filename)),
						'../properties/log4j.poperties');
				fs
						.exists(
								log4jprops,
								function(exists) {
									if (exists) {
										var properties = PropertiesReader(log4jprops);
										var property = properties
												.get('MAIN.rain.logging.logsdir');
										// Invoking Log4js Module
										log4js.configure(property);
										var logger = log4js.getLogger();
										logger.debug("Some debugggg messages");
									} else {
										console
												.log(
														'[ERROR] : Failed to initialize LOG4J implementation.An incorrect path was specified.',
														log4jprops);
									}
								});
			};
		});

/** initialize log4j instance */
var l = new _Logger();
l;