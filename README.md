# "TN's Automated Testing"

Test automation for Together networks.

* [WebdriverIO](https://webdriver.io) is a test automation framework
* Gherkin Syntax - Cucumber
* [Allure Reporter](https://docs.qameta.io/allure/) is a WebdriverIO reporter plugin

###Preparing
We need to install global latest version nodejs 
https://nodejs.org/uk/download/
and java
https://www.java.com/ru/download/windows-64bit.jsp

### Deploying 

Now we need to install. Do that by running:

```
npm i
```

### Selenium

```
npm install selenium-standalone@latest -g
selenium-standalone install && selenium-standalone start
```

More details:
* https://www.npmjs.com/package/selenium-standalone
* https://webdriver.io/docs/selenium-standalone-service.html

### Test run examples

All tests for site:

```
npm run test.site
``` 

Run single test
```
node_modules\\.bin\\wdio configs\\wdio.conf.parallel.js --spec ./features/desktop/Exemple.feature
```

### Configuration files

* `/configs/wdio.config.js` - The base configuration file
* `/configs/wdio.config.parallel.js` - The configuration file for running parallel features (extends `wdio.config.js`)
* `/configs/data.conf.js` - All necessary user data

### Allure report

For displaying report type next command in your terminal line:

```
allure generate report/allure-results --clean && allure open
```

This will generate a report (by default in `./allure-report` directory), and open it in your browser.

For more details about Allure reporter plugin: https://webdriver.io/docs/allure-reporter.html