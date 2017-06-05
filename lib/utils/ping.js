/*
* Mandatory Imports : The below imports are necessary for this module to work. To extend this class with new functionalities 
*                     You can modify this class or you can download and add modules to it. Please add all modules in header
*                     section for consistency.
*/
/* jshint esversion: 6 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ping = require('net-ping');
cmdLineargs = new cmd().commLineargs();
cmd = require('@cmd')
/**
 * ############################################################################### #
 * Cmd # This is command parser class of RAIN. As of now the logic takes two
 * arguments -m is a mandatory argument which stands for moist. You need to pass
 * -m with a moist name. Moist name is the yaml script that you will be writting
 * and placing the script under RAIN_HOME/moist folder.
 * ###############################################################################
 */

"use strict";
class Ping {
	// hosts value passed to the Ping class by the Master class known as 'shower
	// class'
	constructor(hosts)
	{
		this.h = hosts;
	}
	/*
	 * Primary method of ping class that performs ping activity by calling
	 * net-ping npm module. You don`t need to install any module as it`s already
	 * installed within RAIN bundle
	 */
	pingArgs() {
		// Formatting the input in the format that is acceptable by the net-ping
		// module
		var targets = this.h[0].split(',');
		var ttl = this.h[5];
		var maxHopTimeouts = this.h[6];
		var options = {
			timeout: this.h[1],
			networkProtocol: this.h[2],
			packetSize: this.h[3],
			retries: this.h[4]
		};
		
		console.log(options);
		var session = ping.createSession (options);

		session.on ("error", function (error) {
			console.trace (error.toString ());
		});
		
		function doneCb (error, target) {
			if (error)
				console.log (target + ": " + error.toString ());
		}

		function feedCb (error, target, ttl, sent, rcvd) {
			var ms = rcvd - sent;
			if (error) {
				if (error instanceof ping.TimeExceededError) {
					console.log (target + ": " + error.source + " (ttl=" + ttl
							+ " ms=" + ms +")");
				} else {
					console.log (target + ": " + error.toString () + " (ttl=" + ttl
							+ " ms=" + ms +")");
				}
			} else {
				console.log (target + ": " + target + " (ttl=" + ttl + " ms="
						+ ms +")");
			}
		}

		for (var i = 0; i < targets.length; i++) {
			session.traceRoute (targets[i], feedCb, doneCb);
		}
	}
}

/*
 * Exporting the class
 */
module.exports = Ping;
