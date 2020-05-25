const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

exports.config = merge( wdioConf.config,{
    runner: 'local',
    suites: {},
    maxInstances: 5,
},{ clone: false })
