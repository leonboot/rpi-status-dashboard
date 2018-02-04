var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    screen = blessed.screen(),
    grid = new contrib.grid({rows: 3, cols: 10, screen: screen})
;

var wdgtWiFi = grid.set(0, 0, 3, 3, contrib.log, {
    label: 'Wireless',
    fg: 'white'
});

var wirelessStatus = require('./wireless');
wirelessStatus.on('WirelessStatus', function (status) {
    if (status !== null) {
        wdgtWiFi.log(
            status[0].ssid + 
            ' (' +
            Math.round(status[0].quality / 70 * 100).toString() +
            '%)'
        );
    } else {
        wdgtWiFi.log('No WiFi connection!');
    }
    screen.render();
})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();
