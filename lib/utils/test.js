
const ping = require('net-ping');

var maxHopTimeouts = 1000;
var ttl = 128;
var targets = ["10.128.14.1"];


var options = {
		retries: 3,
		timeout: 2,
		packetSize: 4
	};

var session = ping.createSession (options);

session.on ("error", function (error) {
	console.trace (error.toString ());
});

var session = ping.createSession (options);

session.on ("error", function (error) {
	console.trace (error.toString ());
});

function doneCb (error, target) {
	if (error)
		console.log (target + ": " + error.toString ());
	else
		console.log (target + ": Done");
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
	session.traceRoute (targets[i], ttl, feedCb, doneCb);
}