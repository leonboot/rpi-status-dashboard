var iwconfig = require('wireless-tools/iwconfig');
var EventEmitter = require('events').EventEmitter;

var eventEmitter = new EventEmitter();

var emitInterval = setInterval(
    function() {
        iwconfig.status(function (err, status) {
            eventEmitter.emit('WirelessStatus', err === null ? status : null);
        });
    },
    2000
);

module.exports = eventEmitter;
