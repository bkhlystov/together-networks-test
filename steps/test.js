import Test from "../pages/test";

const { Then } = require('cucumber');

let test = new Test();

Then(
    /^Wait Ajax$/,
    () => {
        test.waitAjax();
    }
);

Then(
    /^No errors found$/,
    () => {
        test.noErrors();
    }
);

Then(
    /^Scroll to top$/,
    () => {
        test.scrollToTop();
    }
);

Then(
    /^Save screenshot as "([^"]*)"$/,
    (filename) => {
        browser.saveScreenshot(`./report/screenshots/${uniqueValue}-${filename}.png`);
    }
)