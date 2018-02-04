var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    screen = blessed.screen(),
    grid = new contrib.grid({rows: 6, cols: 10, screen: screen})
;

var wdgtWiFi = grid.set(0, 0, 1, 2, contrib.table, {
    label: 'Wireless',
    interactive: false,
    columnWidth: [10, 32]
});

var wirelessStatus = require('./wireless');
wirelessStatus.on('WirelessStatus', function (status) {
    if (status !== null) {
        wdgtWiFi.setData({headers: [], data: [
            ['Quality', Math.round(status[0].quality / 70 * 100).toString()+'%'],
            ['SSID', status[0].ssid],
        ]});
    } else {
        wdgtWiFi.setData({
            headers: [],
            data: [
                'SSID', 'Not connected'
            ]
        });
    }
    screen.render();
})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();
