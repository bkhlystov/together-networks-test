exports.config = {
    services: ['selenium-standalone'],
    runner: 'local',
    path: '/wd/hub',
    specs: [],
    suites: {
        desktop: [
            './features/desktop/**/*.feature',
        ],
	    desktop_queue: [
		    './features/desktop/GeneralCustomerCheckoutProcess.feature',
		    './features/desktop/WholesalerCheckoutProcess.feature',
		    './features/desktop/CrmOrders.feature'
	    ]
    },
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
        'goog:chromeOptions': {
            excludeSwitches: ["enable-automation"],
            prefs: { credentials_enable_service: false },
            useAutomationExtension: false,
            args: [
                '--no-sandbox',
                //'--start-maximized',
                //'--window-size=1600,800',
                '--window-size=1044,788',
                '--disable-infobars',
                '--disable-extensions',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disk-cache-size=0',
                '--v8-cache-options=off'
            ]
        }
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './report/screenshots/',
    bail: 0,
    // Default base url
    baseUrl: '//www.way2automation.com/',
    // Default timeout for all waitForXXX commands.
    //waitforTimeout: 20000,
    //connectionRetryTimeout: 90000,
    //connectionRetryCount: 1,
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {outputDir: 'allure-results'}]
    ],
    cucumberOpts: {
        require: ['./steps/**/*.js'],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        requireModule: ['@babel/register'],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tagExpression: 'not @skip',  // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 50000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     beforeSession: function (config, capabilities, specs) {

        const chai = require('chai');
        const common = require('../support/common');
        const configData = require('./data.conf');

        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
        global.configData = configData;
        global.uniqueValue = common.generateUniqueValue();
        global.testData = {
            users: {}
        };

     },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     before: function (capabilities, specs) {
        //browser.deleteCookies();
        let windowSize = browser.getWindowSize();
        console.log( "\x1b[34m", `Viewport Size: ${windowSize.width} X ${windowSize.height} pix`, "\x1b[0m" );
        console.log( "\x1b[34m", `Unique session value: ${global.uniqueValue}`, "\x1b[0m" );
     },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs before a Cucumber feature
     */
    // beforeFeature: function (uri, feature, scenarios) {
    // },
    /**
     * Runs before a Cucumber scenario
     */
    // beforeScenario: function (uri, feature, scenario, sourceLocation) {
    // },
    /**
     * Runs before a Cucumber step
     */
    // beforeStep: function (uri, feature) {
    // },
    /**
     * Runs after a Cucumber step
     */
     afterStep: function (uri, feature, { error, result }) {
        if( error ) {
            //let featureName = feature.uri.replace(/\\/g,"_").replace(".feature", "").toLowerCase();
            let featureName = new Date().getTime();
            browser.saveScreenshot(`${this.screenshotPath}/_error_${featureName}.png`);
        }
     },
    /**
     * Runs after a Cucumber scenario
     */
    // afterScenario: function (uri, feature, scenario, result, sourceLocation) {
    // },
    /**
     * Runs after a Cucumber feature
     */
    // afterFeature: function (uri, feature, scenarios) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
