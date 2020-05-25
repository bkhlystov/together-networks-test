const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

const myUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";

let wdioConfMerged = merge( wdioConf.config,{
    runner: 'local',
    suites: {
        mobile: [
            './features/mobile/**/*.feature',
        ]
    },
    maxInstances: 5,
});

wdioConfMerged.capabilities = [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
        excludeSwitches: ["enable-automation"],
        mobileEmulation: {
            deviceName: 'iPhone X'
        },
        prefs: { credentials_enable_service: false },
        useAutomationExtension: false,
        args: [
            'no-sandbox',
            'use-mobile-user-agent',
            'incognito',
            'user-agent=' + myUserAgent,
            'disable-infobars',
            'disable-extensions',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0',
            '--v8-cache-options=off'
        ]
    }
}];

exports.config = wdioConfMerged;
