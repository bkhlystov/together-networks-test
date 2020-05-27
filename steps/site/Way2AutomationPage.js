import Way2Automation from "../../pages/site/Way2Automation.page";

const { Then } = require('cucumber');

Then(
    /^I expect page header name is "([^"]*)?"$/,
    (name) => {
        Way2Automation.checkPageHeaderName(name);
    }
);

Then(
    /^I check statuses buttons forms content$/,
    () => {
        Way2Automation.checkStatusButtonsFormContent();
    }
);

Then(
    /^I fill user name and email form$/,
    () => {
        Way2Automation.fillNameAndEmailForm();
    }
);

Then(
    /^I choose game console$/,
    () => {
        Way2Automation.chooseGameConsole();
    }
);

Then(
    /^I complete the test and check final result$/,
    () => {
        Way2Automation.completeTheTestAndCheckFinalResult();
    }
);

