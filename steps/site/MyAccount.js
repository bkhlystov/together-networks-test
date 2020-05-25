import MyAccount from "../../pages/site/myAccount.page";
import waitFor from "../../support/action/waitFor";
import clickElement from "../../support/action/clickElement";
import moveToElement from "../../support/action/moveToElement";
import setInputField from "../../support/action/setInputField";
import isDisplayed from "../../support/check/isDisplayed";
import checkContainsText from "../../support/check/checkContainsText";
import checkLinksDomain from "../../support/check/checkLinksDomain";

const { When, Then } = require('cucumber');

When(
    /^I (click|doubleclick) on MyAccount page (link|button|element|label) "([^"]*)?"$/,
    (action, type, elementName) => {
        clickElement(action, type, MyAccount.getElement(elementName));
    }
);

Then(
    /^I wait on MyAccount page element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    (elementName, ms, falseState, state) => {
        waitFor(MyAccount.getElement(elementName), ms, falseState, state);
    }
);

Then(
    /^I expect on MyAccount page "([^"]*)?" link "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    (elementName, href, falseCase, expectedText) => {
        switch(elementName){
            case "Top-bar Customer Menu":
                checkContainsText("element", MyAccount.topCustomerMenuLink(href), falseCase, expectedText);
                break;
        }
    }
);