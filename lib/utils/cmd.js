/*
* Mandatory Imports : The below imports are necessary for this module to work. To extend this class with new functionalities 
*                     You can modify this class or you can download and add modules to it. Please add all modules in header
*                     section for consistency.
*/
/* jshint esversion: 6 */
const fs = require('fs');
const path = require('path');
/**
 * ############################################################################### #
 * Cmd # This is command parser class of RAIN. As of now the logic takes two arguments
 *       -m is a mandatory argument which stands for moist. You need to pass -m with a 
 *       moist name. Moist name is the yaml script that you will be writting and placing 
 *       the script under RAIN_HOME/moist folder.
 * ###############################################################################
 */

"use strict";

class Cmd {
	constructor()
	{}
	commLineargs() {
		var result = false;
		var moisthome = path.join(path.dirname(fs.realpathSync(__filename)),'../../moist');
		var argv = require('yargs').usage('-- Air need to be moist before it rain`s \ --Usage: rain.bat <command> [options]')
		.command('moist:', 'Pass moist (script file name) to the RAIN').alias('m', 'moist').demandOption([ 'moist' ]).argv;
		if (argv.m == true || argv.m == undefined) {
			console.log("Pass the moist (script filename to the rain)");
		} else {
			console.log("Most passed to the rain: %s ", argv.m);
			try{
				fs.lstatSync(moisthome + path.sep +argv.m).isFile() 
					return moisthome + path.sep +argv.m;
			   } catch (e) {
				   console.log("Moist does not exists in the script folder : ");
				   	return result;   
			   }
		}
	}
}

/*
 * Exporting the class
 */
module.exports = Cmd;