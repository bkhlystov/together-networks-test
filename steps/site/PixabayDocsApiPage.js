import PixabayDocsApi from "../../pages/site/PixabayDocsApi.page";

const { When, Then } = require('cucumber');

When(
    /^I visit website "([^"]*)?"$/,
    (url) => {
        PixabayDocsApi.visitPixabayLogin(url);
    }
);


