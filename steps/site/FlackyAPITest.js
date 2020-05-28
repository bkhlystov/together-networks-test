import FlackyAPITest from "../../pages/site/FlackyAPITest.page";

const { Then } = require('cucumber');

Then(
    /^I "([^"]*)?" user (in|from) database by url "([^"]*)?"$/,
    (action, type_get, url) => {
        FlackyAPITest.apiTest(action, url);
    }
);
