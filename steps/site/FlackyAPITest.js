import FlackyAPITest from "../../pages/site/FlackyAPITest.page";

const { Then } = require('cucumber');

Then(
    /^I "([^"]*)?" user database by "([^"]*)?"$/,
    (action, url) => {
        FlackyAPITest.apiTest(action, url);
    }
);
