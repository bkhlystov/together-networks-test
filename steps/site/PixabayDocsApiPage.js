import PixabayDocsApi from "../../pages/site/PixabayDocsApi.page";

const { When, Then } = require('cucumber');

When(
    /^I visit website "([^"]*)?" and waite for element "([^"]*)?"$/,
    (url, css_selector) => {
        PixabayDocsApi.visitPixabayLogin(url, css_selector);
    }
);


